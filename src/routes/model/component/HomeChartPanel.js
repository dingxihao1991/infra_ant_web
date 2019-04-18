/**
 * Created by cheng on 2017/9/1.
 */
import React, {Component} from 'react';
import MonitorPerson from './panel/Person/MonitorPerson';
import MonitorCCTV from './panel/cctv/MonitorCCTV';
import Weather from "./panel/Weather/Weather";
import ReactEcharts from 'echarts-for-react';
import echarts from 'echarts/lib/echarts';// 引入 ECharts 主模块
import 'echarts/lib/chart/line';//引入折线图
import 'echarts/lib/chart/pie';//引入饼图
import 'echarts/lib/chart/bar';
import 'echarts/lib/chart/radar';
import 'echarts/lib/component/tooltip';// 鼠标移上去效果
import 'echarts/lib/component/title';// 引入提示框和标题组件
import 'echarts/lib/component/legend'; // 标记
import 'echarts-liquidfill/src/liquidFill';
//import {MonitorVentilation} from './Ventilation/MonitorVentilation';
//import {MonitorPassenger} from './Passenger/MonitorPassenger';
//import {MonitorDashboard} from './Dashboard/MonitorDashboard';


export default class HomeChartPanel extends Component {

    constructor(props) {
        super(props);
    }

    state = {
        inPerson: null,
        outPerson: null,
        intoPersonMessage: null,
        outPersonMessage: null
    }

  componentDidMount = () => {
    this.wd();
    this.sd();
    this.in();
    this.out();
  }

