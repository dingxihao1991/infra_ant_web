import React, {PureComponent} from 'react';
import { Row, Col ,Tooltip ,Icon,Card } from 'antd';
import echarts from 'echarts/lib/echarts';// 引入 ECharts 主模块
import 'echarts/lib/chart/line';//引入折线图
import 'echarts/lib/chart/pie';//引入饼图
import 'echarts/lib/chart/bar';
import 'echarts/lib/chart/radar';
import 'echarts/lib/component/tooltip';// 引入提示框和标题组件
import 'echarts/lib/component/title';// 引入提示框和标题组件
import 'echarts/lib/component/legend';
import 'echarts-liquidfill/src/liquidFill';
import styles from './home.less';
import{option1 , option2 , option3 ,option5 , option6 ,option7 ,option8} from './data';
import HomeMap from './HomeMap';

// 开始↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
var timeList4 = ['15:01','15:02','15:03','15:04','15:05','15:06','15:07','15:08','15:09','15:10']
var inData4 = [23,45,32,56,23,67,32,45,32,34]
var outData4 = [54,35,65,53,23,34,55,43,23,56]
export var option4 = {
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    data:['进站流量','出站流量'],
    itemHeight :25
  },
  grid: {
    left: '3%',
    right: '6%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: timeList4
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      name: '进站流量',
      type: 'line',
      stack: '总量',
      data: inData4,
      itemStyle : { normal: {label : {show: true}}}
    },
    {
      name: '出站流量',
      type: 'line',
      stack: '总量',
      data: outData4,
      itemStyle : { normal: {label : {show: true}}}
    }
  ]
};
// 结束↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
export default class Home extends PureComponent {
    state={

    }
    componentDidMount() {
      // 基于准备好的dom，初始化echarts实例
      var myChart1 = echarts.init(document.getElementById('main1'));
      myChart1.setOption(option1);

      var myChart2 = echarts.init(document.getElementById('main2'));
      myChart2.setOption(option2);

      var myChart3 = echarts.init(document.getElementById('main3'));
      myChart3.setOption(option6);

      //var myChart4 = echarts.init(document.getElementById('main4'));

      var myChart5 = echarts.init(document.getElementById('main5'));
      myChart5.setOption(option5);

      var myChart6 = echarts.init(document.getElementById('main6'));
      myChart6.setOption(option3);

      var myChart7 = echarts.init(document.getElementById('main7'));
      myChart7.setOption(option7);

      var myChart8 = echarts.init(document.getElementById('main8'));
      myChart8.setOption(option8);

      setInterval(() => {
        var nowDate = new Date()
        timeList4.push(nowDate.getHours() + ':' + nowDate.getMinutes() + ':' + nowDate.getSeconds())
        inData4.push( Math.ceil(Math.random() * 70))
        outData4.push( Math.ceil(Math.random() * 70))
        timeList4.shift()
        inData4.shift()
        outData4.shift()
        //myChart4.setOption(option4);
      }, 2000);
    }
    render() {
      const topColResponsiveProps = {
        style: { marginBottom: 24 ,width:'100%'},
      };
      const P1_Html = <p style={{marginBottom: -4}}><span style={{fontSize:22}}>车流总数统计</span><label style={{marginLeft: 208,fontSize: 18}}>总车辆：57</label></p>
      const P2_Html = <span style={{fontSize:22}}>进、出隧道流量统计</span>
      const P3_Html = <span style={{fontSize:22}}>健康指数</span>
     // const P4_Html = <span style={{fontSize:22}}>实时车流量图</span>
      const P4_Html = <span style={{fontSize:22}}>隧道分布图</span>
      const P5_Html = <span style={{fontSize:22}}>设备专业统计</span>
      const P6_Html = <span style={{fontSize:22}}>设备产地比例</span>
      const P7_Html = <span style={{fontSize:22}}>设备故障情况统计</span>

        return (
          <div className="gutter-example" >
            <Row gutter={16} style={{marginBottom:24}}>
              <Col className="gutter-row" span={8}>
                <div className="gutter-box">
                  <Card title={P1_Html} bordered={false} >
                    <div id="main1" style={{ height: 258,marginTop: 10 }}></div>
                  </Card>
                </div>
              </Col>
              <Col className="gutter-row" span={8}>
                <div className="gutter-box">
                  <Card title={P2_Html} bordered={false} >
                    <div id="main2" style={{ height: 261,marginTop: 10 }}></div>
                  </Card>
                </div>
              </Col>
              <Col className="gutter-row" span={8}>
                <div className="gutter-box">
                  <Card title={P3_Html} bordered={false} >
                    <Row style={{height: 271}}>
                      <Col span={10}>
                        <div id="main5" style={{ height: 260,marginTop: 10 }}  />
                      </Col>
                      <Col span={14}><div id="main3" style={{ height: 260,marginTop: 10 }} /></Col>
                    </Row>
                      {/*<div style={{width:12}}/>
                      </div>*/}
                  </Card>
                </div>
              </Col>
            </Row>

            <Row>
              <Col style={{marginBottom: 24}}>
                <Card title={P4_Html} bordered={false} >
                    <div id='main4' style={{ height: 500 }}>
                      <HomeMap />
                    </div>
                </Card>
              </Col>
            </Row>

            <Row gutter={16} style={{marginBottom:24}}>
              <Col className="gutter-row" span={8}>
                <div className="gutter-box">
                  <Card title={P5_Html} bordered={false} >
                    <div id="main6" style={{ height: 260,marginTop: 10 }}></div>
                  </Card>
                </div>
              </Col>
              <Col className="gutter-row" span={8}>
                <div className="gutter-box">
                  <Card title={P6_Html} bordered={false} >
                    <div id="main7" style={{ height: 260,marginTop: 10 }}></div>
                  </Card>
                </div>
              </Col>
              <Col className="gutter-row" span={8}>
                <div className="gutter-box">
                  <Card title={P7_Html} bordered={false} >
                    <div id="main8" style={{height: 260,marginTop: 10}}></div>
                  </Card>
                </div>
              </Col>
            </Row>
          </div>
        )
    }
}