import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import styles from '../../maintenance.less';
import { Table ,Button ,Layout,Pagination,Form,Input,message,Dropdown,Menu,Icon,Row,Col} from 'antd';
import {ModalForm,showConfirm}  from 'components/Modal';
import { connect } from 'dva';
import Authorized from '../../../../utils/Authorized';
import AdvancedSearchForm from './SearchForm';
import CostCheckDetail from './CostCheckDetail';
import FormSub from './Form';
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

@connect(({loading, costCheck}) => ({
  costCheck
}))
export default class CostCheck extends PureComponent {

  static contextTypes = {
    openModal: PropTypes.func,
  };

  state = {
    title:'新增费用项',
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
      type: 'costCheck/fetch',
      payload: {
      },
    });
  }

  initColums = ()=>{
    const columns = [
      {
        title: '是否交费',
        dataIndex: 'a',
        id: 'a',
        align: 'center',
        key:'a',
        render:function(text, record, index) {
          return(
              <span style={{color:"red"}}>否</span>
          )
        }
      },
      {
        title: '管线类型',
        dataIndex: 'b',
        id: 'b',
        align: 'center',
        key:'b'
      }, {
        title: '权属单位',
        dataIndex: 'c',
        id: 'c',
        align: 'center',
        key:'c'
      }, {
        title: '附属设施投资费 ',
        dataIndex: 'd',
        id: 'd',
        align: 'center',
        key:'d'
      }, {
        title: '所占管廊空间比',
        dataIndex: 'e',
        id: 'e',
        align: 'center',
        key:'e'
      }, {
        title: '单独敷设成本',
        dataIndex: 'f',
        id: 'f',
        align: 'center',
        key:'f'
      }, {
        title: '直埋深度成本',
        dataIndex: 'g',
        id: 'g',
        align: 'center',
        key:'g'
      }, {
        title: '总计',
        dataIndex: 'h',
        id: 'h',
        align: 'center',
        key:'h'
      }, {
        title: '预审总计',
        dataIndex: 'i',
        id: 'i',
        align: 'center',
        key:'i'
      },{ //增加操作栏
        title: '操作',
        dataIndex: 'j',
        id: 'j',
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

  }

  //编辑
  edit =(record)=>{
    console.log(record)
    this.setState({
      title:'修改费用项',
      record:record,
      visible: true,
      form:FormSub,
      isFooter:false
    });
  }

  //新增事件
  onAdd = () => {
    this.setState({
      title:'新增费用项',
      visible: true,
      form:FormSub,
      record:null,
      isFooter:false
    });
  };

  delete =(record)=> {
    console.log(record)
    alert(record.id);

  }

  batchDelete=() => {
    const {rows , record} = this.state
    console.log(rows)
    console.log(record)
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
  }

  handlerCostCheck = (record, index, event) => {
    this.setState({
      title:'费用核算',
      visible: true,
      form:CostCheckDetail,
      record:null,
      isFooter:true
    });
  };

  render() {
    const {
      costCheck :{list},
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
          <ButtonAuthorize icon="plus" type="primary" onClick={this.onAdd} name="新增费用项" authority="role:add"/>
          {/* <ButtonAuthorize icon="edit" disabled={!rows.length} onClick={this.edit} name="修改" authority="role:update"/>*/}
          <ButtonAuthorize icon="delete" disabled={!rows.length} onClick={this.batchDelete} name="批量删除" authority="role:delete"/>
          <ButtonAuthorize icon="" disabled={!rows.length} onClick={this.handlerCostCheck} name="费用核算" authority="role:add"/>
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
          />
        </Content>
        <ModalForm {...modalFormProps}/>
      </Layout>
    )

  }
}