import React, { Component, PureComponent } from "react";

// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
// 引入柱状图
import  'echarts/lib/chart/bar';
// 引入柱状图
import  'echarts/lib/chart/line';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';

var timeList = ['15:01','15:02','15:03','15:04','15:05','15:06','15:07']
var inData = [100,150,199,300,50,89,60]
var outData = [300,200,400,70,90,160,230]
var d1 = [100,150,199,300,50,89,60]
var d2 = [300,200,400,70,90,160,230]

var option = {
  title: {
    text: '各系统备品备件实时数量图',
    subtext: '实时刷新(5秒/次)',
    left: 'center',
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


export default class EchartsTest extends PureComponent {
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


  }

  render() {
    return (
        <div  id="main"    style={{ width: 1200, height: 700 }}></div>
    );

  }

}
