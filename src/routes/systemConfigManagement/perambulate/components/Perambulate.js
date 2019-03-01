import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import styles from '../style/sysConfigManegement.less';
import { Table ,Button ,Layout,Pagination,Form,Input,message,Dropdown,Menu,Icon,Row,Col} from 'antd';
import {ModalForm,showConfirm}  from 'components/Modal';
import { POST,GET,PUT,DELETE } from '../../../../services/api';
import Authorized from '../../../../utils/Authorized';
import FormSub from './Form';
import PerambulateDetail from "./PerambulateDetail";
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

@connect(({loading, perambulate}) => ({
  tags:perambulate.tags,
  list:perambulate.list,
  assetData:perambulate.assetData,
}))
export default class perambulate extends PureComponent {

  static contextTypes = {
    openModal: PropTypes.func,
  };

  state = {
    title:null,
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
      type: 'perambulate/fetch',
      payload: {
      },
    });
    dispatch({
      type: 'perambulate/assetData',
      payload: {
      },
    });
  }

  initColums = ()=>{
    const columns = [
      {
        title: '模板名称',
        dataIndex: 'template_name',
        id: 'template_name',
        align: 'center',
        key:'template_name'
      },
      {
        title: '模板描述',
        dataIndex: 'template_description',
        id: 'template_description',
        align: 'center',
        key:'template_description'
      },
      {
        title: '计划类型',
        dataIndex: 'template_type',
        id: 'template_type',
        align: 'center',
        key:'template_type'
      },
      /*{
        title: '任务名称',
        dataIndex: 'work_name',
        id: 'work_name',
        align: 'center',
        key:'work_name'
      }, {
        title: '任务描述',
        dataIndex: 'work_description',
        id: 'work_description',
        align: 'center',
        key:'work_description'
      } ,*/{ //增加操作栏
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
      title:'新增巡视模板',
      record:record,
      visible: true,
      form:FormSub,
      isFooter:false
    });
  }

  //新增事件
  onAdd = () => {
    const {assetData} = this.props;
    let parms = {};
    parms.assetData = assetData;
    const modalFormProps = {
      record : parms,
      title : "新增巡视模板",
      Contents : FormSub,
      maskClosable : true,
      isShow : true,
      isFooter : false,
      onSubmit: (values) => this.onSubmit(values)
    }
    this.context.openModal(modalFormProps);
  };

  delete =(record)=> {
    console.log(record)
    //alert(record.id);
  }

  batchDelete=() => {
    const {rows , record} = this.state
    console.log(rows)
    console.log(record)
    //alert(record.id);
  }

  //选中项发生变化时的回调
  onSelectChange = (selectedRowKeys,selectedRows) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({rows:selectedRows,record:selectedRows[0]});
  }

  onSubmit= (values ) =>{
    console.log("submit:" + JSON.stringify(values))
    const {dispatch } = this.props;
    dispatch({
      type: 'perambulate/add',
      payload: {
          tags:{
            data:values
          }
      },
    });
  }

  closeModal = () =>{
    this.setState({
      visible: false
    });
  }

  handlerDoubleClick = (record, index, event) => {
    console.log(">>>>>>>>>>>++++",record)
    record = [{
      "id":"1",
      "work_name":"A-001",
      "work_description":"UPS蓄电检查",
    },{
      "id":"2",
      "work_name":"B-002",
      "work_description":"廊内水泵养护",
    }];
    const modalFormProps = {
      title:"详细信息",
      record,
      Contents:PerambulateDetail,
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
      onCancel: () => this.closeModal(),
    }
    this.context.openModal(modalFormProps);
  }


  render() {
    const {list, loading, tags, assetData} = this.props;
    let { columns,rows} = this.state;
    console.log("assetData------->",assetData);
    console.log("list------->",list);
    const rowSelection = {
      onChange: this.onSelectChange,
    };

    return(
      <Layout className={styles.application}>
        <div style={{ background: 'white' , float:'right'}} id="jobPlanId">
          <AdvancedSearchForm/>
          <div style={{float: 'left'}}>
            <ButtonAuthorize icon="plus" type="primary" onClick={this.onAdd} name="新增" authority="role:add"/>
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