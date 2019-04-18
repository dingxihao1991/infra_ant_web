import React, {PureComponent} from 'react';
import { Row, Col ,Tooltip ,Icon,Card ,Layout,List,Avatar,Tree } from 'antd';
import moment from 'moment';
import styles from './home.less';
import ReactEcharts from 'echarts-for-react';
import{EquipmentFailureOption , pipeTypeMonitorOption ,lineDashboard} from './data';
import HomeMap from './HomeMap';
const { TreeNode } = Tree;
// 开始↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
let data = [{value: 1000, name: '总功耗'}];
// 结束↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
export default class Home extends PureComponent {
    state={
      monitorData:[{value: 1000, name: '总功耗'}],
      MonitorDashboard:{}
    }

    componentDidMount() {
      this.setState({
        MonitorDashboard:{
          series: [
            {
              name: '业务指标',
              type: 'gauge',
              center: ['50%', '58%'],
              radius: '60%',
              z:3,
              min:0,
              max:2000,
              startAngle: 220,
              endAngle: -40,
              precision: 0,               // 小数精度，默认为0，无小数点
              splitNumber: 10,
              axisLine: {            // 坐标轴线
                show: true,
                lineStyle: {       // 属性lineStyle控制线条样式
                  color: [[0.2, "#76cd58"], [0.4, "#e5cf45"], [0.8, "#e88426"], [1, "#cf5322"]],
                  width: 8
                }
              },
              axisTick: {            // 坐标轴小标记
                show: true,        // 属性show控制显示与否，默认不显示
                splitNumber: 5,    // 每份split细分多少段
                length: 8,         // 属性length控制线长
                lineStyle: {       // 属性lineStyle控制线条样式
                  color: '#eee',
                  width: 1,
                  type: 'solid'
                }
              },
              axisLabel: {           // 坐标轴文本标签，详见axis.axisLabel
                show: true,
                formatter: function (v) {
                  switch (v + '') {
                    case '400':
                      return '弱';
                    case '800':
                      return '低';
                    case '1200':
                      return '中';
                    case '1600':
                      return '高';
                    default:
                      return '';
                  }
                },
                textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                  color: '#fff'
                }
              },
              splitLine: {           // 分隔线
                show: true,        // 默认显示，属性show控制显示与否
                length: 15,         // 属性length控制线长
                lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                  color: '#eee',
                  width: 2,
                  type: 'solid'
                }
              },
              pointer: {
                length: '78%',
                width: 5,
                color: 'auto'
              },
              title: {
                show: true,
                offsetCenter: ['0%', 40],       // x, y，单位px
                textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                  color: '#fff',
                  fontSize: 14
                }
              },
              detail: {
                show: true,
                backgroundColor: 'rgba(0,0,0,0)',
                borderWidth: 0,
                borderColor: '#ccc',
                width: 100,
                height: 40,
                offsetCenter: ['0%', 65],       // x, y，单位px
                formatter: '{value}kw',
                textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                  color: 'auto',
                  fontSize: 17
                }
              },
              data: data
            }
          ]
        },
      })

      setInterval(() => {
        data[0].value = (Math.random() * 100).toFixed(2) - 0;
        this.setState({
          MonitorDashboard:{
            series: [
              {
                name: '业务指标',
                type: 'gauge',
                center: ['50%', '58%'],
                radius: '60%',
                z:3,
                min:0,
                max:2000,
                startAngle: 220,
                endAngle: -40,
                precision: 0,               // 小数精度，默认为0，无小数点
                splitNumber: 10,
                axisLine: {            // 坐标轴线
                  show: true,
                  lineStyle: {       // 属性lineStyle控制线条样式
                    color: [[0.2, "#76cd58"], [0.4, "#e5cf45"], [0.8, "#e88426"], [1, "#cf5322"]],
                    width: 8
                  }
                },
                axisTick: {            // 坐标轴小标记
                  show: true,        // 属性show控制显示与否，默认不显示
                  splitNumber: 5,    // 每份split细分多少段
                  length: 8,         // 属性length控制线长
                  lineStyle: {       // 属性lineStyle控制线条样式
                    color: '#eee',
                    width: 1,
                    type: 'solid'
                  }
                },
                axisLabel: {           // 坐标轴文本标签，详见axis.axisLabel
                  show: true,
                  formatter: function (v) {
                    switch (v + '') {
                      case '400':
                        return '弱';
                      case '800':
                        return '低';
                      case '1200':
                        return '中';
                      case '1600':
                        return '高';
                      default:
                        return '';
                    }
                  },
                  textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                    color: '#fff'
                  }
                },
                splitLine: {           // 分隔线
                  show: true,        // 默认显示，属性show控制显示与否
                  length: 15,         // 属性length控制线长
                  lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                    color: '#eee',
                    width: 2,
                    type: 'solid'
                  }
                },
                pointer: {
                  length: '78%',
                  width: 5,
                  color: 'auto'
                },
                title: {
                  show: true,
                  offsetCenter: ['0%', 40],       // x, y，单位px
                  textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                    color: '#fff',
                    fontSize: 14
                  }
                },
                detail: {
                  show: true,
                  backgroundColor: 'rgba(0,0,0,0)',
                  borderWidth: 0,
                  borderColor: '#ccc',
                  width: 100,
                  height: 40,
                  offsetCenter: ['0%', 65],       // x, y，单位px
                  formatter: '{value}kw',
                  textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                    color: 'auto',
                    fontSize: 17
                  }
                },
                data: data
              }
            ]
          },
        })
      }, 2000);
    }


    render() {
      let {MonitorDashboard} = this.state;

      let data = [
        {name: '王强',css:'2px #006666 solid',workName:'彩虹西路管廊发生烟雾报警',type:'其它',status:'进行中',startTime:'2019-03-21 13:30:00'},
        {name: '运维一号人员',css:'2px rgb(204, 102, 0) solid',workName:'日常巡检',type:'巡视',status:'待执行',startTime:'2019-03-22 11:30:00'},
        {name: '运维二号人员',css:'2px #006666 solid',workName:'日常巡检',type:'巡视',status:'进行中',startTime:'2019-03-21 9:30:00'}
      ]

      const topColResponsiveProps = {
        style: { marginBottom: 24 ,width:'100%'},
      };
      const P1_Html = <span style={{fontSize:22}}>各管廊运行状态</span>
      const P2_Html = <span style={{fontSize:22}}>管廊附属设备故障统计</span>
      const P3_Html = <span style={{fontSize:22}}>环境监测</span>
      const P4_Html = <span style={{fontSize:22}}>今日任务状态</span>
      const P5_Html = <span style={{fontSize:22}}>彩虹西路（将军岭路-鸡鸣山路）入廊管线统计</span>
      const P6_Html = <span style={{fontSize:22}}>彩虹西路（将军岭路-鸡鸣山路）管线报警趋势图</span>
      const P7_Html = <span style={{fontSize:18,marginLeft: 10}}>高新区</span>

        return (
          <Layout className="gutter-example" style={{background:"#E5E5E5"}} >
            <Row gutter={16} style={{marginBottom:10}}>

              <Col className="gutter-row" span={8}>
                <div className="gutter-box">
                  <Card title={P1_Html} bordered={false} >
                    <div style={{ height: '419px','overflow-y': 'scroll'}}>
                      <Tree
                        showIcon
                        defaultExpandAll
                        defaultSelectedKeys={['0-0-0']}
                      >
                        <TreeNode  icon={<img src='/static/public/images/home/Pipelines_24px.png'/>} title={P7_Html} key="0-0">
                          <TreeNode style={{marginTop: 12}} icon={<img src= '/static/public/images/home/red.png' />} title={<span style={{fontSize:18,marginLeft: 10}}>彩虹西路(将军岭路~鸡鸣山路)</span>} key="0-0-0" />
                          <TreeNode style={{marginTop: 12}} icon={<img src= '/static/public/images/home/green.png' />} title={<span style={{fontSize:18,marginLeft: 10}}>彩虹西路(鸡鸣山路~方兴大道)</span>} key="0-0-1"/>
                          <TreeNode style={{marginTop: 12}} icon={<img src= '/static/public/images/home/green.png' />} title={<span style={{fontSize:18,marginLeft: 10}}>习友路(将军岭路~方兴大道)</span>} key="0-0-2"/>
                          <TreeNode style={{marginTop: 12}} icon={<img src= '/static/public/images/home/green.png' />} title={<span style={{fontSize:18,marginLeft: 10}}>火龙地路(彩虹西路~望江西路)</span>} key="0-0-3"/>
                          <TreeNode style={{marginTop: 12}} icon={<img src= '/static/public/images/home/green.png' />} title={<span style={{fontSize:18,marginLeft: 10}}>火龙地路(习友路~明珠大道)</span>} key="0-0-4"/>
                          <TreeNode style={{marginTop: 12}} icon={<img src= '/static/public/images/home/green.png' />} title={<span style={{fontSize:18,marginLeft: 10}}>火龙地路(明珠大道~铭传路)</span>} key="0-0-5"/>
                          <TreeNode style={{marginTop: 12}} icon={<img src= '/static/public/images/home/green.png' />} title={<span style={{fontSize:18,marginLeft: 10}}>明珠大道(鸡鸣山路~方兴大道)</span>} key="0-0-6"/>
                          <TreeNode style={{marginTop: 12}} icon={<img src= '/static/public/images/home/green.png' />} title={<span style={{fontSize:18,marginLeft: 10}}>鸡鸣山路(彩虹西路~方兴大道)</span>} key="0-0-7"/>
                          <TreeNode style={{marginTop: 12}} icon={<img src= '/static/public/images/home/green.png' />} title={<span style={{fontSize:18,marginLeft: 10}}>柏堰湾路(将军岭路~孔雀台路)</span>} key="0-0-8"/>
                          <TreeNode style={{marginTop: 12}} icon={<img src= '/static/public/images/home/green.png' />} title={<span style={{fontSize:18,marginLeft: 10}}>柏堰湾路(孔雀台路~方兴大道)</span>} key="0-0-9"/>
                          <TreeNode style={{marginTop: 12}} icon={<img src= '/static/public/images/home/green.png' />} title={<span style={{fontSize:18,marginLeft: 10}}>将军岭路(长江西路~柏堰湾路)</span>} key="0-0-10"/>
                        </TreeNode>
                      </Tree>
                    </div>
                  </Card>
                </div>
              </Col>

              <Col className="gutter-row" span={8}>
                <div className="gutter-box">
                  <Card title={P2_Html} bordered={false} >
                    <div style={{ height: '410px',marginTop: 10, width:492 ,left: 28}}>
                      <ReactEcharts option={EquipmentFailureOption}
                                    notMerge={true}
                                    lazyUpdate={true}
                                    style={{height:'100%'}}/>
                    </div>
                  </Card>
                </div>
              </Col>

              <Col className="gutter-row" span={8}>
                <div className="gutter-box">
                  <Card title={P3_Html} bordered={false}>
                    <div style={{height: 69.8,padding: 0}}>
                      <div style={{float: 'left',width:'22%'}}>
                          <i style={{display: 'inline-block',backgroundImage: 'url(/images/home/o2_panel.png)',width: 40,height: 40,marginTop: -4}}></i>
                      </div>
                      <div style={{float: 'left',width:'26%'}}>
                        <h5 style={{color: 'rgb(66, 133, 244)',"line-height": 25}}>氧气</h5>
                      </div>
                      <div style={{float: 'left',width:'30%'}}>
                        <h5 style={{color: 'rgb(66, 133, 244)',"line-height": 25}}>31.9g/mol</h5>
                      </div >
                      <div style={{float: 'left'}}>
                        <h5 style={{color: 'rgb(66, 133, 244)',"line-height": 25}}>40.4g/mol</h5>
                      </div>
                      <div style={{borderBottom: '1px dashed #dee5e7',height: 2,margin: '10px 0px',fontSize: 0,float:'left',width:'100%'}}></div>
                    </div>

                    <div style={{ height: 69.8,padding: 0}}>
                      <div style={{float: 'left',width:'22%'}}>
                        <i style={{display: 'inline-block',backgroundImage: 'url(/images/home/Carbonmonoxide.png)',width: 40,height: 40,marginTop: -4}}></i>
                      </div>
                      <div style={{float: 'left',width:'26%'}}>
                        <h5 style={{color: 'rgb(66, 133, 244)',"line-height": 25}}>一氧化碳</h5>
                      </div>
                      <div style={{float: 'left',width:'30%'}}>
                        <h5 style={{color: 'rgb(66, 133, 244)',"line-height": 25}}>12.9g/mol</h5>
                      </div >
                      <div style={{float: 'left'}}>
                        <h5 style={{color: 'rgb(66, 133, 244)',"line-height": 25}}>28g/mol</h5>
                      </div>
                      <div style={{borderBottom: '1px dashed #dee5e7',height: 2,margin: '10px 0px',fontSize: 0,float:'left',width:'100%'}}></div>
                    </div>

                    <div style={{ color: 'rgb(66, 133, 244)',height: 69.8,padding: 0}}>
                      <div style={{float: 'left',width:'22%'}}>
                        <i style={{display: 'inline-block',backgroundImage: 'url(/images/home/h2s_panel.png)',width: 40,height: 40,marginTop: -4}}></i>
                      </div>
                      <div style={{float: 'left',width:'26%'}}>
                        <h5 style={{color: 'rgb(66, 133, 244)',"line-height": 25}}>硫化氢</h5>
                      </div>
                      <div style={{float: 'left',width:'30%'}}>
                        <h5 style={{color: 'rgb(66, 133, 244)',"line-height": 25}}>16.9g/mol</h5>
                      </div >
                      <div style={{float: 'left'}}>
                        <h5 style={{color: 'rgb(66, 133, 244)',"line-height": 25}}>25.4g/mol</h5>
                      </div>
                      <div style={{borderBottom: '1px dashed #dee5e7',height: 2,margin: '10px 0px',fontSize: 0,float:'left',width:'100%'}}></div>
                    </div>

                    <div style={{ color: 'rgb(66, 133, 244)',height: 69.8,padding: 0}}>
                      <div style={{float: 'left',width:'22%'}}>
                        <i style={{display: 'inline-block',backgroundImage: 'url(/images/home/ch4_panel.png)',width: 40,height: 40,marginTop: -4}}></i>
                      </div>
                      <div style={{float: 'left',width:'26%'}}>
                        <h5 style={{color: 'rgb(66, 133, 244)',"line-height": 25}}>甲烷</h5>
                      </div>
                      <div style={{float: 'left',width:'30%'}}>
                        <h5 style={{color: 'rgb(66, 133, 244)',"line-height": 25}}>65%</h5>
                      </div >
                      <div style={{float: 'left'}}>
                        <h5 style={{color: 'rgb(66, 133, 244)',"line-height": 25}}>88%</h5>
                      </div>
                      <div style={{borderBottom: '1px dashed #dee5e7',height: 2,margin: '10px 0px',fontSize: 0,float:'left',width:'100%'}}></div>
                    </div>

                    <div style={{ color: 'rgb(66, 133, 244)',height: 69.8,padding: 0}}>
                      <div style={{float: 'left',width:'22%'}}>
                        <i style={{display: 'inline-block',backgroundImage: 'url(/images/home/Humidity_40px.png)',width: 40,height: 40,marginTop: -4}}></i>
                      </div>
                      <div style={{float: 'left',width:'26%'}}>
                        <h5 style={{color: 'rgb(66, 133, 244)',"line-height": 25}}>湿度</h5>
                      </div>
                      <div style={{float: 'left',width:'30%'}}>
                        <h5 style={{color: 'rgb(66, 133, 244)',"line-height": 25}}>10℃</h5>
                      </div >
                      <div style={{float: 'left'}}>
                        <h5 style={{color: 'rgb(66, 133, 244)',"line-height": 25}}>21℃</h5>
                      </div>
                      <div style={{borderBottom: '1px dashed #dee5e7',height: 2,margin: '10px 0px',fontSize: 0,float:'left',width:'100%'}}></div>
                    </div>

                    <div style={{ color: 'rgb(66, 133, 244)',height: 69.8,padding: 0}}>
                      <div style={{float: 'left',width:'22%'}}>
                        <i style={{display: 'inline-block',backgroundImage: 'url(/images/home/Thermometer_40px.png)',width: 40,height: 40,marginTop: -4}}></i>
                      </div>
                      <div style={{float: 'left',width:'26%'}}>
                        <h5 style={{color: 'rgb(66, 133, 244)',"line-height": 25}}>温度</h5>
                      </div>
                      <div style={{float: 'left',width:'30%'}}>
                        <h5 style={{color: 'rgb(66, 133, 244)',"line-height": 25}}>31.9g/mol</h5>
                      </div >
                      <div style={{float: 'left'}}>
                        <h5 style={{color: 'rgb(66, 133, 244)',"line-height": 25}}>40.4g/mol</h5>
                      </div>
                      <div style={{borderBottom: '1px dashed #dee5e7',height: 2,margin: '10px 0px',fontSize: 0,float:'left',width:'100%'}}></div>
                    </div>
                  </Card>
                </div>
              </Col>
            </Row>

            <Row style={{'background-color': 'white' ,marginBottom: '10px'}}>
              <Col span={4}>
                <i style={{display:'inline-block',backgroundImage: 'url(/images/home/wind.png)',width: 50,height: 42,marginTop: 5,marginLeft: 26,backgroundRepeat:'no-repeat'}}></i>
                <span style={{color:'rgb(64, 64, 64)',position: 'absolute',top: 15,left: 95,fontSize: 18}}>通风：<span style={{color: 'rgb(92, 184, 92)'}}>正常</span></span>
              </Col>
              <Col span={4}>
                <i style={{display:'inline-block',backgroundImage: 'url(/images/home/water.png)',width: 50,height: 42,marginTop: 5,marginLeft: 26,backgroundRepeat:'no-repeat'}}></i>
                <span style={{color:'rgb(64, 64, 64)',position: 'absolute',top: 15,left: 95,fontSize: 18}}>排水：<span style={{color: 'rgb(92, 184, 92)'}}>正常</span></span>
              </Col>
              <Col span={4}>
                <i style={{display:'inline-block',backgroundImage: 'url(/images/home/power.png)',width: 50,height: 42,marginTop: 5,marginLeft: 26,backgroundRepeat:'no-repeat'}}></i>
                <span style={{color:'rgb(64, 64, 64)',position: 'absolute',top: 15,left: 95,fontSize: 18}}>电力：<span style={{color: 'rgb(92, 184, 92)'}}>正常</span></span>
              </Col>
              <Col span={4}>
                <i style={{display:'inline-block',backgroundImage: 'url(/images/home/door.png)',width: 50,height: 42,marginTop: 5,marginLeft: 26,backgroundRepeat:'no-repeat'}}></i>
                <span style={{color:'rgb(64, 64, 64)',position: 'absolute',top: 15,left: 95,fontSize: 18}}>门禁：<span style={{color: 'rgb(92, 184, 92)'}}>正常</span></span>
              </Col>
              <Col span={4}>
                <i style={{display:'inline-block',backgroundImage: 'url(/images/home/cctv.png)',width: 50,height: 42,marginTop: 5,marginLeft: 26,backgroundRepeat:'no-repeat'}}></i>
                <span style={{color:'rgb(64, 64, 64)',position: 'absolute',top: 15,left: 95,fontSize: 18}}>照明：<span style={{color: 'rgb(92, 184, 92)'}}>正常</span></span>
              </Col>
              <Col span={4}>
                <i style={{display:'inline-block',backgroundImage: 'url(/images/home/wind.png)',width: 50,height: 42,marginTop: 5,marginLeft: 26,backgroundRepeat:'no-repeat'}}></i>
                <span style={{color:'rgb(64, 64, 64)',position: 'absolute',top: 15,left: 95,fontSize: 18}}>CCTV：<span style={{color: 'rgb(92, 184, 92)'}}>正常</span></span>
              </Col>
            </Row>

            <Row gutter={16} style={{marginBottom: '20px'}}>

              <Col className="gutter-row" span={6} style={{height:90}}>
                <div style={{'background-color': 'white',float: 'left',padding:22 ,height: '100%'}}>
                  <img src='/images/home/1.png'></img>
                </div>
                <div style={{'background-color': 'white',height: '100%'}}>
                  <div style={{fontSize:'28px',paddingLeft:328,paddingTop: 9}}>4条</div>
                  <div style={{paddingLeft:289,'font-size': '16px','padding-bottom':'10px'}}>已入廊管线</div>
                </div>
              </Col>

              <Col className="gutter-row" span={6} style={{height:90}}>
                <div style={{'background-color': 'white',float: 'left',padding:22 ,height: '100%'}}>
                  <img src='/images/home/2.png'></img>
                </div>
                <div style={{'background-color': 'white',height: '100%'}}>
                  <div style={{fontSize:'28px',paddingLeft:328,paddingTop: 9}}>4条</div>
                  <div style={{paddingLeft:242,'font-size': '16px','padding-bottom':'10px'}}>已入廊管线总长度</div>
                </div>
              </Col>
              <Col className="gutter-row" span={6} style={{height:90}}>
                <div style={{'background-color': 'white',float: 'left',padding:22 ,height: '100%'}}>
                  <img src='/images/home/3.png'></img>
                </div>
                <div style={{'background-color': 'white',height: '100%'}}>
                  <div style={{fontSize:'2rem',paddingLeft:328,paddingTop: 9}}>4条</div>
                  <div style={{paddingLeft:289,'font-size': '16px','padding-bottom':'10px'}}>待入廊管线</div>
                </div>
              </Col>
              <Col className="gutter-row" span={6} style={{height:90}}>
                <div style={{'background-color': 'white',float: 'left',padding:22 ,height: '100%'}}>
                  <img src='/images/home/4.png'></img>
                </div>
                <div style={{'background-color': 'white',height: '100%'}}>
                  <div style={{fontSize:'28px',paddingLeft:328,paddingTop: 9}}>4条</div>
                  <div style={{paddingLeft:242,'font-size': '16px','padding-bottom':'10px'}}>待入廊管线总长度</div>
                </div>
              </Col>
            </Row>

            <Row gutter={16} style={{marginBottom:20}}>
              <Col className="gutter-row" span={8}>
                <div className="gutter-box">
                  <Card title={P5_Html} bordered={false} >
                    <div style={{ height: 280,marginTop: 10 , width:492}}>
                      <ReactEcharts option={pipeTypeMonitorOption}
                                    notMerge={true}
                                    lazyUpdate={true}/>
                    </div>
                  </Card>
                </div>
              </Col>
              <Col className="gutter-row" span={16}>
                <div className="gutter-box">
                  <Card title={P6_Html} bordered={false} >
                    <div style={{ height: 280,marginTop: 10 }}>
                      <ReactEcharts option={lineDashboard}
                                    notMerge={true}
                                    lazyUpdate={true}/>
                    </div>
                  </Card>
                </div>
              </Col>
            </Row>

            <Row gutter={16} style={{marginBottom:24,minHeight:482}}>
              <Col className="gutter-row" span={8}>
                  <Card title={P4_Html} bordered={false}>
                      <div style={{height:368,'overflow-y': 'scroll'}}>
                        <List
                          itemLayout="horizontal"
                          dataSource={data}
                          renderItem={item => (
                            <List.Item>
                              <div style={{padding:'7%',width:176,height:90,border:item.css,textAlign: 'center'}}>
                                {item.name}
                              </div>
                              <div style={{marginLeft: 10}}>
                                <p style={{marginBottom: 0}}>任务：{item.workName}</p>
                                <p style={{marginBottom: 0}}>类型：{item.type}</p>
                                <p style={{marginBottom: 0}}>任务状态：{item.status}</p>
                                <p style={{marginBottom: 0}}>执行时间：{moment(item.startTime).format('YYYY-MM-DD HH:mm:ss')}</p>
                              </div>
                            </List.Item>)}/>
                      </div>
                  </Card>
              </Col>
              <Col className="gutter-row" span={16}>
                 <iframe src='http://localhost/gl/webgis/Arcgis_Line?Planid=40281a816a1ed989016a201dcd110005' style={{width: '100%',minHeight: 481 ,backgroundColor:'white' }}></iframe>
              </Col>
            </Row>

            <Row style={{backgroundColor:'white',padding: '22px 27px'}} gutter={16}>
              <div>
                <div style={{borderBottom: '1px solid rgb(230, 230, 230)'}}>
                  <h4 style={{color: '#404040','margin-bottom': '0 !important'}}>能耗监管</h4>
                </div>
                <Col span={6}>
                  <div style={{padding: 24}}>
                    <div style={{'border-bottom': '1px solid rgb(230, 230, 230)'}}>
                      <span style={{color: 'rgb(92, 184, 92)',float:'right'}}>正常</span>
                      <h4 style={{'margin-bottom': '0 !important',color: 'rgb(64, 64, 64)',fontSize: 15}}>电力舱</h4>
                    </div>
                    <ReactEcharts option={MonitorDashboard}
                                  notMerge={true}
                                  lazyUpdate={true}/>
                  </div>
                </Col>
                <Col span={6}>
                  <div style={{padding: 24}}>
                    <div style={{'border-bottom': '1px solid rgb(230, 230, 230)'}}>
                      <span style={{color: 'rgb(92, 184, 92)',float:'right'}}>正常</span>
                      <h4 style={{'margin-bottom': '0 !important',color: 'rgb(64, 64, 64)',fontSize: 15}}>电力舱</h4>
                    </div>
                    <ReactEcharts option={MonitorDashboard}
                                  notMerge={true}
                                  lazyUpdate={true}/>
                  </div>
                </Col>
                <Col span={6}>
                  <div style={{padding: 24}}>
                    <div style={{'border-bottom': '1px solid rgb(230, 230, 230)'}}>
                      <span style={{color: 'rgb(92, 184, 92)',float:'right'}}>正常</span>
                      <h4 style={{'margin-bottom': '0 !important',color: 'rgb(64, 64, 64)',fontSize: 15}}>电力舱</h4>
                    </div>
                    <ReactEcharts option={MonitorDashboard}
                                  notMerge={true}
                                  lazyUpdate={true}/>
                  </div>
                </Col>
                <Col span={6}>
                  <div style={{padding: 24}}>
                    <div style={{'border-bottom': '1px solid rgb(230, 230, 230)'}}>
                      <span style={{color: 'rgb(92, 184, 92)',float:'right'}}>正常</span>
                      <h4 style={{'margin-bottom': '0 !important',color: 'rgb(64, 64, 64)',fontSize: 15}}>电力舱</h4>
                    </div>
                    <ReactEcharts option={MonitorDashboard}
                                  notMerge={true}
                                  lazyUpdate={true}/>
                  </div>
                </Col>
              </div>
            </Row>
          </Layout>
        )
    }
}