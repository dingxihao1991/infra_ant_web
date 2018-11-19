import React, { PureComponent } from "react";

// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
// 引入柱状图
import  'echarts/lib/chart/bar';
// 引入柱状图
import  'echarts/lib/chart/line';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import { Button, Layout, Table, Tabs } from "antd";
import styles from "./bomManagementDetails.less";
import {ModalForm,showConfirm}  from 'components/Modal';
import FormSub from "./bomManageDetails";
import 'echarts/lib/component/legend';//折线说明

const timeList = ["15:01", "15:02", "15:03", "15:04", "15:05", "15:06", "15:07"];
const inData = [100,150,199,300,50,89,60]
const outData = [300,200,400,70,90,160,230]
const d1 = [100,150,199,300,50,89,60]
const d2 = [300,200,400,70,90,160,230]

const TabPane = Tabs.TabPane;

const { Content,} = Layout;

const option = {
  title: {
    text: '各系统备品备件实时数量图',
    subtext: '实时刷新(5秒/次)',
    left: 'left',
  },
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    // data:
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: timeList
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      name: '通风系统',
      type: 'line',
      stack: '总量',
      data: inData
    },
    {
      name: '排水系统',
      type: 'line',
      stack: '总量',
      data: outData
    },

    {
      name: '供电系统',
      type: 'line',
      stack: '总量',
      data: d1
    },

    {
      name: '其他系统',
      type: 'line',
      stack: '总量',
      data: d2
    }
  ]
};

//备品备件数据
const data = [{
  1: 'BJ-TD-0000001',
  2: '探头',
  3: '其他系统',
  4: '15',
  5: '2018-11-19 15:03',
  6: '/',
}, {
  1: 'BJ-TD-0000002',
  2: '调高垫板',
  3: '其他系统',
  4: '200',
  5: '2018-11-20 16:23',
  6: '/',
}, {
  1: 'BJ-TD-0000003',
  2: '通风管',
  3: '通风系统',
  4: '10',
  5: '2018-11-20 16:23',
  6: '/',
}, {
  1: 'BJ-TD-0000004',
  2: '排水管',
  3: '排水系统',
  4: '5',
  5: '2018-11-20 16:23',
  6: '/',
}, {
  1: 'BJ-TD-0000005',
  2: '小型发电机',
  3: '供电系统',
  4: '2',
  5: '2018-11-20 16:23',
  6: '/',
}, {
  1: 'BJ-TD-0000005',
  2: 'LED显示屏',
  3: '其他系统',
  4: '1',
  5: '2018-11-20 16:23',
  6: '/',
}
];


export default class EchartsTest extends PureComponent {

  state = {
    columns:[],
    dataSource:[],
    record: null,
    visible: false,
    rows: [],
    form: FormSub,
    title:"备品备件详情"
  };

  componentDidMount() {

    var myChart = echarts.init(document.getElementById('main'));
      myChart.setOption(option);


    // 模拟 ajax 请求
    setInterval(() => {

      var nowDate = new Date()
      timeList.push(nowDate.getHours() + ':' + nowDate.getMinutes() + ':' + nowDate.getSeconds())
      inData.push( Math.ceil(Math.random() * 600) + 100)
      outData.push( Math.ceil(Math.random() * 400) + 200)
      d1.push( Math.ceil(Math.random() * 400) + 200)
      d2.push( Math.ceil(Math.random() * 400) + 200)

      timeList.shift()
      inData.shift()
      outData.shift()
      d1.shift()
      d2.shift()


      console.log(timeList);
      console.log(inData);
      console.log(outData);

      myChart.setOption(option);

    }, 5000);

    this.initColums();
    this.init();

  }


  initColums =() =>{
    const columns = [{
      title: '备件编号',
      dataIndex: '1',
      id: '1',
      align: 'center',
      key:'1'
    }, {
      title: '备件名称',
      dataIndex: '2',
      id: '2',
      align: 'center',
      key:'2'
    },{
      title: '备件所属系统',
      dataIndex: '3',
      id: '3',
      align: 'center',
      key:'3'
    },{
      title: '备件数量',
      dataIndex: '4',
      id: '4',
      align: 'center',
      key:'4'
    }, {
      title: '最近更新时间',
      dataIndex: '5',
      id: '5',
      align: 'center',
      key:'5'
    },{
      title: '备注',
      dataIndex: '6',
      id: '6',
      align: 'center',
    },
      {//增加操作栏
        title: '操作',
        dataIndex: '9',
        id: '9',
        align: 'center',
        render: () => (
          <Button style={{ marginRight: 5 }} icon="form" onClick={this.edit}>详情</Button>
        ),
      }];
    this.setState({columns:columns})
  }

  init= () =>{
    const thiz = this;

    thiz.setState({dataSource:data})

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


  render() {

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

    return (
      <Tabs defaultActiveKey="1">
        <TabPane tab="图表模式" key="1" styles>
          <div  id="main"    style={{ width: 1200, height: 700 }}></div>
        </TabPane>
        <TabPane tab="表格模式" key="2" >
          <Layout className={styles.application}>
            <Content  >
              <Table rowKey='id' style={{  background: '#ffffff', minHeight: 360}} columns={columns} dataSource={dataSource} onChange={this.handleChange} rowSelection={rowSelection}
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
        </TabPane>
      </Tabs>


    );

  }

}
