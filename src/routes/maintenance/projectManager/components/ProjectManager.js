import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import { Table ,Button ,Layout,Pagination,Input,message,Dropdown,Menu,Tooltip} from 'antd';
import {ModalForm,showConfirm}  from 'components/Modal';
import { connect } from 'dva';
import Authorized from '../../../../utils/Authorized';
import AdvancedSearchForm from './SearchForm';
import FormSub from './Form';
import styles from "../style/ProjectManager.less"; //引入样式
const { ButtonAuthorize } = Authorized;
const { Content } = Layout;
const Modal = ModalForm.Modal;
const confirm = Modal.confirm;

@connect(({loading, projectManager}) => ({
  projectManager
}))
export default class ProjectManager extends PureComponent {

  static contextTypes = {
    openModal: PropTypes.func,
  };

  state = {
    title:'新增工程',
    columns:[],
    dataSource:[],
    record: null,
    rows: [],
    current:1,
    pageSize:10,
  };

  constructor(props,context) {
    super(props,context)

  }

  componentDidMount(){
    this.initColums();
    const {dispatch } = this.props;
    dispatch({
      type: 'projectManager/fetch',
      payload: {
      },
    });
  }

  initColums = ()=>{
    const columns = [
        {
            title: '状态',
            dataIndex: 'state',
            width: 200,
            render:(text,record)=>{
              return (
                  <span style={{color: text == "待审批" ? '#3F51B5' : text == "审批未通过" ? '#F44336' : text == "审批通过" ? '#4CAF50' :
                              text == "已开工" ? '#00BCD4' : text == "已竣工" ? '#BA68C8' : text == "未开工" ? '#FB8C00' : '#ccc'}}>{text}</span>
              )
            }
        },
      {
          title: '工程名称',
          dataIndex: 'projectName',
          width: 300,
      },
      {
          title: '工程类型',
          dataIndex: 'projectType',
          width: 200,
      },{
          title: '管线类型',
          dataIndex: 'pipeType',
          width: 200,
      },{
          title: '所属管廊',
          dataIndex: 'galley',
          width: 300,
          render: (text, record) => {
              return (
                  <Tooltip placement="topLeft" title={text}>
                    <div style={{width:'260px'}} className="table-slop">{text}</div>
                  </Tooltip>
              )
          }
      } ,{
          title: '所在位置',
          dataIndex: 'road',
          width: 300,
      },{
          title: '道路范围',
          dataIndex: 'nearbyRoad',
          width: 250,
      }, {
            title: '申报日期',
            dataIndex: 'applyDate',
            width: 250,
        },{
            title: '申报单位',
            dataIndex: 'applyUnit',
            width: 250,
        },{
            title: '项目审核日期',
            dataIndex: 'projectAuditDate',
            width: 200,
        },{
            title: '项目审核人',
            dataIndex: 'projectAuditOperator',
            width: 150,
        },{
            title: '项目审批单位',
            dataIndex: 'projectAuditUnit',
            width: 150,
        },{
            title: '开工日期',
            dataIndex: 'startDate',
            width: 200,
        },{
            title: '竣工日期',
            width:200,
            dataIndex: 'completedDate',
        }
    ];
    this.setState({columns:columns})
  }

    openModel = record =>{
        const modalFormProps = {
            title:'BIM属性',
            record:record,
            isFooter:true,
            isShow:true,
            Contents:FormSub,
            modalOpts: {
                width: 700,
            },
            onSubmit: (values) => this.onSubmit(values)
        }
        this.context.openModal(modalFormProps);
    }

  //编辑
    edit =(record)=>{
        this.openModel(record)
    }

  //新增事件
  onAdd = () => {
    this.openModel()
  };

  delete =(record)=> {
    confirm({
      title: '提示信息',
      content: '确定删除吗?',
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        message.success("删除成功");
      },
      onCancel() {

      },
    })
  }

  batchDelete=() => {
    const {rows } = this.state
    confirm({
      title: '提示信息',
      content: '确定删除【'+rows.length+'】行数据吗?',
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        message.success("删除成功");
      },
      onCancel() {

      },
    })
  }

  submitExamine =()=> {
      const {rows } = this.state
      confirm({
          title: '提示信息',
          content: '确定提交【'+rows.length+'】行数据吗?',
          okText: '确定',
          okType: 'danger',
          cancelText: '取消',
          onOk() {
              message.success("删除成功");
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
        console.log("submit:" + JSON.stringify(values))
    }

    handlerDoubleClick = (record, index, event) => {
        this.openModel(record);

    };

  render() {
    const {
      projectManager :{list},
      loading,
    } = this.props;

    let { columns,rows,pageSize,current} = this.state;

      const rowSelection = {
          onRowDoubleClick:this.handlerDoubleClick,
          onChange: this.onSelectChange,
      };

    const dataTableProps ={
      total: list?list.length:null,
      pageSize: pageSize,
      current:current,
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: total => `共 ${list.length} 条`,
    }

    return(
        <Layout className={styles.application}>
          <div className={styles.tableOperations}>
              <ButtonAuthorize icon="plus" type="primary" onClick={this.onAdd} name="新增工程" authority="role:add"/>
              {/* <ButtonAuthorize icon="edit" disabled={!rows.length} onClick={this.edit} name="修改" authority="role:update"/>*/}
              <ButtonAuthorize icon="delete" disabled={!rows.length} onClick={this.batchDelete} name="批量删除" authority="role:delete"/>
              <ButtonAuthorize icon="delete" disabled={!rows.length} onClick={this.submitExamine} name="提交审批" authority="role:delete"/>
          </div>
          <Content   className='ant_table_ui' >
            <Table size="middle" rowKey='id' style={{  background: '#ffffff', minHeight: 360}} columns={columns} dataSource={list} onChange={this.handleChange} rowSelection={rowSelection}
                   loading={loading}
                   pagination={dataTableProps}
                   scroll={{x: 2900,y: '73vh'}}
            />
          </Content>
        </Layout>
    )

  }
}
