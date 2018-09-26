import React, {PureComponent} from 'react';
import styles from './UserManage.less';
import { Table ,Button ,Layout,Pagination,Form,Input} from 'antd';
import {ModalForm,showConfirm}  from 'components/Modal';
import { POST,GET,PUT,DELETE } from '../../../services/api';
import FormSub from './Form';

import fetch from 'dva/fetch';

const FormItem = Form.Item;
const { Content, Header, Footer } = Layout;
const Modal = ModalForm.Modal;
const confirm = Modal.confirm;

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

export default class userManage extends PureComponent {

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
        this.initColums();
        this.init();
    }

    initColums =() =>{
        const columns = [{
            title: '用户名',
            dataIndex: 'userName',
            id: 'userName',
            align: 'center',
            key:'userName'
        }, {
            title: '登录名',
            dataIndex: 'loginName',
            id: 'loginName',
            align: 'center',
            key:'loginName'
        },{
            title: '密码',
            dataIndex: 'password',
            id: 'password',
            align: 'center',
            key:'password'
        },{
            title: '证件号码',
            dataIndex: 'card',
            id: 'card',
            align: 'center',
            key:'card'
        }, {
            title: '部门id',
            dataIndex: 'departmentId',
            id: 'departmentId',
            align: 'center',
            key:'departmentId'
        }, {
            title: '固定电话',
            dataIndex: 'phone',
            id: 'phone',
            align: 'center',
            key:'phone'
        }, {
            title: '手机',
            dataIndex: 'mobilePhone',
            id: 'mobilePhone',
            align: 'center',
            key:'mobilePhone'
        }, {
            title: '邮箱',
            dataIndex: 'email',
            id: 'email',
            align: 'center',
            key:'email'
        }, {
            title: 'QQ',
            dataIndex: 'qq',
            id: 'qq',
            align: 'center',
            key:'qq'
        },{
            title: '创建时间',
            dataIndex: 'sysDate',
            id: 'sysDate',
            align: 'center',
            key:'sysDate'
        }];
        this.setState({columns:columns})
    }

    init= () =>{
        const thiz = this;
        GET('/users',function(result){
            if(result.success){
                thiz.setState({dataSource:result.result})
            }
        },function(error){
            console.log(error)
        })

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
                DELETE('/users/delete', params , function(result){
                    if(result.success){
                        thiz.setState({ dataSource: dataSource.filter(item => !rows.some(jtem=>jtem.id == item.id))});
                    }else{
                        alert(result.message);
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

    render() {
        let { columns, visible,record,rows,dataSource} = this.state;

        const rowSelection = {
            onChange: this.onSelectChange,
        };
        const thiz = this;
        const from = FormSub;
        const modalFormProps = {
            loading: true,
            record,
            visible,
            Contents:from,
            modalOpts: {
                width: 700,
            },
            onCancel: () => {
                this.setState({
                    record: null,
                    visible: false
                })
            },
            onSubmit: (values) => {
                console.log('-------------'+JSON.stringify(values));
                if(thiz.state.record!=null){
                    values['id'] = thiz.state.record.id;
                    PUT('/users/update',values,function(data){
                        console.log(data);
                        if(data.success){
                            thiz.init();
                        }else{

                        }
                    },function(error){
                        console.log(error);
                    })
                }else {
                    POST('/users/add',values,function(data){
                        console.log(data);
                        if(data.success){
                            thiz.init();
                        }
                    },function(error){
                        console.log(error);
                    })

                }
            }
        }

        return(
            <Layout className={styles.application}>
                <div className={styles.tableOperations}>
                    <Button icon="plus" type="primary" onClick={this.onAdd}>新增</Button>
                    <Button icon="edit" disabled={!rows.length} onClick={this.edit}>修改</Button>
                    <Button icon="delete" disabled={!rows.length} onClick={this.delete}>删除</Button>
                </div>
                <Content  >
                    <Table  rowKey='id' style={{  background: '#fff', minHeight: 360}}  columns={columns} dataSource={dataSource}  onChange={this.handleChange} rowSelection={rowSelection}
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