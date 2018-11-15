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

const data3  =  {
  title: {
    text: '各系统备品备件实时数量图',
    subtext: '实时显示',
    left: 'center',

  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      label: {
        backgroundColor: '#283b56'
      }
    }
  },
  legend: {
    data:['通风系统', '排水系统','供电系统','其他系统']
  },
  toolbox: {
    show: true,
    feature: {
      dataView: {readOnly: false},
      restore: {},
      saveAsImage: {}
    }
  },
  dataZoom: {
    show: false,
    start: 0,
    end: 100
  },
  xAxis: [
    {
      type: 'category',
      boundaryGap: true,
      data: (function (){
        var now = new Date();
        var res = [];
        var len = 10;
        while (len--) {
          res.unshift(now.toLocaleTimeString().replace(/^\D*/,''));
          now = new Date(now - 2000);
        }
        return res;
      })()
    },
    {
      type: 'category',
      boundaryGap: true,
      data: (function (){
        var res = [];
        var len = 10;
        while (len--) {
          res.push(10 - len - 1);
        }
        return res;
      })()
    }
  ],
  yAxis: [
    {
      type: 'value',
      scale: true,
      name: '价格',
      max: 30,
      min: 0,
      boundaryGap: [0.2, 0.2]
    },
    {
      type: 'value',
      scale: true,
      name: '预购量',
      max: 1200,
      min: 0,
      boundaryGap: [0.2, 0.2]
    }
  ],
  series: [
    {
      name:'通风系统',
      type:'line',
      xAxisIndex: 1,
      yAxisIndex: 1,
      data:(function (){
        var res = [];
        var len = 10;
        while (len--) {
          res.push(Math.round(Math.random() * 1000));
        }
        return res;
      })()
    },
    {
      name:'排水系统',
      type:'line',
      data:(function (){
        var res = [];
        var len = 0;
        while (len < 10) {
          res.push((Math.random()*10 + 5).toFixed(1) - 0);
          len++;
        }
        return res;
      })()
    },
    {
      name:'供电系统',
      type:'line',
      data:(function (){
        var res = [];
        var len = 0;
        while (len < 10) {
          res.push((Math.random()*10 + 5).toFixed(1) - 0);
          len++;
        }
        return res;
      })()
    },
    {
      name:'其他系统',
      type:'line',
      data:(function (){
        var res = [];
        var len = 0;
        while (len < 10) {
          res.push((Math.random()*10 + 5).toFixed(1) - 0);
          len++;
        }
        return res;
      })()
    }
  ]
}

export default class EchartsTest extends PureComponent {
  componentDidMount() {

    let appCount = 11;
    setInterval(function (){
      //定期时间
      let axisData = (new Date()).toLocaleTimeString().replace(/^\D*/,'');

      //10个一组的数据
      let data0 = data3.series[0].data;
      let data1 = data3.series[1].data;
      let data2 = data3.series[2].data;
      let data4 = data3.series[3].data;
      data0.shift();
      data0.push(Math.round(Math.random() * 1000));
      data1.shift();
      data1.push((Math.random() * 10 + 5).toFixed(1) - 0);
      data2.shift();
      data2.push((Math.random() * 10 + 5).toFixed(1) - 0);

      data4.shift();
      data4.push((Math.random() * 10 + 5).toFixed(1) - 0);

      data3.xAxis[0].data.shift();
      data3.xAxis[0].data.push(axisData);
      data3.xAxis[1].data.shift();
      data3.xAxis[1].data.push(appCount++);
      let myChart = echarts.init(document.getElementById('main'));

      console.log("start~~");
      console.log(myChart);
      console.log("end~~");
      myChart.setOption(data3);
    }, 5000);

  }

  render() {
    return (
      <div className="row">
        <div  id="main" className="col-md-12"   style={{ width: 1200, height: 700 }}></div>
      </div>
    );

  }

}
