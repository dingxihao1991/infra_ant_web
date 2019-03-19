import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import styles from '../../statistics.less';
import { Table ,Button ,Layout,Pagination,Form,Input,message,Dropdown,Menu,Icon,Row,Col} from 'antd';
import {ModalForm,showConfirm}  from 'components/Modal';
import { POST,GET,PUT,DELETE } from '../../../../services/api';
import Authorized from '../../../../utils/Authorized';
import FormSub from './Form';
import WorkPlanDetail from "./WorkPlanDetail";
import AdvancedSearchForm from './SearchForm';
import { connect } from 'dva';
const { ButtonAuthorize } = Authorized;
const FormItem = Form.Item;
const { Content, Header, Footer } = Layout;
const Modal = ModalForm.Modal;
const confirm = Modal.confirm;
const Search = Input.Search;

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

@connect(({loading, conserveManager}) => ({
  conserveManager
}))
export default class ConserveManager extends PureComponent {

  static contextTypes = {
    openModal: PropTypes.func,
  };

  state = {
    title:'新增任务',
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
    const {dispatch } = this.props;
    this.initColums();
    this.init();
    dispatch({
      type: 'conserveManager/fetch',
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
      },{
        title: '任务详细',
        dataIndex: 'work_detailed',
        id: 'work_detailed',
        align: 'center',
        key:'work_detailed'
      },{
        title: '计划类型',
        dataIndex: 'plan_type',
        id: 'plan_type',
        align: 'center',
        key:'plan_type'
      },{
        title: '任务类型',
        dataIndex: 'work_type',
        id: 'work_type',
        align: 'center',
        key:'work_type'
      }, {
        title: '任务执行人',
        dataIndex: 'worker',
        id: 'worker',
        align: 'worker',
        key:'worker'
      },
      {
        title: '预计开始时间',
        dataIndex: 'start_date',
        id: 'start_date',
        align: 'center',
        key:'start_date'
      }, {
        title: '预计结束时间',
        dataIndex: 'end_date',
        id: 'end_date',
        align: 'center',
        key:'end_date'
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
  }

  //编辑
  edit =(record)=>{
    console.log(record)
    this.setState({
      title:'编辑任务',
      record:record,
      visible: true,
      form:FormSub,
      isFooter:false
    });
  }

  //新增事件
  onAdd = () => {
      const modalFormProps = {
          title:"新增任务",
          Contents:FormSub,
          maskClosable:true,
          isShow:true,
          isFooter:false,
          onSubmit: (values) => this.onSubmit(values)
      }
      this.context.openModal(modalFormProps);

  };

  delete =(record)=> {
    console.log(record)
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

  onSubmit= (values ) =>{
    let i = 500
    console.log("submit:" + JSON.stringify(values))
  }

  handlerDoubleClick = (record, index, event) => {
      const modalFormProps = {
          title:"详细信息",
          record,
          Contents:WorkPlanDetail,
          maskClosable:true,
          isShow:true,
          modalOpts: {
              width: 1200,
              height:700
          },
          isFooter:true,
          full:true,
      }
      this.context.openModal(modalFormProps);

  };

    openModal =(record)=>{
        const modalFormProps = {
            title:"详细信息",
            loading: true,
            record,
            visible,
            Contents:WorkPlanDetail,
            maskClosable:true,
            modalOpts: {
                style:{ top: 20 ,height:'600px'},
                width: 1200,
            },
            isFooter:true,
            onCancel: () => this.props.closeModal(),
        }
        this.context.openModal(modalFormProps);
    }


    render() {
      const {
        conserveManager :{list},
        loading,
      } = this.props;
      let { columns,rows} = this.state;

      const rowSelection = {
        onChange: this.onSelectChange,
      };

    return(
      <Layout className={styles.application}>
        <div style={{ background: 'white' , float:'right'}} id="jobPlanId">
          <AdvancedSearchForm/>
          <div style={{float: 'left'}}>
            <ButtonAuthorize icon="plus" type="primary" onClick={this.onAdd} name="新增任务" authority="role:add"/>
            {/* <ButtonAuthorize icon="edit" disabled={!rows.length} onClick={this.edit} name="修改" authority="role:update"/>*/}
            <ButtonAuthorize icon="delete" disabled={!rows.length} onClick={this.batchDelete} name="批量删除" authority="role:delete"/>
          </div>
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
      </Layout>
    )

  }
}