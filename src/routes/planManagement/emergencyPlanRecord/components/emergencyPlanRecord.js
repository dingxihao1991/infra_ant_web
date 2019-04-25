import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import styles from '../syle/assetRecord.less';
import { Table, Button, Layout, Tabs, Upload, Icon, message,Tooltip } from "antd";
import {ModalForm,showConfirm}  from 'components/Modal';
import FormSub from '../assetRecordDetails.js';//资产设备单个定位页面
import Authorized from "../../../../utils/Authorized";
import 'echarts/lib/chart/line';
import moment from 'moment';

import { connect } from 'dva';
//折线说明

const { Content,} = Layout;
const TabPane = Tabs.TabPane;
const { ButtonAuthorize } = Authorized;

const columns = [
    {
    title: '预案编号',
    dataIndex: 'id',
    width:230,
}, {
    title: '预案名称',
    dataIndex: 'templateName',
    width:200,
},{
    title: '预案描述',
    dataIndex: 'tdescription',
    width:350,
    render: (text, record) => {
        return (
            <Tooltip placement="topLeft" title={text}>
              <div style={{width:'300px'}} className="table-slop">{text}</div>
            </Tooltip>
        )
    }
},{
    title: '预案类型',
    dataIndex: 'mold',
    width:200,
}, {
      title: '是否备案',
      dataIndex: 'putOnRecords',
      width:200,
}, {
      title: '预案等级',
      dataIndex: 'grade',
      width:200,
}, {
    title: '演练次数',
    dataIndex: 'daycount',
    width:200,
},{
    title: '更新日期',
    dataIndex: 'sysdate',
      render:(text, record) => {
          return (
              <span>{moment(text).format('YYYY-MM-DD HH:mm:ss')}</span>
          )
      }
}];

//维保数据
@connect(({loading, emergencyPlanRecord}) => ({
  emergencyPlanRecord
}))
export default class emergencyPlanRecord extends PureComponent {

    static contextTypes = {
        openModal: PropTypes.func,
    };

    state = {
      dataSource:[],
      record: null,
      rows: [],
      form: FormSub,
      current:1,
      pageSize:10,
    };


    openModal =(record)=>{
        const modalFormProps = {
            record:record,
            isShow:true,
            Contents:FormSub,
            modalOpts: {
                width: 800,
            },
            onSubmit: (values) => this.onSubmit(values)
        }
        this.context.openModal(modalFormProps);
    }

    onSubmit =(values)=>{

    }

    componentDidMount(){
        const {dispatch } = this.props;
        dispatch({
          type: 'emergencyPlanRecord/fetch',
          payload: {
          },
        });
    }

    //编辑
    edit =()=>{

        const {record} = this.state;
        this.openModal(record);

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


      const {pageSize,current} = this.state;

    const dataTableProps ={
      total: list?list.length:null,
      pageSize: pageSize,
      current:current,
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: total => `共 ${list.length} 条`,
    }


    const rowSelection = {
      onChange: this.onSelectChange,
    };


    return(

          <Layout className={styles.application}>
            <div>
              <ButtonAuthorize icon="plus" type="primary" onClick={this.edit}  name="新增" authority="organization:add"/>
              <ButtonAuthorize icon="edit"  name="修改" onClick={this.edit} authority="organization:update" />
              <ButtonAuthorize icon="delete"  name="删除" onClick={this.delete} authority="organization:delete"/>

            </div>

            <Content  className='ant_table_ui'>
              <Table rowKey='id' style={{  background: '#ffffff', minHeight: 360}} columns={columns} dataSource={list} onChange={this.handleChange} rowSelection={rowSelection}
                     loading={loading}
                     pagination={dataTableProps}
                     scroll={{y: '73vh'  }}
              />
            </Content>

          </Layout>
    )

  }
}