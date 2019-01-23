import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import styles from '../../workManage.less';
import { Table ,Button ,Layout,Pagination,Form,Input,message,Dropdown,Menu,Icon,Row,Col} from 'antd';
import {ModalForm,showConfirm}  from 'components/Modal';
import { connect } from 'dva';
import Authorized from '../../../../utils/Authorized';
import AdvancedSearchForm from './SearchForm';
import FormSub from './Form';
import WorkPlanDetail from "../../workPlan/components/WorkPlanDetail";
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

@connect(({loading, workTask}) => ({
  workTask
}))
export default class TaskPlan extends PureComponent {

  static contextTypes = {
    openModal: PropTypes.func,
  };

  state = {
    title:'新增工作计划',
    form:FormSub,
    columns:[],
    dataSource:[],
    record: null,
    visible: false,
    rows: [],
    loading:true,
    isFooter:false,
  };

  constructor(props,context) {
    super(props,context)

  }

  componentDidMount(){
    this.initColums();
    this.init();
    const {dispatch } = this.props;
    dispatch({
      type: 'workTask/fetch',
      payload: {
      },
    });
  }

  initColums = ()=>{
    const columns = [
      {
        title: '管廊名称',
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
      }, {
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
              <Menu.Item key="1"><Button style={{ marginRight: 5 }} icon="form" onClick={() => this.edit(record)}>修改</Button></Menu.Item>
              <Menu.Item key="2"><Button style={{ marginRight: 5 }} icon="form" onClick={() => this.delete(record)}>删除</Button></Menu.Item>
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
   /* thiz.setState({
     dataSource:taskData,
     loading:false,
   })*/
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

  //编辑
  edit =(record)=>{
    console.log(record)
    this.setState({
      title:'修改任务',
      record:record,
      visible: true,
      form:FormSub,
      isFooter:false
    });
  }

  //新增事件
  onAdd = () => {
    this.setState({
      title:'新增任务',
      visible: true,
      form:FormSub,
      record:null,
      isFooter:false
    });
  };

  delete =(record)=> {
    console.log(record)
    alert(record.id);
    /*

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
        DELETE('/role/delete', params , function(result){
          if(result.success){
            message.success("删除成功");
            thiz.setState({ dataSource: dataSource.filter(item => !rows.some(jtem=>jtem.id == item.id))});
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

    })*/

  }

  batchDelete=() => {
    const {rows , record} = this.state
    console.log(rows)
    console.log(record)
    alert(record.id);
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
    let i = 200
    console.log("submit:" + JSON.stringify(values))
/*    tableData.push({
      "id":++i,
      "sys_Date":null,
      "lastModifiedDate":null,
      "markAsDeleted":false,
      "gallery_name_id":"2",
      "gallery_name":values.gallery_name,
      "work_name":values.work_name,
      "work_detailed":values.work_detailed,
      "work_line":values.work_line,
      "work_line_id":null,
      "work_status":"启动",
      "work_user":"王强",
      "work_time":values.work_time,
      "work_type":'养护',
      "startDate":"2018-11-03 12:45:00",
      "endDate":"2018-11-03 23:30:00",
    })*/
    /*
    const thiz = this;
    if(thiz.state.record!=null){
      values['id'] = thiz.state.record.id;
      PUT('/role/update',values,function(data){
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
      POST('/role/add',values,function(data){
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

    }*/
  }

  handlerDoubleClick = (record, index, event) => {
    const modalFormProps = {
      title:"详细信息",
      record,
      Contents:WorkPlanDetail,
      maskClosable:true,
      isShow:true,
      modalOpts: {
        style:{ top: 20 ,height:'600px'},
        width: 1200,
      },
      isFooter:true,
    }
    this.context.openModal(modalFormProps);
  };

  render() {
    const {
      workTask :{list},
      loading,
    } = this.props;
    let { columns,visible,record,rows,form,title,isFooter} = this.state;
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

    return(
      <Layout className={styles.application}>
        <div style={{ background: 'white'}}>
          <AdvancedSearchForm/>
          <ButtonAuthorize icon="plus" type="primary" onClick={this.onAdd} name="新增" authority="role:add"/>
         {/* <ButtonAuthorize icon="edit" disabled={!rows.length} onClick={this.edit} name="修改" authority="role:update"/>*/}
          <ButtonAuthorize icon="delete" disabled={!rows.length} onClick={this.batchDelete} name="批量删除" authority="role:delete"/>
        </div>
        <Content>
          <Table  rowKey='id' style={{  background: '#fff', minHeight: 360}}  columns={columns} dataSource={list}  onChange={this.handleChange} rowSelection={rowSelection}
                  loading={loading}
                  pagination={{
                    showSizeChanger:true,
                    showQuickJumper:true,
                    total:{list}.length,
                    onChange:this.onChange
                  }}
                  onRowDoubleClick={this.handlerDoubleClick}
          />
        </Content>
        <ModalForm {...modalFormProps}/>
      </Layout>
    )

  }
}