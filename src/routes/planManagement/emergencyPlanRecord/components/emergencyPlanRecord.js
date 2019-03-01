import React, {PureComponent} from 'react';
import styles from '../assetRecord.less';
import { Table, Button, Layout, Tabs, Upload, Icon, message } from "antd";
import {ModalForm,showConfirm}  from 'components/Modal';
import FormSub from '../assetRecordDetails.js';//资产设备单个定位页面
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
//引入折线图
import 'echarts/lib/chart/line';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import { Map ,Markers} from 'react-amap';//引入高德地图
import 'echarts/lib/component/legend';
import Authorized from "../../../../utils/Authorized";
import { connect } from 'dva';
//折线说明

const { Content,} = Layout;
const TabPane = Tabs.TabPane;
const { ButtonAuthorize } = Authorized;

//维保数据
@connect(({loading, emergencyPlanRecord}) => ({
  emergencyPlanRecord
}))
export default class emergencyPlanRecord extends PureComponent {

  state = {
    columns:[],
    dataSource:[],
    record: null,
    visible: false,
    rows: [],
    form: FormSub,
    title:"资产设备定位"
  };

  //props :接收任意的输入值
  constructor(props,context) {
    //传递props到基础构造函数中
    super(props,context);
    this.center = {longitude: 115, latitude: 40};
    this.state = {
      useCluster: true,
    }
  }

  componentDidMount(){
    const {dispatch } = this.props;
    dispatch({
      type: 'emergencyPlanRecord/fetch',
      payload: {
      },
    });
    this.initColums();
    this.init();
  }

  initColums =() =>{
    const columns = [{
      title: '预案序号',
      dataIndex: '1',
      id: 'q',
      align: 'center',
      key:'1'
    }, {
      title: '预案名称',
      dataIndex: '2',
      id: 'b',
      align: 'center',
      key:'2'
    },{
      title: '预案属性',
      dataIndex: '3',
      id: 'c',
      align: 'center',
      key:'3'
    },{
      title: '预案类型',
      dataIndex: '4',
      id: 'd',
      align: 'center',
      key:'4'
    }, {
      title: '预案编号',
      dataIndex: '5',
      id: 'e',
      align: 'center',
      key:'5'
    },{
      title: '所属部门',
      dataIndex: '6',
      id: 'f',
      align: 'center',
    },
      {
        title: '是否备案',
        dataIndex: '7',
        id: 'g',
        align: 'center',
      }, {
        title: '演练次数',
        dataIndex: '8',
        id: 'h',
        align: 'center',
      },{
        title: '最近演练日期',
        dataIndex: '9',
        id: 'i',
        align: 'center',
      },
      {//增加操作栏
        title: '操作',
        id: 'j',
        align: 'center',
        render: () => (
          <Button style={{ marginRight: 5 }} icon="form" onClick={this.edit}>详情</Button>
        ),
      }];
    this.setState({columns:columns})
  }

  init= () =>{

  }

  //编辑
  edit =()=>{
    console.log(this.state);
    let  form = FormSub
    this.setState({
      visible: true,
      form:form
    });
  }

  //编辑
  delete =()=>{
    message.error("已删除~");
  }

  //选中项发生变化时的回调
  onSelectChange = (selectedRowKeys,selectedRows) => {
    this.setState({rows:selectedRows,record:selectedRows[0]});
  }

  render() {
    const {
      emergencyPlanRecord :{list},
      loading,
    } = this.props;

    //增加form变量
    let { columns, visible,record,dataSource,form,title} = this.state;


    const rowSelection = {
      onChange: this.onSelectChange,
    };
    const modalFormProps = {
      title:title,
      loading: true,
      record,
      visible,
      Contents:form,
      modalOpts: {
        width: 800,
      },
      onCancel: () => {
        this.setState({
          record: null,
          visible: false
        })
      },
      onSubmit: () => {
        this.setState({
          record: null,
          visible: false
        })
      },
    }

    return(

          <Layout className={styles.application}>
            <div>
              <ButtonAuthorize icon="plus" type="primary" onClick={this.edit}  name="新增" authority="organization:add"/>
              <ButtonAuthorize icon="edit" name="修改" onClick={this.edit} authority="organization:update"/>
              <ButtonAuthorize icon="delete"  name="删除" onClick={this.delete} authority="organization:delete"/>

            </div>

            <Content  >
              <Table rowKey='id' style={{  background: '#ffffff', minHeight: 360}} columns={columns} dataSource={list} onChange={this.handleChange} rowSelection={rowSelection}
                     loading={loading}
                     pagination={{
                       showSizeChanger:true,
                       showQuickJumper:true,
                       total:dataSource?dataSource.length:null,
                       onChange:this.onChange
                     }}
              />
            </Content>
            <ModalForm {...modalFormProps}/>

          </Layout>
    )

  }
}