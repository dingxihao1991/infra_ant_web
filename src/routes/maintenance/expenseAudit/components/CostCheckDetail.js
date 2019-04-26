import React, { Component } from 'react';
import {
  Form,
  Tabs,
  Card,
  Icon,
  List,
  message,
  Avatar,
  Row,
  Col,
  Divider,
  Steps,
  Popover,
  Timeline,
  Table
} from "antd";

export default class CostCheckDetail extends Component {

  state = {
    checkNick: false,
    value: undefined,
    initLoading: true,
    loading: false,
    record:null,
    result:null,
    columns:[],
    list:null
  };


  componentDidMount() {
    this.init();
    this.setState({
      initLoading: false,
    });
  }


  constructor(props){
    super(props);
  }

  onChange = (value) => {
    console.log(value);
    this.setState({ value });
  }

  init=()=>{
    const columns = [
      {
        title: '收费项',
        dataIndex: 'a',
        id: 'a',
        align: 'center',
        key:'a'
      }, {
        title: '收费标准',
        dataIndex: 'b',
        id: 'b',
        align: 'center',
        key:'b'
      }, {
        title: '单位',
        dataIndex: 'c',
        id: 'c',
        align: 'center',
        key:'c'
      }, {
        title: '数量',
        dataIndex: 'd',
        id: 'd',
        align: 'center',
        key:'d'
      }, {
        title: '实际费用',
        dataIndex: 'e',
        id: 'e',
        align: 'center',
        key:'e'
      }
    ];
    this.setState({columns:columns})
    const list = [{
      "id":1,
      "a":'直埋成本',
      "b":221,
      "c":"元/米",
      "d":1,
      "e":234
    },
      {
        "id":2,
        "a":'单位定价',
        "b":221,
        "c":"元/米",
        "d":1,
        "e":234
      }]
    this.setState({list:list})
  }
  render(){
    let { columns,list,loading} = this.state;
    return (
      <Table  rowKey='id' style={{  background: '#fff', minHeight: 360}}  columns={columns} dataSource={list}
              loading={loading}
              pagination={{
                showSizeChanger:true,
                showQuickJumper:true,
                total:{list}.length,
              }}
      />
    )

  }

}


