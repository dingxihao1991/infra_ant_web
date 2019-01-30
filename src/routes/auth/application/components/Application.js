import React, {PureComponent} from 'react';
import styles from './Application.less';
import { Table ,Button ,Layout,Pagination,Form,Input,message} from 'antd';
import {ModalForm,showConfirm}  from 'components/Modal';
import FormSub from './Form';
import { POST,GET,PUT,DELETE } from '../../../../services/api';
import Authorized from '../../../../utils/Authorized';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import cx from 'classnames';

const { ButtonAuthorize } = Authorized;
const { Content} = Layout;
const Modal = ModalForm.Modal;
const confirm = Modal.confirm;

const columns = [
{
    title: '应用名称',
    dataIndex: 'applicationName',
    id: 'name',
    align: 'center'
}, {
    title: '应用标识',
    dataIndex: 'code',
    id: 'code',
    align: 'center'
},{
    title: '描述',
    dataIndex: 'describe',
    id: 'describe',
    align: 'center'
}, {
    title: '创建人',
    dataIndex: 'sysUserName',
    id: 'createUser',
    align: 'center'
}, {
    title: '创建时间',
    dataIndex: 'sysDate',
    id: 'createDate',
    align: 'center',
    width:200
}, {
    title: '最后修改人',
    dataIndex: 'lastModifiedUserName',
    id: 'updateUser',
    align: 'center'
}, {
    title: '最后修改时间',
    dataIndex: 'lastModifiedDate',
    id: 'updateDate',
    align: 'center',
    width:200
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


// @connect(({loading, applicationModel}) => ({
//     list:applicationModel.list,
// }))
export default class Application extends PureComponent {

    static contextTypes = {
        openModal: PropTypes.func,
    };

    state = {
        columns:[],
        dataSource:[],
        record: null,
        visible: false,
        rows: [],
        selectedRowKeys:[],
        current:1,
        pageSize:10
    };

    constructor(props,context) {
        super(props,context)

    }
    componentDidMount(){
        // const {dispatch } = this.props;
        // dispatch({
        //     type: 'applicationModel/fetch',
        //     payload: {
        //     },
        // });
        this.init();
    }

    init= () =>{
        const thiz = this;
        GET('/application/findAll',function(result){
            if(result.success){

                thiz.setState({dataSource:result.result,selectedRowKeys:[]})
            }
        },function(error){
            console.log(error)
        })

    }


    //选中项发生变化时的回调
    onSelectChange = (selectedRowKeys,selectedRows) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({rows:selectedRows,record:selectedRows[0],selectedRowKeys});
    }

    //分页回调事件
    onChange=(page, pageSize) =>{
        console.log(page);
    }

    //用户手动选择/取消选择某列的回调
    onSelect =(record, selected, selectedRows, nativeEvent) =>{

        // this.setState({
        //     record
        // });
    }

    //编辑
    edit =()=>{
        const {rows} = this.state
        if(rows.length>1){
            Modal.warning({
                title: '警告信息',
                content: '请选中一行数据',
            });
            return;
        }

        this.openModal(rows[0]);
    }

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

    //新增事件
    onAdd = () => {
        this.setState({record:null});
        this.openModal(null);
    };

    delete =()=> {
        const {rows,record} = this.state;
        const dataSource = [...this.state.dataSource];

        const thiz = this;

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
                DELETE('/application/delete',params,function(result){
                    if(result.success){
                        thiz.setState({ dataSource: dataSource.filter(item => !rows.some(jtem=>jtem.id == item.id))});
                        message.success('删除成功')
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

    handleChange = (pagination, filters, sorter, extra) =>{
        this.setState({current:pagination.current,pageSize:pagination.pageSize});

    }

    onSubmit= (values) =>{
        const thiz = this;

        if(this.state.record!=null){

            values['id']=thiz.state.record.id;

            PUT('/application/update',values,function(data){
                console.log(data);
                if(data.success){

                    message.success('修改成功')
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

            POST('/application/add',values,function(data){
                console.log(data);
                if(data.success){
                    message.success('新增成功')
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
        const { current,pageSize,rows,dataSource,selectedRowKeys} = this.state;

        const {list} =this.props;

        let classname = cx(
            {'ant_table_ui':dataSource.length>0?true:false},
        );

        const rowSelection = {
            onChange: this.onSelectChange,
            selectedRowKeys:selectedRowKeys
        };

        const dataTableProps ={
            total: dataSource?dataSource.length:null,
            pageSize: pageSize,
            current:current,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: total => `共 ${dataSource.length} 条`,

        }

        return(
            <Layout className={styles.application}>
                <div>
                    <ButtonAuthorize icon="plus" type="primary" onClick={this.onAdd} name="新增" authority="application:add"/>
                    <ButtonAuthorize icon="edit" disabled={!rows.length} onClick={this.edit} name="修改" authority="application:update"/>
                    <ButtonAuthorize icon="delete" disabled={!rows.length} onClick={this.delete} name="删除" authority="application:delete"/>
                </div>
                <Content className={classname} >
                    <Table rowKey='id' style={{ minHeight: 360}}  columns={columns} dataSource={dataSource}  onChange={this.handleChange} rowSelection={rowSelection}
                           pagination={dataTableProps}
                           scroll={{ y: '72vh'  }}
                    />
                </Content>
            </Layout>
        )

    }
}