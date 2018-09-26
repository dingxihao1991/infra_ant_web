import React, {PureComponent} from 'react';
import styles from './MenuManage.less';
import PropTypes from 'prop-types';
import { Table ,Button ,Layout,Pagination,Form,Input} from 'antd';
import {ModalForm}  from 'components/Modal';
import FormSub from './Form';
import cx from 'classnames';
import { POST,GET,PUT,DELETE } from '../../../services/api';

const FormItem = Form.Item;
const { Content, Header, Footer } = Layout;
const Modal = ModalForm.Modal;
const confirm = Modal.confirm;


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

export default class MenuManage extends PureComponent {

    static propTypes = {
        rows: PropTypes.array,
    }

    static defaultProps = {
        prefixCls: "antui-datatable",
        alternateColor: true
    }

    state = {
        columns:[],
        record: null,
        visible: false,
        dataSource: [],
        rows: [],
        selectedRowKeys:[]
    };

    constructor(props,context) {
        super(props,context)

    }
    componentDidMount(){
        this.init();
        this.initColums();
    }

    initColums = () =>{

        const columns = [{
            title: '菜单名称',
            dataIndex: 'menuName',
            id: 'menuName',
            width: 200

        }, {
            title: '菜单图标',
            dataIndex: 'menuIcon',
            id: 'menuIcon',
            width: 100,
        },{
            title: '菜单类型',
            dataIndex: 'menuType',
            id: 'menuType',
            width: 100
        },{
            title: 'URL资源',
            dataIndex: 'menuPath',
            id: 'menuPath',
            width: 150
        },{
            title: '描述',
            dataIndex: 'menuRemark',
            id: 'menuRemark',
            width: 100
        },
        {
            title: '创建时间',
            dataIndex: 'sysDate',
            id: 'createDate',
            width: 150
        }, {
            title: '最后修改人',
            dataIndex: 'lastModifiedUser',
            id: 'updateUser',
                width: 100
        }, {
            title: '最后修改时间',
            dataIndex: 'lastModifiedDate',
            id: 'updateDate',
                width: 150
        }
        ];
        this.setState({columns:columns})
    }

    init= () =>{
        const thiz = this;
        GET('/menu/findAll',function(result){
            if(result.success){

                thiz.setState({dataSource:result.result})
            }
        },function(error){
            console.log(error)
        })
    }


    handleChange = (pagination, filters, sorter) => {
        console.log('Various parameters', pagination, filters, sorter);

    }


    //选中项发生变化时的回调
    onSelectChange = (selectedRowKeys,selectedRows) => {

        this.setState({selectedRowKeys:selectedRowKeys,record:selectedRows[0]});
    }


    //分页回调事件
    onChange=(page, pageSize) =>{
        console.log(page);
    }

    //用户手动选择/取消选择某列的回调
    onSelect =(record, selected, selectedRows, nativeEvent) =>{
        let selectedRowKeys = this.state.rows;

        let array = []
        let forech = function(item){

            array.push(item.id)
            if(item.children){
                for(var i=0;i<item.children.length;i++){
                    let value = item.children[i]
                    array.push(value.id);
                    if('children' in  value){
                        forech(value);
                    }

                }
            }
        }

        forech(record);

        if(!selected){
            const data = this.state.rows;

            array = data.filter(item => !array.some(jtem=>jtem == item));
            selectedRowKeys = data.filter(item => !selectedRowKeys.some(jtem=>jtem == item));

        }

        let rows = [...selectedRowKeys,...array]
        this.setState({rows:rows});
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

                DELETE('/menu/delete',rows,function(result){
                    if(result.success){
                        thiz.setState({ dataSource: dataSource.filter(item => !rows.some(jtem=>jtem == item.id))});
                    }else{
                        Modal.error({
                            title: '错误信息',
                            content: result.message,
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

    onSubmit = (values) =>{
        let thiz = this;
        if(thiz.state.record!=null){

            values['id']=thiz.state.record.id;

            PUT('/menu/update',values,function(data){
                console.log(data);
                if(data.success){

                    thiz.init();
                }else{

                }
            },function(error){
                console.log(error);
            })
        }else {

            POST('/menu/add',values,function(data){
                console.log(data);
                if(data.success){

                    const json = values
                    thiz.init();
                }
            },function(error){
                console.log(error);
            })

        }
    }

    selectedRowKeys =()=>{
        console.log("selectedRowKeys",this.state.rows)
        this.state.rows.map(item => item.rowKey)
    }


    render() {
        let { columns, visible,record,rows,dataSource} = this.state;
        const {prefixCls, className,alternateColor} = this.props;

        let classname = cx(
            prefixCls,
            className,
            {'table-row-alternate-color': alternateColor},
        );
        const rowSelection = {
            selectedRowKeys: rows,
            onChange: this.onSelectChange,
            onSelect: this.onSelect,
        };

        const modalFormProps = {
            loading: true,
            record,
            visible,
            Contents:FormSub,
            modalOpts: {
                width: 700,
            },
            onCancel: () => {
                this.setState({
                    record: null,
                    visible: false
                })
            },
            onSubmit: (values) => this.onSubmit(values)
        }

        const paging = {
            total: dataSource.length,
           // pageSize: pageSize,
            current: 1,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: total => `共 ${total} 条`,
            onShowSizeChange: (pageNum, pageSize) => this.onChange({pageNum, pageSize}),
            onChange: (pageNum) => this.onChange({pageNum}),

        };

        return(

            <Layout className={styles.application} style={{border:"1px red"}}>
                <div className={styles.tableOperations}>
                    <Button icon="plus" type="primary" onClick={this.onAdd}>新增</Button>
                    <Button icon="edit" disabled={!rows.length} onClick={this.edit}>修改</Button>
                    <Button icon="delete" disabled={!rows.length} onClick={this.delete}>删除</Button>
                </div>
                <Content  className={classname}>

                    {dataSource && dataSource.length ?
                        <Table ref="tab" style={{background: '#fff',minHeight: 320,maxHeight:'100%'}}
                               size="small"
                               height='80%'
                               rowKey='id'
                               scroll={{  y: 450 }}
                               columns={columns}
                               dataSource={dataSource}
                               defaultExpandAllRows={true}
                               onChange={this.handleChange}
                               rowSelection={rowSelection}
                               pagination={dataSource.length<10?false:{
                                   showSizeChanger:true,
                                   showQuickJumper:true,
                                   total:dataSource.length,
                                   onChange:this.onChange
                               }
                               }

                        />
                        : '暂无数据' }
                </Content>
                {/*<Footer>*/}
                    {/*<Pagination {...paging}></Pagination>*/}
                {/*</Footer>*/}
                <ModalForm {...modalFormProps}/>
            </Layout>
        )

    }
}