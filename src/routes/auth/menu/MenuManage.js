import React, {PureComponent} from 'react';
import styles from './MenuManage.less';
import { Table ,Button ,Layout,Pagination,Form,Input} from 'antd';
import {ModalForm}  from 'components/Modal';
import FormSub from './Form';
import fetch from 'dva/fetch';

const FormItem = Form.Item;
const { Content, Header, Footer } = Layout;
const Modal = ModalForm.Modal;



const data = [
    {
        key: '1',
        name: '后台管理',
        icon:'',
        type:'菜单',
        menu_path:'',
        describe:'',
        createUser: '超级管理员',
        createDate: '2018-09-04 22:30:01',
        updateUser: '超级管理员',
        children:[{
            key:'1_1',
            icon:'',
            name:'应用管理',
            type:'URL资源',
            menu_path:'',
            describe:'',
            createUser: '超级管理员',
            createDate: '2018-09-04 22:30:01',
            updateUser: '超级管理员',
            children:[{
                key:'1_1_1',
                icon:'',
                name:'新增',
                type:'按钮',
                menu_path:'/application/add',
                describe:'',
                createUser: '超级管理员',
                createDate: '2018-09-04 22:30:01',
                updateUser: '超级管理员',
            },{
                key:'1_1_2',
                icon:'',
                name:'修改',
                type:'按钮',
                menu_path:'/application/update',
                describe:'',
                createUser: '超级管理员',
                createDate: '2018-09-04 22:30:01',
                updateUser: '超级管理员',
            },{
                key:'1_1_3',
                icon:'',
                name:'删除',
                type:'按钮',
                menu_path:'/application/delete',
                describe:'',
                createUser: '超级管理员',
                createDate: '2018-09-04 22:30:01',
                updateUser: '超级管理员',
            }]
        },{
            key:'1_2',
            icon:'',
            name:'菜单管理',
            type:'URL资源',
            menu_path:'',
            describe:'',
            createUser: '超级管理员',
            createDate: '2018-09-04 22:30:01',
            updateUser: '超级管理员',
            children:[{
                key:'1_2_1',
                icon:'',
                name:'新增',
                type:'按钮',
                menu_path:'/menu/add',
                describe:'',
                createUser: '超级管理员',
                createDate: '2018-09-04 22:30:01',
                updateUser: '超级管理员',
            },{
                key:'1_2_2',
                icon:'',
                name:'修改',
                type:'按钮',
                menu_path:'/menu/update',
                describe:'',
                createUser: '超级管理员',
                createDate: '2018-09-04 22:30:01',
                updateUser: '超级管理员',
            },{
                key:'1_2_3',
                icon:'',
                name:'删除',
                type:'按钮',
                menu_path:'/menu/delete',
                describe:'',
                createUser: '超级管理员',
                createDate: '2018-09-04 22:30:01',
                updateUser: '超级管理员',
            }]
        }]
    }, {
        key: '2',
        name: '资产备品备件管理',
        icon:'',
        type:'菜单',
        menu_path:'',
        describe:'',
        createUser: '超级管理员',
        createDate: '2018-09-04 22:30:01',
        updateUser: '超级管理员',
        children:[{
            key: '2_1',
            icon: '',
            name: '设备资产',
            type: 'URL资源',
            menu_path: '/asset/asset',
            describe: '',
            createUser: '超级管理员',
            createDate: '2018-09-04 22:30:01',
            updateUser: '超级管理员',
        },{
            key: '2_2',
            icon: '',
            name: '备品备件',
            type: 'URL资源',
            menu_path: '/asset/',
            describe: '',
            createUser: '超级管理员',
            createDate: '2018-09-04 22:30:01',
            updateUser: '超级管理员',
        }]
    }];



export default class MenuManage extends PureComponent {
    state = {
        filteredInfo: null,
        sortedInfo: null,
        columns:[],
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
        let { sortedInfo, filteredInfo } = this.state;
        sortedInfo = sortedInfo || {};
        filteredInfo = filteredInfo || {};

        const columns = [{
            title: '菜单名称',
            dataIndex: 'name',
            id: 'name',
            filters: [
                { text: 'Joe', value: 'Joe' },
                { text: 'Jim', value: 'Jim' },
            ],
            filteredValue: filteredInfo.name || null,
            onFilter: (value, record) => record.name.includes(value),
            sorter: (a, b) => a.name.length - b.name.length,
            sortOrder: sortedInfo.columnKey === 'name' && sortedInfo.order,
        }, {
            title: '菜单图标',
            dataIndex: 'icon',
            id: 'code',
            sorter: (a, b) => a.age - b.age,
            sortOrder: sortedInfo.columnKey === 'age' && sortedInfo.order,
        },{
            title: '菜单类型',
            dataIndex: 'type',
            id: 'code',
            sorter: (a, b) => a.age - b.age,
            sortOrder: sortedInfo.columnKey === 'age' && sortedInfo.order,
        },{
            title: 'URL资源',
            dataIndex: 'menu_path',
            id: 'code',
            sorter: (a, b) => a.age - b.age,
            sortOrder: sortedInfo.columnKey === 'age' && sortedInfo.order,
        },{
            title: '描述',
            dataIndex: 'describe',
            id: 'code',
            sorter: (a, b) => a.age - b.age,
            sortOrder: sortedInfo.columnKey === 'age' && sortedInfo.order,
        },  {
            title: '创建人',
            dataIndex: 'createUser',
            id: 'createUser',

        }, {
            title: '创建时间',
            dataIndex: 'createDate',
            id: 'createDate',
            sorter: (a, b) => a.createDate.length - b.createDate.length,
            sortOrder: sortedInfo.columnKey === 'createDate' && sortedInfo.order,
        }, {
            title: '最后修改人',
            dataIndex: 'updateUser',
            id: 'updateUser',
        }];
        this.setState({columns:columns})
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
        console.log('selectedRowKeys changed: ', selectedRowKeys,selectedRows);
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
            record: rows[0],
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
        const {rows,record} = this.state

    }

    render() {
        let { columns, visible,record,rows} = this.state;

        const rowSelection = {
            onChange: this.onSelectChange,
            //onSelect: this.onSelect,
        };
        const  from = FormSub;

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
                console.log('-------------',values);
                fetch('http://localhost:8888/auth/login',{                       // 发送请求
                    method:'POST',                            //请求方式    (可以自己添加header的参数)
                    //mode:'cors',// 避免cors攻击
                    //credentials: 'include'
                }).then(function(response) {
                    //打印返回的json数据
                    response.json().then(function(data){      //将response进行json格式化
                        console.log(data);                        //打印
                    });
                }).catch(function(e) {
                    console.log("Oops, error");
                });
                // POST('http://localhost:8888/auth/login');
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
                    <Table style={{  background: '#fff', minHeight: 360}}  columns={columns} dataSource={data}
                           defaultExpandAllRows={true}
                           onChange={this.handleChange}
                           rowSelection={rowSelection}
                           pagination={{
                               showSizeChanger:true,
                               showQuickJumper:true,
                               total:data.length,
                               onChange:this.onChange
                           }}
                    />
                </Content>
                <ModalForm {...modalFormProps}/>
            </Layout>
        )

    }
}