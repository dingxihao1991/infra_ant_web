import React, {PureComponent} from 'react';
import { Button, Layout, Tabs} from "antd";
import {ModalForm,showConfirm}  from 'components/Modal';
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
// 引入提示框和标题组件
import { Map ,Markers} from 'react-amap';//引入高德地图
//引入仪表盘组件，缺一不可
import  'echarts/lib/chart/gauge/GaugeSeries';
import  'echarts/lib/chart/gauge/GaugeView';

/**
 * 监控列表页面
 *
 */

//地图markers随机数据
const randomMarker = (len) => (//随机makers数据
  Array(len).fill(true).map(() => ({
    position: {
      longitude: 100 + Math.random() * 30,
      latitude: 30 + Math.random() * 20,
    },
  }))
);

//仪表盘所需数据
const option = {
  tooltip : {
    formatter: "{a} <br/>{b} : {c}%"
  },
  toolbox: {
    feature: {
      restore: {},
      saveAsImage: {}
    }
  },
  series: [
    {
      name: '业务指标',
      type: 'gauge',
      detail: {formatter:'0.1%'},
      data: [{value: 50, name: '二氧化碳浓度'}]
    }
  ]
};


export default class monitoringList extends PureComponent {


  state = {
    columns:[],
    dataSource:[],
    record: null,
    visible: false,
    rows: [],
   // form: FormSub,
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
    var myChart = echarts.init(document.getElementById('main1'));
    option.series[0].data[0].value = 20;//仪表指针
    option.series[0].detail.formatter = "80%";//仪表百分比显示
    option.series[0].data[0].name = "二氧化碳浓度";//仪表文字显示
    myChart.setOption(option,true);

    var myChart2 = echarts.init(document.getElementById('main2'));
    option.series[0].data[0].value = 5;//仪表指针
    option.series[0].detail.formatter = "5%";//仪表百分比显示
    option.series[0].data[0].name = "舱内湿度";//仪表文字显示
    myChart2.setOption(option,true);

    var myChart3 = echarts.init(document.getElementById('main3'));
    option.series[0].data[0].value = 0.1;//仪表指针
    option.series[0].detail.formatter = "0.1%";//仪表百分比显示
    option.series[0].data[0].name = "甲烷浓度";//仪表文字显示
    myChart3.setOption(option,true);


  }

  render() {

    return(

    <div className="row">

      <div align="center" style={{ height: 50,textAlign: 'center',marginTop:10}}><span style={{fontSize:20,fontWeight:800}}>各项子系统监控设备分布图</span></div>
      <div className="col-md-12" style={{width: "100%", height: 350}}>
        <Map plugins={['ToolBar']} center={this.center} zoom={5}>
          <Markers
            markers={this.markers}
            useCluster={this.state.useCluster}
          />
        </Map>
      </div>

      <div id="main1"  className="col-md-4" style={{ width: "100%", height: 350 }}/>
      <div id="main2"  className="col-md-4" style={{ width: "100%", height: 350 }}/>
      <div id="main3"  className="col-md-4" style={{ width: "100%", height: 350 }}/>

    </div>

        )

  }
}