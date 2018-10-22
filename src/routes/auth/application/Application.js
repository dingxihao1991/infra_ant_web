import React, {PureComponent} from 'react';
import styles from './Application.less';
import { Table ,Button ,Layout,Pagination,Form,Input,message} from 'antd';
import {ModalForm,showConfirm}  from 'components/Modal';
import FormSub from './Form';
import { POST,GET,PUT,DELETE } from '../../../services/api';
import Authorized from '../../../utils/Authorized';

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
    dataIndex: 'sysUserId',
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
    dataIndex: 'lastModifiedUserId',
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


export default class Application extends PureComponent {
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
        GET('/application/findAll',function(result){
            if(result.success){

                thiz.setState({dataSource:result.result})
            }
        },function(error){
            console.log(error)
        })

    }


    handleChange = (pagination, filters, sorter) => {
        console.log('Various parameters', pagination, filters, sorter);
        this.setState({
            filteredInfo: filters,
            sortedInfo: sorter,
        });
        console.log("------------",pagination);
    }

    clearFilters = () => {
        this.setState({ filteredInfo: null });
    }

    clearAll = () => {
        this.setState({
            filteredInfo: null,
            sortedInfo: null,
        });
    }



    //选中项发生变化时的回调
    onSelectChange = (selectedRowKeys,selectedRows) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({rows:selectedRows,record:selectedRows[0]});
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
        this.setState({
            record:rows[0],
            visible: true
        });
    }

    //新增事件
    onAdd = () => {
        this.setState({
            record: null,
            visible: true
        });

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

    closeModal = () =>{
        this.setState({
            visible: false
        });
    }

    onSubmit= (values) =>{
        const thiz = this;
        console.log("--------",values)
        if(this.state.record!=null){

            values['id']=thiz.state.record.id;

            PUT('/application/update',values,function(data){
                console.log(data);
                if(data.success){

                    message.success('修改成功')
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
        let { visible,record,rows,dataSource} = this.state;

        const rowSelection = {
            onChange: this.onSelectChange,
            //onSelect: this.onSelect,
        };
        const  from = FormSub;
        const thiz = this;

        const modalFormProps = {
            loading: true,

            record,
            visible,
            Contents:from,
            modalOpts: {
                width: 700,
            },
            onCancel: () => this.closeModal(),
            onSubmit: (values) => this.onSubmit(values)
        }

        return(

            <Layout className={styles.application}>
                <div className={styles.tableOperations}>
                    <ButtonAuthorize icon="plus" type="primary" onClick={this.onAdd} name="新增" authority="application:add"/>
                    <ButtonAuthorize icon="edit" disabled={!rows.length} onClick={this.edit} name="修改" authority="application:update"/>
                    <ButtonAuthorize icon="delete" disabled={!rows.length} onClick={this.delete} name="删除" authority="application:delete"/>
                </div>
                <Content  >
                    <Table rowKey='id' style={{  background: '#fff', minHeight: 360}}  columns={columns} dataSource={dataSource}  onChange={this.handleChange} rowSelection={rowSelection}
                           size="small"
                           pagination={{
                               showSizeChanger:true,
                               showQuickJumper:true,
                               total:dataSource.length,
                               onChange:this.onChange
                           }}
                    />
                </Content>
                <ModalForm {...modalFormProps}/>
            </Layout>
        )

    }
}