    render() {
        const {inPerson, outPerson, intoPersonMessage, outPersonMessage} = this.state;
        return (
            <div style={PanelStyle} className='show-active'>
                <div style={{display: 'flex'}}>
                    <div style={MonitorStyle}>
                        <div
                            style={{display: 'flex', height: '30px', flexWrap: 'wrap', float: 'right', width: '900px'}}>
                            <div>
                                <Weather></Weather>
                            </div>
                            <div>
                                <MonitorPerson></MonitorPerson>
                            </div>
                            <div>
                                <MonitorCCTV></MonitorCCTV>
                            </div>
                        </div>
                        <div style={{display: 'flex',float: 'right', width: '900px'}}>
                            <div className="col-md-3 col-xs-6 no-padder">
                                <div style={{fontSize:'14px',color: '#ffc107',float: 'left'}}>
                                    <div style={{paddingTop: 10}}>
                                        湿度
                                    </div>
                                    <div style={{marginTop: 4}}>
                                        <span id="sddata"></span>
                                        <span>%RH</span>
                                    </div>
                                </div>
                                <div style={{float:'left'}}>
                                    <div name="SD" style={{height: '70px', width: '100%'}}></div>
                                </div>
                            </div>
                            <div className="col-md-3 col-xs-6 no-padder">
                                <div style={{fontSize:'14px',color: '#ffdcc9',float: 'left'}}>
                                    <div style={{paddingTop: 10}}>
                                        温度
                                    </div>
                                    <div style={{marginTop: 4}}>
                                        <span id="wddata"></span>
                                        <span>℃</span>
                                    </div>
                                </div>
                                <div style={{float:'left'}}>
                                    <div name="WD" style={{height: '70px', width: '100%'}}>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3 col-xs-6 no-padder">
                                <div style={{fontSize:'14px',color: '#c3eaff',float: 'left'}}>
                                    <div style={{paddingTop: 10}}>
                                        氧气
                                    </div>
                                    <div style={{marginTop: 4}}>
                                        <span id="outdata"></span>
                                        <span>g/mol</span>
                                    </div>
                                </div>
                                <div style={{float:'left'}}>
                                    <div name="OUT" style={{height: '70px', width: '100%'}}>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3 col-xs-6 no-padder">
                                <div style={{fontSize:'14px',color: '#b7ff98',float: 'left'}}>
                                    <div style={{paddingTop: 10}}>
                                        甲烷
                                    </div>
                                    <div style={{marginTop: 4}}>
                                        <span id="indata"></span>
                                        <span>g/mol</span>
                                    </div>
                                </div>
                                <div style={{float:'left'}}>
                                    <div name="IN" style={{height: '70px', width: '100%'}}>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    wd(){
        let containwd = document.getElementsByName('WD')[0];
        let myChartwd = echarts.init(containwd);
        let optionwd = {
            color: ['#ffdcc9', '#ffdcc9'],
            grid: [
                {left: '1', right: '2', top: '5', bottom: '5'},

            ],
            xAxis: [
                {
                    type: 'category',
                    boundaryGap: true,
                    axisLine: {    // 轴线
                        show: false,

                    },
                    axisTick: {    // 轴标记
                        show: false,

                    },
                    axisLabel: {
                        show: false,

                    },
                    splitLine: {
                        show: false,

                    },
                    splitArea: {
                        show: false,
                    },
                    data: (function () {
                        var now = new Date();
                        var res = [];
                        var len = 10;
                        while (len--) {
                            res.unshift(now.toLocaleTimeString().replace(/^\D*/, ''));
                            now = new Date(now - 2000);
                        }
                        return res;
                    })()
                },
                {
                    type: 'category',
                    boundaryGap: true,
                    axisLine: {    // 轴线
                        show: false,

                    },
                    axisTick: {    // 轴标记
                        show: false,

                    },
                    axisLabel: {
                        show: false,

                    },
                    splitLine: {
                        show: false,

                    },
                    splitArea: {
                        show: false,
                    },
                    data: (function () {
                        var res = [];
                        var len = 10;
                        while (len--) {
                            res.push(len + 1);
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
                    min: 1,
                    boundaryGap: [0.2, 0.2],
                    axisLine: {    // 轴线
                        show: false,

                    },
                    axisTick: {    // 轴标记
                        show: false,

                    },
                    axisLabel: {
                        show: false,

                    },
                    splitLine: {
                        show: false,

                    },
                    splitArea: {
                        show: false,
                    },
                },
                {
                    type: 'value',
                    scale: true,
                    name: '预购量',
                    min: 1,
                    boundaryGap: [0.2, 0.2],
                    axisLine: {    // 轴线
                        show: false,

                    },
                    axisTick: {    // 轴标记
                        show: false,

                    },
                    axisLabel: {
                        show: false,

                    },
                    splitLine: {
                        show: false,

                    },
                    splitArea: {
                        show: false,
                    },
                }
            ],
            series: [
                {
                    name: 'PM10',
                    type: 'line',
                    xAxisIndex: 1,
                    yAxisIndex: 1,
                    data: (function () {
                        var res = [];
                        var len = 10;
                        while (len--) {
                            res.push(Math.round(Math.random() * 10));
                        }
                        return res;
                    })(),
                    markPoint: {
                        symbol: 'circle',
                        symbolSize: function (v) {
                            return 20
                        },
                        itemStyle: {
                            normal: {
                                label: {
                                    textStyle: {
                                        color: '#fff',
                                        fontSize: 10
                                    }
                                }
                            },

                        },
                        data: [
                            {xAxis: 9, yAxis: null}
                        ]
                    }
                }

            ]
        };
        let count = 11;
        setInterval(function () {
            var axisData = (new Date()).toLocaleTimeString().replace(/^\D*/, '');

            var data0 = optionwd.series[0].data;

            data0.shift();
            data0.push(Math.round(Math.random() * 10));

            document.getElementById("wddata").innerText = data0.slice(9, 10);
            optionwd.series[0].markPoint.data[0].yAxis = data0.slice(9, 10);

            optionwd.xAxis[0].data.shift();
            optionwd.xAxis[0].data.push(axisData);

            optionwd.xAxis[1].data.shift();
            optionwd.xAxis[1].data.push(count++);

            myChartwd.setOption(optionwd);
        }, 2100);

    }
    sd(){
        let containsd = document.getElementsByName('SD')[0];
        let myChartsd = echarts.init(containsd);
        let optionsd = {
            color: ['#FFC107', '#00AEFF'],
            grid: [
                {left: '1', right: '2', top: '5', bottom: '5'},

            ],
            xAxis: [
                {
                    type: 'category',
                    boundaryGap: true,
                    axisLine: {    // 轴线
                        show: false,

                    },
                    axisTick: {    // 轴标记
                        show: false,

                    },
                    axisLabel: {
                        show: false,

                    },
                    splitLine: {
                        show: false,

                    },
                    splitArea: {
                        show: false,
                    },
                    data: (function () {
                        var now = new Date();
                        var res = [];
                        var len = 10;
                        while (len--) {
                            res.unshift(now.toLocaleTimeString().replace(/^\D*/, ''));
                            now = new Date(now - 2000);
                        }
                        return res;
                    })()
                },
                {
                    type: 'category',
                    boundaryGap: true,
                    axisLine: {    // 轴线
                        show: false,

                    },
                    axisTick: {    // 轴标记
                        show: false,

                    },
                    axisLabel: {
                        show: false,

                    },
                    splitLine: {
                        show: false,

                    },
                    splitArea: {
                        show: false,
                    },
                    data: (function () {
                        var res = [];
                        var len = 10;
                        while (len--) {
                            res.push(len + 1);
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
                    min: 1,
                    boundaryGap: [0.2, 0.2],
                    axisLine: {    // 轴线
                        show: false,

                    },
                    axisTick: {    // 轴标记
                        show: false,

                    },
                    axisLabel: {
                        show: false,

                    },
                    splitLine: {
                        show: false,

                    },
                    splitArea: {
                        show: false,
                    },
                },
                {
                    type: 'value',
                    scale: true,
                    name: '预购量',
                    min: 1,
                    boundaryGap: [0.2, 0.2],
                    axisLine: {    // 轴线
                        show: false,

                    },
                    axisTick: {    // 轴标记
                        show: false,

                    },
                    axisLabel: {
                        show: false,

                    },
                    splitLine: {
                        show: false,

                    },
                    splitArea: {
                        show: false,
                    },
                }
            ],
            series: [
                {
                    name: 'PM10',
                    type: 'line',
                    xAxisIndex: 1,
                    yAxisIndex: 1,
                    data: (function () {
                        var res = [];
                        var len = 10;
                        while (len--) {
                            res.push(Math.round(Math.random() * 10));
                        }
                        return res;
                    })(),
                    markPoint: {
                        symbol: 'circle',
                        symbolSize: function (v) {
                            return 20
                        },
                        itemStyle: {
                            normal: {
                                label: {
                                    textStyle: {
                                        color: '#fff',
                                        fontSize: 10
                                    }
                                }
                            },

                        },
                        data: [
                            {xAxis: 9, yAxis: null}
                        ]
                    }
                }

            ]
        };
        let count = 11;
        setInterval(function () {
            var axisData = (new Date()).toLocaleTimeString().replace(/^\D*/, '');

            var data0 = optionsd.series[0].data;

            data0.shift();
            data0.push(Math.round(Math.random() * 10));

            document.getElementById("sddata").innerText = data0.slice(9, 10);
            optionsd.series[0].markPoint.data[0].yAxis = data0.slice(9, 10);
            optionsd.xAxis[0].data.shift();
            optionsd.xAxis[0].data.push(axisData);
            optionsd.xAxis[1].data.shift();
            optionsd.xAxis[1].data.push(count++);
            myChartsd.setOption(optionsd);
        }, 2100);

    }
    in(){
        let containin = document.getElementsByName('IN')[0];
        let myChartin = echarts.init(containin);
        let optionin = {
            color: ['#b7ff98', '#b7ff98'],
            grid: [
                {left: '1', right: '2', top: '5', bottom: '5'},

            ],
            xAxis: [
                {
                    type: 'category',
                    boundaryGap: true,
                    axisLine: {    // 轴线
                        show: false,

                    },
                    axisTick: {    // 轴标记
                        show: false,

                    },
                    axisLabel: {
                        show: false,

                    },
                    splitLine: {
                        show: false,

                    },
                    splitArea: {
                        show: false,
                    },
                    data: (function () {
                        var now = new Date();
                        var res = [];
                        var len = 10;
                        while (len--) {
                            res.unshift(now.toLocaleTimeString().replace(/^\D*/, ''));
                            now = new Date(now - 2000);
                        }
                        return res;
                    })()
                },
                {
                    type: 'category',
                    boundaryGap: true,
                    axisLine: {    // 轴线
                        show: false,

                    },
                    axisTick: {    // 轴标记
                        show: false,

                    },
                    axisLabel: {
                        show: false,

                    },
                    splitLine: {
                        show: false,

                    },
                    splitArea: {
                        show: false,
                    },
                    data: (function () {
                        var res = [];
                        var len = 10;
                        while (len--) {
                            res.push(len + 1);
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
                    min: 1,
                    boundaryGap: [0.2, 0.2],
                    axisLine: {    // 轴线
                        show: false,

                    },
                    axisTick: {    // 轴标记
                        show: false,

                    },
                    axisLabel: {
                        show: false,

                    },
                    splitLine: {
                        show: false,

                    },
                    splitArea: {
                        show: false,
                    },
                },
                {
                    type: 'value',
                    scale: true,
                    name: '预购量',
                    min: 1,
                    boundaryGap: [0.2, 0.2],
                    axisLine: {    // 轴线
                        show: false,

                    },
                    axisTick: {    // 轴标记
                        show: false,

                    },
                    axisLabel: {
                        show: false,

                    },
                    splitLine: {
                        show: false,

                    },
                    splitArea: {
                        show: false,
                    },
                }
            ],
            series: [
                {
                    name: 'PM10',
                    type: 'line',
                    xAxisIndex: 1,
                    yAxisIndex: 1,
                    data: (function () {
                        var res = [];
                        var len = 10;
                        while (len--) {
                            res.push(Math.round(Math.random() * 10));
                        }
                        return res;
                    })(),
                    markPoint: {
                        symbol: 'circle',
                        symbolSize: function (v) {
                            return 20
                        },
                        itemStyle: {
                            normal: {
                                label: {
                                    textStyle: {
                                        color: '#fff',
                                        fontSize: 10
                                    }
                                }
                            },

                        },
                        data: [
                            {xAxis: 9, yAxis: null}
                        ]
                    }
                }

            ]
        };
        let count = 11;
        setInterval(function () {
            var axisData = (new Date()).toLocaleTimeString().replace(/^\D*/, '');

            var data0 = optionin.series[0].data;

            data0.shift();
            data0.push(Math.round(Math.random() * 10));

            document.getElementById("indata").innerText = data0.slice(9, 10);
            optionin.series[0].markPoint.data[0].yAxis = data0.slice(9, 10);

            optionin.xAxis[0].data.shift();
            optionin.xAxis[0].data.push(axisData);

            optionin.xAxis[1].data.shift();
            optionin.xAxis[1].data.push(count++);

            myChartin.setOption(optionin);
        }, 2100);

    }
    out(){
        let containout = document.getElementsByName('OUT')[0];
        let myChartout = echarts.init(containout);
        let optionout = {
            color: ['#c3eaff', '#c3eaff'],
            grid: [
                {left: '1', right: '2', top: '5', bottom: '5'},

            ],
            xAxis: [
                {
                    type: 'category',
                    boundaryGap: true,
                    axisLine: {    // 轴线
                        show: false,

                    },
                    axisTick: {    // 轴标记
                        show: false,

                    },
                    axisLabel: {
                        show: false,

                    },
                    splitLine: {
                        show: false,

                    },
                    splitArea: {
                        show: false,
                    },
                    data: (function () {
                        var now = new Date();
                        var res = [];
                        var len = 10;
                        while (len--) {
                            res.unshift(now.toLocaleTimeString().replace(/^\D*/, ''));
                            now = new Date(now - 2000);
                        }
                        return res;
                    })()
                },
                {
                    type: 'category',
                    boundaryGap: true,
                    axisLine: {    // 轴线
                        show: false,

                    },
                    axisTick: {    // 轴标记
                        show: false,

                    },
                    axisLabel: {
                        show: false,

                    },
                    splitLine: {
                        show: false,

                    },
                    splitArea: {
                        show: false,
                    },
                    data: (function () {
                        var res = [];
                        var len = 10;
                        while (len--) {
                            res.push(len + 1);
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
                    min: 1,
                    boundaryGap: [0.2, 0.2],
                    axisLine: {    // 轴线
                        show: false,

                    },
                    axisTick: {    // 轴标记
                        show: false,

                    },
                    axisLabel: {
                        show: false,

                    },
                    splitLine: {
                        show: false,

                    },
                    splitArea: {
                        show: false,
                    },
                },
                {
                    type: 'value',
                    scale: true,
                    name: '预购量',
                    min: 1,
                    boundaryGap: [0.2, 0.2],
                    axisLine: {    // 轴线
                        show: false,

                    },
                    axisTick: {    // 轴标记
                        show: false,

                    },
                    axisLabel: {
                        show: false,

                    },
                    splitLine: {
                        show: false,

                    },
                    splitArea: {
                        show: false,
                    },
                }
            ],
            series: [
                {
                    name: 'PM10',
                    type: 'line',
                    xAxisIndex: 1,
                    yAxisIndex: 1,
                    data: (function () {
                        var res = [];
                        var len = 10;
                        while (len--) {
                            res.push(Math.round(Math.random() * 10));
                        }
                        return res;
                    })(),
                    markPoint: {
                        symbol: 'circle',
                        symbolSize: function (v) {
                            return 20
                        },
                        itemStyle: {
                            normal: {
                                label: {
                                    textStyle: {
                                        color: '#fff',
                                        fontSize: 10
                                    }
                                }
                            },

                        },
                        data: [
                            {xAxis: 9, yAxis: null}
                        ]
                    }
                }

            ]
        };
        let count = 11;
        setInterval(function () {
            var axisData = (new Date()).toLocaleTimeString().replace(/^\D*/, '');

            var data0 = optionout.series[0].data;

            data0.shift();
            data0.push(Math.round(Math.random() * 10));

            document.getElementById("outdata").innerText = data0.slice(9, 10);
            optionout.series[0].markPoint.data[0].yAxis = data0.slice(9, 10);

            optionout.xAxis[0].data.shift();
            optionout.xAxis[0].data.push(axisData);

            optionout.xAxis[1].data.shift();
            optionout.xAxis[1].data.push(count++);

            myChartout.setOption(optionout);
        }, 2100);

    }
}

const GaugeStyle = {
    width: '270px',
    height: '200px',
    marginTop: '39px',
    position: 'absolute'

}

const PanelStyle = {
    bottom: '1px',
    position: 'fixed',
    zIndex: '22',

}

const MonitorStyle = {
    background: 'rgba(0, 0, 0, 0.65)',
    height: '100px',
    marginTop: '161px',
    width: '920px',
    borderRadius: '10px',
    marginLeft: '50%'
}

const intoPerson = {
    fontSize: '10pt',
    color: '#0EEBC1',
    display: 'flex'
}

const exitPerson = {
    fontSize: '10pt',
    color: '#00AEFF',
    display: 'flex'
}

