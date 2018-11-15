import React, {PureComponent} from 'react';
import styles from './assetRecord.less';
import { Table, Button, Layout, Tabs } from "antd";
import {ModalForm,showConfirm}  from 'components/Modal';
import FormSub from './assetRecordDetails.js';//资产设备单个定位页面
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
//引入折线图
import 'echarts/lib/chart/line';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import { Map ,Markers} from 'react-amap';//引入高德地图

/**
 * 资产维保记录页面
 *
 */

const { Content,} = Layout;
const TabPane = Tabs.TabPane;

//维保数据
const data = [{
  1: 'WB-BG-0000001',
  2: 'NV-TB9716',
  3: '安科瑞智慧用电在线监控装置',
  4: '电力系统',
  5: '管廊系统',
  6: '日常检修',
  7: '李明',
  8: '2018-10-12',
  9: '合肥市高新区鸡鸣山路管廊段',
  10:'/',
}, {
  1: 'WB-BG-0000001',
  2: 'NV-TB9716',
  3: '安科瑞智慧用电在线监控装置',
  4: '电力系统',
  5: '管廊系统',
  6: '日常检修',
  7: '李明',
  8: '2018-10-12',
  9: '合肥市高新区鸡鸣山路管廊段',
  10:'/',
}, {
  1: 'WB-BG-0000001',
  2: 'NV-TB9716',
  3: '安科瑞智慧用电在线监控装置',
  4: '电力系统',
  5: '管廊系统',
  6: '日常检修',
  7: '李明',
  8: '2018-10-12',
  9: '合肥市高新区鸡鸣山路管廊段',
  10:'/',
}, {
  1: 'WB-BG-0000001',
  2: 'NV-TB9716',
  3: '安科瑞智慧用电在线监控装置',
  4: '电力系统',
  5: '管廊系统',
  6: '日常检修',
  7: '李明',
  8: '2018-10-12',
  9: '合肥市高新区鸡鸣山路管廊段',
  10:'/',
}, {
  1: 'WB-BG-0000001',
  2: 'NV-TB9716',
  3: '安科瑞智慧用电在线监控装置',
  4: '电力系统',
  5: '管廊系统',
  6: '日常检修',
  7: '李明',
  8: '2018-10-12',
  9: '合肥市高新区鸡鸣山路管廊段',
  10:'/',
}, {
  1: 'WB-BG-0000001',
  2: 'NV-TB9716',
  3: '安科瑞智慧用电在线监控装置',
  4: '电力系统',
  5: '管廊系统',
  6: '日常检修',
  7: '李明',
  8: '2018-10-12',
  9: '合肥市高新区鸡鸣山路管廊段',
  10:'/',
}
];

const randomMarker = (len) => (//随机makers数据
  Array(len).fill(true).map(() => ({
    position: {
      longitude: 100 + Math.random() * 30,
      latitude: 30 + Math.random() * 20,
    },
  }))
);

export default class userManage extends PureComponent {


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
    this.markers = randomMarker(1000);
    this.center = {longitude: 115, latitude: 40};
    this.state = {
      useCluster: true,
    }
  }

  componentDidMount(){
    //加载折线图
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('main'));
    myChart.setOption({
      title: {
        text: '2018年—资产设备类型月度维保统计图',
        left: 'center',
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data:['供电系统','照明系统','排水系统','其它','通风系统']
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name:'供电系统',
          type:'line',
          stack: '总量',
          data:[3, 5, 1, 4, 2, 1, 6, 7, 8, 3, 4, 2]
        },
        {
          name:'排水系统',
          type:'line',
          stack: '总量',
          data:[2, 3, 4, 3, 1, 6, 7, 9, 5, 2, 3, 2]
        },
        {
          name:'通风系统',
          type:'line',
          stack: '总量',
          data:[5, 7, 3, 7, 5, 3, 2, 1, 3, 4, 2, 3]
        },
        {
          name:'其它',
          type:'line',
          stack: '总量',
          data:[7, 8, 1, 8, 5, 7, 5, 6, 4, 8, 5, 4]
        },
        {
          name:'照明系统',
          type:'line',
          stack: '总量',
          data:[1, 0, 1, 0, 1, 2, 1, 4, 3, 2, 0, 2]
        }
      ]

    });
    this.initColums();
    this.init();
  }

  initColums =() =>{
    const columns = [{
      title: '维保单号',
      dataIndex: '1',
      id: '1',
      align: 'center',
      key:'1'
    }, {
      title: '资产设备编号',
      dataIndex: '2',
      id: '2',
      align: 'center',
      key:'2'
    },{
      title: '资产设备名称',
      dataIndex: '3',
      id: '3',
      align: 'center',
      key:'3'
    },{
      title: '资产设备类型',
      dataIndex: '4',
      id: '4',
      align: 'center',
      key:'4'
    }, {
      title: '资设所属系统',
      dataIndex: '5',
      id: '5',
      align: 'center',
      key:'5'
    },{
      title: '维保类型',
      dataIndex: '6',
      id: '6',
      align: 'center',
    },
      {
        title: '维保人员',
        dataIndex: '7',
        id: '7',
        align: 'center',
      }, {
        title: '维保时间',
        dataIndex: '8',
        id: '8',
        align: 'center',
      }, {
        title: '维保地点',
        dataIndex: '9',
        id: '9',
        align: 'center',
      }, {
        title: '维保说明',
        dataIndex: '10',
        id: '10',
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

  //选中项发生变化时的回调
  onSelectChange = (selectedRowKeys,selectedRows) => {
    this.setState({rows:selectedRows,record:selectedRows[0]});
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

    return(
      <Tabs defaultActiveKey="1">
        <TabPane tab="图表模式" key="1" styles>
          <div id="main"  className="col-md-12" style={{ width: 1200, height: 350 }}/>
          <div style={{ height: 50,textAlign: 'center',marginTop:10}}><span style={{fontSize:20,fontWeight:800}}> 2018年—资产设备维保分布图</span></div>
            <div className="col-md-12" style={{width: 1200, height: 350}}>
              <Map plugins={['ToolBar']} center={this.center} zoom={5}>
                <Markers
                  markers={this.markers}
                  useCluster={this.state.useCluster}
                />
              </Map>
            </div>
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
    )

  }
}