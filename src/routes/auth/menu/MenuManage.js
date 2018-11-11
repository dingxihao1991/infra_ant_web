import React, {PureComponent} from 'react';
import styles from './MenuManage.less';
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

    state = {
        columns:[],
        record: null,
        visible: false,
        dataSource: [],
        rows: [],
        selectedRowKeys:[],
        loading:true

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

                thiz.setState({dataSource:result.result,loading:false})
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
            //record: rows[0],
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

            POST('/menu/add',values,function(data){
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

    selectedRowKeys =()=>{
        console.log("selectedRowKeys",this.state.rows)
        this.state.rows.map(item => item.rowKey)
    }

    closeModal = () =>{
        this.setState({
            visible: false
        });
    }


    render() {
        let {visible,record,rows,dataSource,loading} = this.state;
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
            onCancel: () => this.closeModal(),
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
                <div>
                    <ButtonAuthorize icon="plus" type="primary" onClick={this.onAdd} name="新增" authority="menu:add"/>
                    <ButtonAuthorize icon="edit" disabled={!rows.length} onClick={this.edit} name="修改" authority="menu:update"/>
                    <ButtonAuthorize icon="delete" disabled={!rows.length} onClick={this.delete} name="删除" authority="menu:delete"/>
                </div>
                <Content  className={classname}>
                    <Table ref="tab" style={{background: '#fff'}}
                           height='80%'
                           rowKey='id'
                           //scroll={{  y: 450 }}
                           loading={loading}
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
                </Content>
                {/*<Footer>*/}
                    {/*<Pagination {...paging}></Pagination>*/}
                {/*</Footer>*/}
                <ModalForm {...modalFormProps}/>
            </Layout>
        )

    }
}