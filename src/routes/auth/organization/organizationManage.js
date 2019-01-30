import React, {PureComponent} from 'react';
import styles from './organizationManage.less';
import PropTypes from 'prop-types';
import { Table ,Button ,Spin ,Layout,Pagination,Form,Input} from 'antd';
import {ModalForm}  from 'components/Modal';
import FormSub from './Form';
import cx from 'classnames';
import { POST,GET,PUT,DELETE } from '../../../services/api';
import Authorized from '../../../utils/Authorized';

const { Content} = Layout;
const Modal = ModalForm.Modal;
const confirm = Modal.confirm;
const { ButtonAuthorize } = Authorized;


const columns = [
 {
    title: '机构名称',
    dataIndex: 'orgName',
    id: 'orgName',
    width: 200,
},{
    title: '机构类型',
    dataIndex: 'orgType',
    id: 'orgType',
    width: 150
},{
    title: '描述',
    dataIndex: 'orgRemark',
    id: 'orgRemark',
    width: 150
}, {
        title: '创建人',
        dataIndex: 'sysUserName',
        id: 'createUser',
        align: 'center',
        width: 100
},{
        title: '创建时间',
        dataIndex: 'sysDate',
        id: 'createDate',
        width: 150
}, {
    title: '最后修改人',
    dataIndex: 'lastModifiedUserName',
    id: 'updateUser',
    width: 100
}, {
    title: '最后修改时间',
    dataIndex: 'lastModifiedDate',
    id: 'updateDate',
    width: 150
}
];


export default class OrganizationManage extends PureComponent {

    static contextTypes = {
        openModal: PropTypes.func,
    };


    static defaultProps = {
        prefixCls: "antui-datatable",
        alternateColor: true
    }

    state = {
        columns:[],
        record: null,
        dataSource: [],
        rows: [],
        selectedRowKeys:[],
        loading:true,
        current:1,
        pageSize:10,
    };

    constructor(props,context) {
        super(props,context)

    }
    componentDidMount(){
        this.init();

    }


    init= () =>{
        const thiz = this;
        GET('/organization/findAll',function(result){
            if(result.success){

                thiz.setState({dataSource:result.result,loading:false})
            }
        },function(error){
            console.log(error)
        })
    }


    handleChange = (pagination, filters, sorter, extra) =>{
        this.setState({current:pagination.current,pageSize:pagination.pageSize});

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
            loading: true,
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

                DELETE('/organization/delete',rows,function(result){
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
            PUT('/organization/update',values,function(data){

                if(data.success){
                  thiz.closeModal();
                  thiz.init();
                }else{

                }
            },function(error){
                console.log(error);
            })
        }else {

            POST('/organization/add',values,function(data){
                console.log(data);
                if(data.success){

                    const json = values
                    thiz.closeModal();
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

        let {current,pageSize,rows,dataSource,loading} = this.state;
        const {prefixCls, className,alternateColor} = this.props;

        let classname = cx(

            {'ant_table_ui_tree':dataSource.length>0?true:false},
        );
        const rowSelection = {
            selectedRowKeys: rows,
            onChange: this.onSelectChange,
            onSelect: this.onSelect,
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

            <Layout className={styles.application} style={{border:"1px red"}}>
                <div>
                    <ButtonAuthorize icon="plus" type="primary" onClick={this.onAdd} name="新增" authority="organization:add"/>
                    <ButtonAuthorize icon="edit" disabled={!rows.length} onClick={this.edit} name="修改" authority="organization:update"/>
                    <ButtonAuthorize icon="delete" disabled={!rows.length} onClick={this.delete} name="删除" authority="organization:delete"/>

                </div>
                <Content  className={classname}>
                        <Table ref="tab" style={{background: '#fff',minHeight: 320,maxHeight:'100%'}}
                               height='80%'
                               rowKey='id'
                               columns={columns}
                               dataSource={dataSource}
                               defaultExpandAllRows={true}
                               onChange={this.handleChange}
                               rowSelection={rowSelection}
                               pagination={dataTableProps}
                               scroll={{ y: '72vh'}}
                        />
                </Content>

            </Layout>
        )

    }
}