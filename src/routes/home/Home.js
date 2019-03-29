import React, {PureComponent} from 'react';
import { Row, Col ,Tooltip ,Icon,Card ,Layout} from 'antd';
import echarts from 'echarts/lib/echarts';// 引入 ECharts 主模块
import 'echarts/lib/chart/line';//引入折线图
import 'echarts/lib/chart/pie';//引入饼图
import 'echarts/lib/chart/bar';
import 'echarts/lib/chart/radar';
import 'echarts/lib/component/tooltip';// 鼠标移上去效果
import 'echarts/lib/component/title';// 引入提示框和标题组件
import 'echarts/lib/component/legend'; // 标记
import 'echarts-liquidfill/src/liquidFill';
import styles from './home.less';
import{option11 , option12 , option13 ,option15 , option16 ,option17 ,option18} from './data';
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

//地质沉降
function geologicalSedimentation(){
    var facilityChangeContainer = document.getElementById('main16');
    var facilityChangeChart = echarts.init(facilityChangeContainer);

    var facilityChangeOption = {
        tooltip: {
            trigger: 'axis'
        },
        color: ['#4CD0E1', '#F08175'],
        legend: {
            data: ['地表沉降','拱顶沉降']
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            name:'时间',
            nameLocation:'center',
            nameGap: 35,
            type: 'category',
            boundaryGap: false,
            data: ['2019-02-06', '2019-02-14', '2019-02-27', '2019-03-10', '2019-03-18', '2019-03-30', '2019-04-14'],
            axisLine: {
                lineStyle: {
                    color: '#48b',
                    type: 'solid'
                }
            },
            axisLabel: {
                textStyle: {
                    color: '#B1B1B1',
                }
            }
        },
        yAxis: {
            name:'沉降值',
            type: 'value',
            axisLine: {
                lineStyle: {
                    color: '#48b',
                    type: 'solid'
                }
            },
            axisLabel: {
                textStyle: {
                    color: '#B1B1B1',
                }
            }
        },
        series: [
            {
                name:'地表沉降',
                type: 'line',
                stack: '总量',
                smooth: true,
                data: [-1.5, -2.0, -2.5, -2.7, -3.0, -3.2, -4.0],
                markPoint: {
                    data: [
                        {type: 'max', name: '最大值'},
                        {type: 'min', name: '最小值'}
                    ]
                },
            },{
                name: '拱顶沉降',
                type: 'line',
                stack: '总量',
                smooth: true,
                data: [-0.5, -1.5, -3.0, -3.4, -3.8, -4.0, -4.5],
                markPoint: {
                    data: [
                        {type: 'max', name: '最大值'},
                        {type: 'min', name: '最小值'}
                    ]
                },
            }
        ]
    };

    facilityChangeChart.setOption(facilityChangeOption, true);
}
//地质沉降
function structuralStress(){
    var facilityChangeContainer = document.getElementById('main18');
    var facilityChangeChart = echarts.init(facilityChangeContainer);

    var facilityChangeOption = {
        tooltip: {
            trigger: 'axis'
        },
        color: ['#4CD0E1', '#F08175'],
        legend: {
            data: ['混凝土结构','钢构支撑']
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            name:'strain(x10-³)',
            nameLocation:'center',
            type: 'category',
            boundaryGap: false,
            data: ['0', '10000', '20000', '30000','40000','50000','60000'],
            axisLine: {
                lineStyle: {
                    color: '#48b',
                    type: 'solid'
                }
            },
            axisLabel: {
                textStyle: {
                    color: '#B1B1B1',
                }
            }
        },
        yAxis: {
            name:'Stress(MPa)',
            type: 'value',
            axisLine: {
                lineStyle: {
                    color: '#48b',
                    type: 'solid'
                }
            },
            axisLabel: {
                textStyle: {
                    color: '#B1B1B1',
                }
            }
        },
        series: [
            {
                name:'混凝土结构',
                type: 'line',
                stack: '总量',
                smooth: true,
                data: [0, 3, 5, 6, 10, 15, 20],
                markPoint: {
                    data: [
                        {type: 'max', name: '最大值'},
                        {type: 'min', name: '最小值'}
                    ]
                },
            },{
                name: '钢构支撑',
                type: 'line',
                stack: '总量',
                smooth: true,
                data: [0, 2, 4, 5, 8, 10, 15],
                markPoint: {
                    data: [
                        {type: 'max', name: '最大值'},
                        {type: 'min', name: '最小值'}
                    ]
                },
            }
        ]
    };

    facilityChangeChart.setOption(facilityChangeOption, true);
}
//设备专业统计
function facilityProfession(){
    var Container = document.getElementById("main17")
    var Chart = echarts.init(Container);
    Chart.showLoading({
        text: '正在努力的读取数据中...'//loading话术
    });

    var facilityProfessionOption = {
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        grid: {
            left: '1%',
            right: '1%',
            bottom: '3%',
            containLabel: true
        },
        color: ['#A3DE83', '#F2E394', '#F2AE72', '#D96459', '#38817A'],
        legend: {
            orient: 'vertical',
            x: 'right',
            data: ["风阀", "排风机", "照明", "门禁", "水泵", "控制柜"]
        },
        series: [{
            name: "设备专业",
            type: "pie",
            radius: "65%",
            center: [
                "50%",
                "50%"
            ],
            itemStyle:{
                normal: {
                    label: {
                        textStyle: {
                            color: '#777'
                        },
                        formatter: "{b} ({c}台)"
                    },
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            },
            data: [
                {
                    name: "风阀",
                    value: "8"
                },
                {
                    name: "排风机",
                    value: "5"
                },
                {
                    name: "照明",
                    value: "2"
                },
                {
                    name: "门禁",
                    value: "3"
                },
                {
                    name: "水泵",
                    value: "7"
                },
                {
                    name: "控制柜",
                    value: "2"
                }
            ]
        }]

    };
    Chart.hideLoading();
    Chart.setOption(facilityProfessionOption);

}

export default class Home extends PureComponent {
    state={

    }

    componentDidMount() {
      // 基于准备好的dom，初始化echarts实例
      var myChart11 = echarts.init(document.getElementById('main11'));
      myChart11.setOption(option11);

      var myChart12 = echarts.init(document.getElementById('main12'));
      myChart12.setOption(option12);

      var myChart13 = echarts.init(document.getElementById('main13'));
      myChart13.setOption(option16);

      //var myChart4 = echarts.init(document.getElementById('main4'));

      var myChart15 = echarts.init(document.getElementById('main15'));
      myChart15.setOption(option15);

        //地质沉降
        geologicalSedimentation();
        //结构应力
        structuralStress();
        facilityProfession();



      /*setInterval(() => {
        var nowDate = new Date()
        timeList4.push(nowDate.getHours() + ':' + nowDate.getMinutes() + ':' + nowDate.getSeconds())
        inData4.push( Math.ceil(Math.random() * 70))
        outData4.push( Math.ceil(Math.random() * 70))
        timeList4.shift()
        inData4.shift()
        outData4.shift()
        //myChart4.setOption(option4);
      }, 2000);*/
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
      const P5_Html = <span style={{fontSize:22}}>地质沉降</span>
      const P6_Html = <span style={{fontSize:22}}>设备专业统计</span>
      const P7_Html = <span style={{fontSize:22}}>结构应力</span>

        return (
          <Layout className="gutter-example" style={{background:"#E5E5E5"}} >
            <Row gutter={16} style={{marginBottom:24}}>
              <Col className="gutter-row" span={8}>
                <div className="gutter-box">
                  <Card title={P1_Html} bordered={false} >
                    <div id="main11" style={{ height: 258,marginTop: 10 , width:492 }}></div>
                  </Card>
                </div>
              </Col>
              <Col className="gutter-row" span={8}>
                <div className="gutter-box">
                  <Card title={P2_Html} bordered={false} >
                    <div id="main12" style={{ height: 261,marginTop: 10, width:492 ,left: 28}}></div>
                  </Card>
                </div>
              </Col>
              <Col className="gutter-row" span={8}>
                <div className="gutter-box">
                  <Card title={P3_Html} bordered={false} >
                    <Row style={{height: 271}}>
                      <Col span={10}>
                        <div id="main15" style={{ height: 261,marginTop: 10, width:380}}  />
                      </Col>
                      <Col span={14}><div id="main13" style={{ height: 258,marginTop: 10,width:340 }} /></Col>
                    </Row>
                      {/*<div style={{width:12}}/>
                      </div>*/}
                  </Card>
                </div>
              </Col>
            </Row>

{/*            <Row>
              <Col style={{marginBottom: 24}}>
                <Card title={P4_Html} bordered={false} >
                    <div id='main4' style={{ height: 500 }}>
                      <HomeMap />
                    </div>
                </Card>
              </Col>
            </Row>*/}

            <Row gutter={16} style={{marginBottom:24}}>
              <Col className="gutter-row" span={8}>
                <div className="gutter-box">
                  <Card title={P5_Html} bordered={false} >
                    <div id="main16" style={{ height: 258,marginTop: 10 , width:492}}></div>
                  </Card>
                </div>
              </Col>
              <Col className="gutter-row" span={8}>
                <div className="gutter-box">
                  <Card title={P6_Html} bordered={false} >
                    <div id="main17" style={{ height: 258,marginTop: 10 , width:492}}></div>
                  </Card>
                </div>
              </Col>
              <Col className="gutter-row" span={8}>
                <div className="gutter-box">
                  <Card title={P7_Html} bordered={false} >
                    <div id="main18" style={{ height: 258,marginTop: 10 , width:492}}></div>
                  </Card>
                </div>
              </Col>
            </Row>
          </Layout>
        )
    }
}