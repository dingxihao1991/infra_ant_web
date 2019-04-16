/**
 * Created by cheng on 2017/9/1.
 */
import React, {Component} from 'react';
//import MonitorPerson from './Person/MonitorPerson';
import MonitorCCTV from './panel/cctv/MonitorCCTV';

import ReactEcharts from 'echarts-for-react';

import {MonitorVentilation} from './Ventilation/MonitorVentilation';
import {MonitorPassenger} from './Passenger/MonitorPassenger';
import {MonitorDashboard} from './Dashboard/MonitorDashboard';
import Weather from "./Weather/Weather";

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



    render() {
        const {inPerson, outPerson, intoPersonMessage, outPersonMessage} = this.state;
        return (
            <div style={PanelStyle} className={this.props.showChart == true ? 'show-active' : 'hide-active'}>
                <div style={{display: 'flex'}}>
                    <div style={MonitorStyle}>
                        <div
                            style={{display: 'flex', height: '30px', flexWrap: 'wrap', float: 'right', width: '900px'}}>
                            <div>
                                {/*<Weather></Weather>*/}
                            </div>
                            <div>
                                {/*<MonitorPerson></MonitorPerson>*/}
                            </div>
                            <div>
                                {/*<MonitorCCTV></MonitorCCTV>*/}
                            </div>
                        </div>
                        <div style={{display: 'flex',float: 'right', width: '900px'}}>
                            <div className="col-md-3 col-xs-6 no-padder">
                                <div className="col-md-5" style={{fontSize:'14px',color: '#ffc107'}}>
                                    <div className="m-b-sm  m-t">
                                        湿度
                                    </div>
                                    <div className="m-b-sm  m-t-xs"><span id="sddata"></span>
                                        <span>%RH</span>
                                    </div>
                                </div>
                                <div className="col-md-7 no-padder">
                                    <div name="SD" style={{height: '70px', width: '100%'}}>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3 col-xs-6 no-padder">
                                <div className="col-md-5" style={{fontSize:'14px',color: '#ffdcc9'}}>
                                    <div className="m-b-sm  m-t">
                                        温度
                                    </div>
                                    <div className="m-b-sm  m-t-xs"><span id="wddata"></span>
                                        <span>℃</span>
                                    </div>
                                </div>
                                <div className="col-md-7 no-padder">
                                    <div name="WD" style={{height: '70px', width: '100%'}}>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3 col-xs-6 no-padder">
                                <div className="col-md-5" style={{fontSize:'14px',color: '#c3eaff'}}>
                                    <div className="m-b-sm  m-t">
                                        氧气
                                    </div>
                                    <div className="m-b-sm  m-t-xs"><span id="outdata"></span>
                                        <span>g/mol</span>
                                    </div>
                                </div>
                                <div className="col-md-7 no-padder">
                                    <div name="OUT" style={{height: '70px', width: '100%'}}>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3 col-xs-6 no-padder">
                                <div className="col-md-5" style={{fontSize:'14px',color: '#b7ff98'}}>
                                    <div className="m-b-sm  m-t">
                                        甲烷
                                    </div>
                                    <div className="m-b-sm  m-t-xs"><span id="indata"></span>
                                        <span>g/mol</span>
                                    </div>
                                </div>
                                <div className="col-md-7 no-padder">
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

    componentDidMount = () => {
        this.wd();
        this.sd();
        this.in();
        this.out();

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

            $('#wddata').text(data0.slice(9, 10));
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

            $('#sddata').text(data0.slice(9, 10));
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

            $('#indata').text(data0.slice(9, 10));
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

            $('#outdata').text(data0.slice(9, 10));
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
    borderRadius: '10px'

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

