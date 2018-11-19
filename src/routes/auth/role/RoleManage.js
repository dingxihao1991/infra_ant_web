import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import styles from './RoleManage.less';
import { Table ,Button ,Layout,Pagination,Form,Input,message} from 'antd';
import {ModalForm,showConfirm}  from 'components/Modal';
import { POST,GET,PUT,DELETE } from '../../../services/api';
import Authorized from '../../../utils/Authorized';
import FormSub from './Form';


const { ButtonAuthorize } = Authorized;
const FormItem = Form.Item;
const { Content, Header, Footer } = Layout;
const Modal = ModalForm.Modal;
const confirm = Modal.confirm;

const columns = [
    {
        title: '角色名称',
        dataIndex: 'name',
        id: 'name',
        align: 'center',
        key:'name'
    }, {
        title: '机构名称',
        dataIndex: 'orgName',
        id: 'orgName',
        align: 'center',
        key:'orgName'
    } ,{
        title: '创建时间',
        dataIndex: 'sysDate',
        id: 'sysDate',
        align: 'center',
        key:'sysDate'
    },{
        title: '创建人',
        dataIndex: 'sysUserName',
        id: 'sysUserName',
        align: 'center',
        key:'sysUserDame'
    },{
        title: '最后修改人',
        dataIndex: 'lastModifiedUserName',
        id: 'lastModifiedUserName',
        align: 'center',
        key:'lastModifiedUserName'
    }, {
            title: '最后修改时间',
            dataIndex: 'lastModifiedDate',
            id: 'updateDate',
            align: 'center',
    }];

const Paging = ({dataItems, onChange, ...otherProps}) => {
    const { total, pageSize, pageNum } = dataItems;
    const paging = {
        total: total,
        pageSize: pageSize,
        current: pageNum,
        showSizeChanger: true,
        showQuickJumper: true,
        showTotal: total => `共 ${total} 条`,
        onShowSizeChange: (pageNum, pageSize) => onChange({pageNum, pageSize}),
        onChange: (pageNum) => onChange({pageNum}),
        ...otherProps
    };
    return <Pagination {...paging} />;
};

export default class roleManage extends PureComponent {

    static contextTypes = {
        openModal: PropTypes.func,
    };

    state = {
        columns:[],
        dataSource:[],
        record: null,
        visible: false,
        rows: [],
    };

    constructor(props,context) {
        super(props,context)

    }

    componentDidMount(){
        this.init();
    }

    init= () =>{
        const thiz = this;
        GET('/roles',function(result){
            if(result.success){
                thiz.setState({
                    dataSource:result.result,
                })
            }
        },function(error){
            console.log(error)
        })
    }

    //编辑
    edit =()=>{
        const {rows,record} = this.state
        if(rows.length>1){
            Modal.warning({
                title: '警告信息',
                content: '请选中一行数据',
            });
            return;
        }
        this.openModal(record);
    }

    //新增事件
    onAdd = () => {
        this.setState({record:null});
        this.openModal(null);
    };

    openModal =(record)=>{
        const modalFormProps = {
            record:record,
            isShow:true,
            Contents:FormSub,
            modalOpts: {
                width: 700,
            },
            onSubmit: (values) => this.onSubmit(values)
        }
        this.context.openModal(modalFormProps);
    }

    delete =()=> {
        const {rows,record} = this.state;
        const dataSource = [...this.state.dataSource];
        let thiz = this;
        confirm({
            title: '提示信息',
            content: '确定删除【'+rows.length+'】行数据吗?',
            okText: '确定',
            okType: 'danger',
            cancelText: '取消',
            onOk() {
                let params = []
                rows.map(value=>{
                    params.push(value.id);
                });
                DELETE('/role/delete', params , function(result){
                    if(result.success){
                        message.success("删除成功");
                        thiz.setState({ dataSource: dataSource.filter(item => !rows.some(jtem=>jtem.id == item.id))});
                    }else{
                        Modal.error({
                            title: '错误信息',
                            content: '删除失败',
                        });
                    }

                },function(error){
                    console.log(error)
                })
            },
            onCancel() {

            },

        })

    }

    //选中项发生变化时的回调
    onSelectChange = (selectedRowKeys,selectedRows) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({rows:selectedRows,record:selectedRows[0]});
    }

    closeModal = () =>{
        this.setState({
            visible: false
        });
    }

    onSubmit= (values ) =>{
        const thiz = this;
        if(thiz.state.record!=null){
            values['id'] = thiz.state.record.id;
            PUT('/role/update',values,function(data){
                console.log(data);
                if(data.success){
                    message.success('修改成功');
                    thiz.closeModal();
                    thiz.init();
                }else{
                    Modal.error({
                        title: '错误信息',
                        content: '修改失败',
                    });
                }
            },function(error){
                console.log(error);
            })
        }else {
            POST('/role/add',values,function(data){
                console.log(data);
                if(data.success){
                    message.success('新增成功');
                    thiz.closeModal();
                    thiz.init();
                }else{
                    Modal.error({
                        title: '错误信息',
                        content: '新增失败',
                    });
                }
            },function(error){
                console.log(error);
            })

        }
    }

    render() {
        let { visible,record,rows,dataSource} = this.state;

        const rowSelection = {
            onChange: this.onSelectChange,
        };

        return(
            <Layout className={styles.application}>
                <div>
                    <ButtonAuthorize icon="plus" type="primary" onClick={this.onAdd} name="新增" authority="role:add"/>
                    <ButtonAuthorize icon="edit" disabled={!rows.length} onClick={this.edit} name="修改" authority="role:update"/>
                    <ButtonAuthorize icon="delete" disabled={!rows.length} onClick={this.delete} name="删除" authority="role:delete"/>
                </div>
                <Content>
                    <Table  rowKey='id' style={{  background: '#fff', minHeight: 360}}  columns={columns} dataSource={dataSource}  onChange={this.handleChange} rowSelection={rowSelection}
                            pagination={{
                               showSizeChanger:true,
                               showQuickJumper:true,
                               total:dataSource.length,
                               onChange:this.onChange
                           }}
                    />
                </Content>
            </Layout>
        )

    }
}