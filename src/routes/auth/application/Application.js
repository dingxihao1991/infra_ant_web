import React, {PureComponent} from 'react';
import styles from './Application.less';
import { Table ,Button ,Layout,Pagination,Form,Input} from 'antd';
import {ModalForm,showConfirm}  from 'components/Modal';
import FormSub from './Form';
import { POST,GET,PUT,DELETE } from '../../../services/api';
import fetch from 'dva/fetch';

const FormItem = Form.Item;
const { Content, Header, Footer } = Layout;
const Modal = ModalForm.Modal;
const confirm = Modal.confirm;



const data = [
    {
    key: '1',
        applicationName: '地铁运维',
    code: 'station',
    createUser: '超级管理员',
    createDate: '2018-09-04 22:30:01',
    updateUser: '超级管理员'
}, {
    key: '2',
        applicationName: '管廊运维',
    code: 'gallery',
    createUser: '超级管理员',
    createDate: '2018-09-04 22:30:01',
    updateUser: '超级管理员'
},
    {
    key: '3',
    applicationName: '隧道运维',
    code: 'tunnel',
    createUser: '超级管理员',
    createDate: '2018-09-04 22:30:01',
    updateUser: '超级管理员'
},
// {
//     key: '4',
//     name: 'Jim Red',
//     code: 'tunnel1',
//     createUser: '超级管理员',
//     createDate: '2018-09-04 22:30:01',
//     updateUser: '超级管理员'
// }, {
//     key: '5',
//     name: 'Jim Red',
//     code: 'tunnel2',
//     createUser: '超级管理员',
//     createDate: '2018-09-04 22:30:01',
//     updateUser: '超级管理员'
// }, {
//     key: '6',
//     name: 'Jim Red',
//     code: 'tunnel3',
//     createUser: '超级管理员',
//     createDate: '2018-09-04 22:30:01',
//     updateUser: '超级管理员'
// }, {
//     key: '7',
//     name: 'Jim Red',
//     code: 'tunnel4',
//     createUser: '超级管理员',
//     createDate: '2018-09-04 22:30:01',
//     updateUser: '超级管理员'
// }, {
//     key: '8',
//     name: 'Jim Red',
//     code: 'tunnel5',
//     createUser: '超级管理员',
//     createDate: '2018-09-04 22:30:01',
//     updateUser: '超级管理员'
// }, {
//     key: '9',
//     name: 'Jim Red',
//     code: 'tunnel6',
//     createUser: '超级管理员',
//     createDate: '2018-09-04 22:30:01',
//     updateUser: '超级管理员'
// }, {
//     key: '10',
//     name: 'Jim Red',
//     code: 'tunnel7',
//     createUser: '超级管理员',
//     createDate: '2018-09-04 22:30:01',
//     updateUser: '超级管理员'
// }, {
//     key: '11',
//     name: 'Jim Red',
//     code: 'tunnel8',
//     createUser: '超级管理员',
//     createDate: '2018-09-04 22:30:01',
//     updateUser: '超级管理员'
// }, {
//     key: '12',
//     name: 'Jim Red',
//     code: 'tunnel9',
//     createUser: '超级管理员',
//     createDate: '2018-09-04 22:30:01',
//     updateUser: '超级管理员'
// }
];

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
        filteredInfo: null,
        sortedInfo: null,
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
        let { sortedInfo, filteredInfo } = this.state;
        sortedInfo = sortedInfo || {};
        filteredInfo = filteredInfo || {};

        const columns = [{
            title: '应用名称',
            dataIndex: 'applicationName',
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
            title: '应用标识',
            dataIndex: 'code',
            id: 'code',
            sorter: (a, b) => a.age - b.age,
            sortOrder: sortedInfo.columnKey === 'age' && sortedInfo.order,
        }, {
            title: '创建人',
            dataIndex: 'sysUserId',
            id: 'createUser',

        }, {
            title: '创建时间',
            dataIndex: 'sysDate',
            id: 'createDate',
            sorter: (a, b) => a.createDate.length - b.createDate.length,
            sortOrder: sortedInfo.columnKey === 'createDate' && sortedInfo.order,
        }, {
            title: '最后修改人',
            dataIndex: 'lastModifiedUserId',
            id: 'updateUser',
        }];
        const thiz = this;
        GET('/application/gl/findAll',function(result){
            if(result.success){

                thiz.setState({dataSource:result.result})
            }
        },function(error){
            console.log(error)
        })
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
        //this.setState({ dataSource: dataSource.filter(item=> item.key !== record['key'])});
        this.setState({ dataSource: dataSource.filter(item => !rows.some(jtem=>jtem.id == item.id))});

        confirm({
            title: '提示信息',
            content: '确定删除【'+rows.length+'】行数据吗?',
            okText: '确定',
            okType: 'danger',
            cancelText: '取消',
            onOk() {
                let params = []
                rows.map(value=>{
                    console.log("---------",value)
                    params.push(value.id);
                });
                DELETE('/application/delete',params,function(result){

                },function(error){
                    console.log(error)
                })
            },
            onCancel() {

            },

        })



    }

    render() {
        let { columns, visible,record,rows,dataSource} = this.state;

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
            onCancel: () => {
                this.setState({
                    record: null,
                    visible: false
                })
            },
            onSubmit: (values) => {
                console.log('-------------'+JSON.stringify(values));
                if(thiz.state.record!=null){

                    values['id']=thiz.state.record.id;

                    PUT('/application/update',values,function(data){
                        console.log(data);
                        if(data.success){

                            const json = values
                            // thiz.setState({dataSource:[...dataSource,json]})

                        }else{

                        }
                    },function(error){
                        console.log(error);
                    })
                }else {

                    POST('/application/add',values,function(data){
                        console.log(data);
                        if(data.success){

                            const json = values
                            thiz.setState({dataSource:[...dataSource,json]})

                        }
                    },function(error){
                        console.log(error);
                    })

                }


                // fetch('http://localhost:8888/application/add',{
                //     method:'POST',
                //     //mode:'cors',// 避免cors攻击
                //     //credentials: 'include'
                //     headers:{
                //         //'Accept': 'application/json',
                //         //'Content-Type':'application/x-www-form-urlencoded'
                //         'Content-Type':'application/json;charset=utf-8'
                //     },
                //     //body:'applicationName=123&key=test&describe=测试'//JSON.stringify({args:'213'})
                //     body:JSON.stringify(values)
                // }).then(function(response) {
                //     //打印返回的json数据
                //     console.log(response);
                //     response.json().then(function(data){      //将response进行json格式化
                //         console.log(data);
                //         if(data.success){
                //
                //             const json = values
                //             thiz.setState({dataSource:[...dataSource,json]})
                //
                //         }
                //
                //     });
                // }).catch(function(e) {
                //     console.log("Oops, error");
                // });
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
                    <Table rowKey='id' style={{  background: '#fff', minHeight: 360}}  columns={columns} dataSource={dataSource}  onChange={this.handleChange} rowSelection={rowSelection}
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