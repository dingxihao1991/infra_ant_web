import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import styles from '../../workManage.less';
import { Table ,Button ,Layout,Pagination,Form,Input,message,Dropdown,Menu,Icon,Row,Col} from 'antd';
import {ModalForm,showConfirm}  from 'components/Modal';
import { POST,GET,PUT,DELETE } from '../../../../services/api';
import Authorized from '../../../../utils/Authorized';
import AdvancedSearchForm from './SearchForm';
import WorkPlanDetail from "../../public/WorkDetail";
import WorkPlanDetailByComp from "./TaskRecordDetailByCompleted";
import { connect } from 'dva';

const { ButtonAuthorize } = Authorized;
const { Content } = Layout;
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

@connect(({loading, workRecord}) => ({
  workRecord
}))
export default class TaskRecord extends PureComponent {

  static contextTypes = {
    openModal: PropTypes.func,
  };

  state = {
    title:'新增工作计划',
    form:null,
    columns:[],
    dataSource:[],
    record: null,
    visible: false,
    rows: [],
    loading:true,
    isFooter:false,
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
      type: 'workRecord/fetch',
      payload: {
      },
    });
    this.init();
  }

  initColums = ()=>{
    const columns = [
      {
        title: '隧道名称',
        dataIndex: 'gallery_name',
        id: 'gallery_name',
        align: 'center',
        key:'gallery_name'
      },
      {
        title: '任务名称',
        dataIndex: 'work_name',
        id: 'work_name',
        align: 'center',
        key:'work_name'
      }, {
        title: '任务详细',
        dataIndex: 'work_detailed',
        id: 'work_detailed',
        align: 'center',
        key:'work_detailed'
      } ,{
        title: '计划类型',
        dataIndex: 'work_plan_type',
        id: 'work_plan_type',
        align: 'center',
        key:'work_plan_type'
      },{
        title: '任务类型',
        dataIndex: 'work_type',
        id: 'work_type',
        align: 'center',
        key:'work_type'
      },{
        title: '任务执行人',
        dataIndex: 'work_user',
        id: 'work_user',
        align: 'center',
        key:'work_user'
      },{
        title: '任务状态',
        dataIndex: 'work_status',
        id: 'work_status',
        align: 'center',
        key:'work_status'
      },
      {
        title: '预计开始时间',
        dataIndex: 'startDate',
        id: 'startDate',
        align: 'center',
      },
      {
        title: '预计结束时间',
        dataIndex: 'endDate',
        id: 'endDate',
        align: 'center',
      },{ //增加操作栏
        title: '操作',
        dataIndex: '9',
        id: '9',
        align: 'center',
        width: 150,
        render: (text, record) => (
          <Dropdown overlay={
            <Menu>
              <Menu.Item key="1"><Button style={{ marginRight: 0 }} icon="form" onClick={() => this.complete(record)}>完成任务</Button></Menu.Item>
            </Menu>
          }>
            <Button >
              操作 <Icon type="down" />
            </Button>
          </Dropdown>

        ),
      }
    ];
    this.setState({columns:columns})
  }

  init= () =>{
    const thiz = this;
    const {
      workRecord :{list},
    } = this.props;
    console.log("-----------",list)
  /*  GET('/roles',function(result){
      if(result.success){
        thiz.setState({
          dataSource:result.result,
          loading:false,
        })
      }
    },function(error){
      console.log(error)
    })*/
  }

  batchComplete=() => {
    const {rows , record} = this.state
    console.log(rows)
    console.log(record)
    alert(record.id);
  }

  complete =(record)=> {
    console.log(record)
    confirm({
      title: '提示信息',
      content: '确定完成任务吗?',
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        message.success("操作成功");
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
    let i = 100
    console.log("submit:" + JSON.stringify(values))
  }

  handlerDoubleClick = (record, index, event) => {
    console.log("record =============",record)
    let modalFormProps = null;
    if(record.work_status == '已完成'){
        modalFormProps = {
          title:"详细信息",
          record,
          Contents:WorkPlanDetailByComp,
          maskClosable:true,
          isShow:true,
          modalOpts: {
            style:{ top: 20 },
            width: 1200,
          },
          isFooter:true,
          full:true,
        }
    }else{
       modalFormProps = {
        title:"详细信息",
        record,
        Contents:WorkPlanDetail,
        maskClosable:true,
        isShow:true,
        modalOpts: {
          style:{ top: 20 },
          width: 1200,
        },
        isFooter:true,
      }
    }
    this.context.openModal(modalFormProps);
  };

  filter = (flag) => {
    const {dispatch } = this.props;
    dispatch({
      type: 'workRecord/filter',
      payload: {
        tags:{
          data:flag
        }
      },
    });
  }

  render() {
    let { columns,visible,record,rows,form,title,isFooter,pageSize,current} = this.state;

    const dataTableProps ={
      total: list?list.length:null,
      pageSize: pageSize,
      current:current,
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: total => `共 ${list.length} 条`,
    }

    const {
      workRecord :{list},
      loading,
    } = this.props;

    const rowSelection = {
      onChange: this.onSelectChange,
    };

    const modalFormProps = {
      title:title,
      loading: true,
      record,
      visible,
      isFooter,
      Contents:form,
      modalOpts: {
        width: 700,
      },
      onCancel: () => this.closeModal(),
      onSubmit: (values) => this.onSubmit(values)
    }


    const event = {
      filter: this.filter,
    }

    return(
      <Layout className={styles.application}>
        <div style={{ background: 'white'}}>
          <AdvancedSearchForm {...event}/>
          {/*<ButtonAuthorize icon="plus" type="primary" onClick={this.onAdd} name="新增" authority="role:add"/>*/}
         {/* <ButtonAuthorize icon="edit" disabled={!rows.length} onClick={this.edit} name="修改" authority="role:update"/>*/}
          <ButtonAuthorize icon="delete" disabled={!rows.length} onClick={this.batchComplete} name="完成任务" authority="role:delete"/>
        </div>
        <Content className='ant_table_ui'>
          <Table  rowKey='id' style={{  background: '#fff', minHeight: 360}}  columns={columns} dataSource={list}  onChange={this.handleChange} rowSelection={rowSelection}
                  loading={loading}
                  pagination={dataTableProps}
                  scroll={{y: '73vh'  }}
                  onRowDoubleClick={this.handlerDoubleClick}
          />
        </Content>
        <ModalForm {...modalFormProps}/>
      </Layout>
    )

  }
}