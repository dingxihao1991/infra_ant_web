import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import styles from '../../maintenance.less';
import { Table ,Button ,Layout,Pagination,Dropdown,Menu,Icon} from 'antd';
import {ModalForm,showConfirm}  from 'components/Modal';
import { connect } from 'dva';
import Authorized from '../../../../utils/Authorized';
import AdvancedSearchForm from './SearchForm';
import FormSub from './Form';
const { ButtonAuthorize } = Authorized;
const { Content } = Layout;

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

@connect(({loading, diseaseDisposal}) => ({
  diseaseDisposal
}))
export default class DiseaseDisposal extends PureComponent {

  static contextTypes = {
    openModal: PropTypes.func,
  };

  state = {
    title:'新增工程',
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
      type: 'diseaseDisposal/fetch',
      payload: {
      },
    });
  }

  initColums = ()=>{
    const columns = [
      {
        title: '隧道名称',
        dataIndex: 'pro_name',
        id: 'pro_name',
        align: 'center',
        key:'pro_name'
      },
      {
        title: '负责人',
        dataIndex: 'pro_date',
        id: 'pro_date',
        align: 'center',
        key:'pro_date'
      },{
        title: '是否沉降',
        dataIndex: 'pro_h',
        id: 'pro_h',
        align: 'center',
        key:'pro_h'
      },{
        title: '是否渗漏',
        dataIndex: 'pro_user',
        id: 'pro_user',
        align: 'center',
        key:'pro_user'
      } ,{
        title: '是否环片收敛',
        dataIndex: 'pro_g',
        id: 'pro_g',
        align: 'center',
        key:'pro_g'
      },{
        title: '备注',
        dataIndex: 'pro_result',
        id: 'pro_result',
        align: 'center',
        key:'pro_result'
      },
      { //增加操作栏
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

  }

  //编辑
  edit =(record)=>{
    console.log(record)
    this.setState({
      title:'修改',
      record:record,
      visible: true,
      form:FormSub,
      isFooter:false
    });
  }

  //新增事件
  onAdd = () => {
    this.setState({
      title:'新增',
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
      diseaseDisposal :{list},
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