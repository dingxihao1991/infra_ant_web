import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import { Table ,Button ,Layout,Pagination,Form,Input,message} from 'antd';
import {ModalForm}  from 'components/Modal';
import FormSub from './Form';
import Authorized from '../../../utils/Authorized';
import cx from 'classnames';
import { POST,GET,PUT,DELETE } from '../../../services/api';

const { Content} = Layout;
const Modal = ModalForm.Modal;
const confirm = Modal.confirm;
const { ButtonAuthorize } = Authorized;

const columns = [
{
    title: '菜单名称',
    dataIndex: 'menuName',
    id: 'menuName',
    width: 200

}, {
    title: '权限标识',
    dataIndex: 'authCode',
    id: 'authCode',
    width: 150,
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
},{
        title: '序号',
        dataIndex: 'menuSrno',
        id: 'menuSrno',
        width: 100
    },
    {
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


export default class MenuManage extends PureComponent {

    static contextTypes = {
        openModal: PropTypes.func,
    };

    state = {
        columns:[],
        record: null,
        dataSource: [],
        rows: [],
        selectedRowKeys:[],
        current:1,
        pageSize:10,

    };

    constructor(props,context) {
        super(props,context);
    }

    componentDidMount(){
        this.init();
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


    handleChange = (pagination, filters, sorter, extra) =>{
        this.setState({current:pagination.current,pageSize:pagination.pageSize});

    }


    //选中项发生变化时的回调
    onSelectChange = (selectedRowKeys,selectedRows) => {
        console.log('selectedRowKeys changed: ', selectedRows);
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
        const {rows} = this.state;

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
                        message.success("删除成功");
                        thiz.setState({ dataSource: dataSource.filter(item => !rows.some(jtem=>jtem == item.id))});
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

    onSubmit = (values) =>{
        let thiz = this;
        if(thiz.state.record!=null){
            values['id']=thiz.state.record.id;

            PUT('/menu/update',values,function(data){
                console.log(data);
                if(data.success){
                    message.success('修改成功');
                    //thiz.closeModal();
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

            POST('/menu/add',values,function(data){
                console.log(data);

                if(data.success){
                    message.success('新增成功');
                   // thiz.closeModal();
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

    selectedRowKeys =()=>{
        console.log("selectedRowKeys",this.state.rows)
        this.state.rows.map(item => item.rowKey)
    }


    render() {
        let {current,pageSize,rows,dataSource} = this.state;
        const {prefixCls, className,alternateColor} = this.props;

        let classname = cx(
            {'ant_table_ui_tree':dataSource.length>0?true:false},
            'ant_table_ui'
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

            <Layout>
                <div>
                    <ButtonAuthorize icon="plus" type="primary" onClick={this.onAdd} name="新增" authority="menu:add"/>
                    <ButtonAuthorize icon="edit" disabled={!rows.length} onClick={this.edit} name="修改" authority="menu:update"/>
                    <ButtonAuthorize icon="delete" disabled={!rows.length} onClick={this.delete} name="删除" authority="menu:delete"/>
                </div>
                <Content  className={classname} >
                    <Table ref="tab" style={{background: '#fff'}}
                           height='80%'
                           rowKey='id'
                           scroll={{  y: '73vh' }}
                           columns={columns}
                           dataSource={dataSource}
                           defaultExpandAllRows={true}
                           onChange={this.handleChange}
                           rowSelection={rowSelection}
                           pagination={dataTableProps}

                    />
                </Content>
                {/*<Footer>*/}
                    {/*<Pagination {...paging}></Pagination>*/}
                {/*</Footer>*/}
            </Layout>
        )

    }
}