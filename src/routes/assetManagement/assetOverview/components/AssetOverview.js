import React, { PureComponent } from "react";

// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
//引入折线图
import 'echarts/lib/chart/line';
//引入饼图
import 'echarts/lib/chart/pie';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import  'echarts/lib/chart/bar';
//引入列表
import { Avatar, Layout, List } from "antd";
//引入卡片
import { Card } from 'antd';
//引入图标
import { Icon } from 'antd';

import styles from '../style/assetOvervies.less'

function facilityProfession(){
    var Container = document.getElementsByClassName("facilityProfession")[0]
    Container = document.getElementById("facilityProfession")

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

function facilityOrigin(){
    var OriginContainer = document.getElementsByClassName("facilityOrigin")[0]
    var OriginChart = echarts.init(OriginContainer);
    OriginChart.showLoading({
        text: '正在努力的读取数据中...'//loading话术
    });

    var OriginOption = {
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
            data: ["上海", "法国", "加拿大"]
        },
        series: [{
            name: "设备产地",
            type: "pie",
            radius: "65%",
            center: [
                "50%",
                "50%"
            ],
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
            },
            data: [
                {
                    name: "上海",
                    value: "22"
                },
                {
                    name: "法国",
                    value: "2"
                },
                {
                    name: "加拿大",
                    value: "3"
                }
            ]
        }]

    };

    OriginChart.hideLoading();
    OriginChart.setOption(OriginOption);
}

function facilityAlert() {
    var facilityAlert = document.getElementsByClassName('facilityAlert')[0];
    var alertChart = echarts.init(facilityAlert);
    var alertOption = {
        title: {
            text: '25%',
            subtext: '设备故障率',
            x: 'center',
            y: 'center',
            padding: 5,
            itemGap: 5,
            textStyle: {
                fontFamily: '微软雅黑',
                fontSize: 25,
                color: '#000'
            },
            subtextStyle: {
                fontFamily: '微软雅黑',
                fontSize: 12,
                color: '#999'
            }
        },
        grid: {
            top: '0%',
            bottom: '0%'

        },
        series: [
            {
                name: '1',
                type: 'pie',
                color: ['#F44336', 'rgba(0,0,0,0.55)'],
                radius: [85, 100],
                data: [
                    {
                        value: 25,
                        name: '警报',
                        tooltip: {show: false},
                        label: {normal: {show: false}},
                        labelLine: {normal: {show: false}, emphasis: {show: false}},
                    },
                    {
                        value: 65,
                        name: '正常',
                        tooltip: {show: false},
                        label: {normal: {show: false}},
                        labelLine: {normal: {show: false}, emphasis: {show: false}},
                    }
                ]
            }
        ]
    };
    alertChart.setOption(alertOption);

    window.addEventListener("resize", function () {
        alertChart.resize();
    });
}

function facilityChange() {
    var facilityChangeContainer = document.getElementsByClassName('facilityChange')[0];
    var facilityChangeChart = echarts.init(facilityChangeContainer);

    var facilityChangeOption = {
        tooltip: {
            trigger: 'axis'
        },
        color: ['#4CD0E1', '#F08175'],
        legend: {
            data: ['采购数', '报废数']
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
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月'],
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
                name: '采购数',
                type: 'line',
                stack: '总量',
                smooth: true,
                data: [120, 132, 101, 134, 90, 230, 210],
                markPoint: {
                    data: [
                        {type: 'max', name: '最大值'},
                        {type: 'min', name: '最小值'}
                    ]
                },
            },
            {
                name: '报废数',
                type: 'line',
                stack: '总量',
                smooth: true,
                data: [220, 182, 191, 234, 290, 330, 310],
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

function facilitySupplier() {
    var supplierContainer = document.getElementsByClassName('facilitySupplier')[0];

    var supplierChangeChart = echarts.init(supplierContainer);

    var supplierChangeOption = {
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['厂商', '故障数']
        },
        color: ['#4CD0E1', '#F08175'],
        xAxis: [
            {
                axisLabel: {
                    interval: '0',
                    rotate: -18,
                    textStyle: {
                        color: '#B1B1B1',
                        fontSize: 12,
                    }
                },
                axisLine: {
                    lineStyle: {
                        color: '#48b',
                        type: 'solid'
                    }
                },
                type: 'category',
                data: ['上海奥的斯电梯有限公司', '东芝开利空调销售', '上海华铭智能终端设备有限公司', '上海克瑞丰球泵业有限公司',
                    '上海汇业机械科技有限公司', '上海惠普有限公司', '上虞邦尼不锈消防设备制造有限公司',
                    '上海同泰火安科技有限公司', '上海海得控制系统股份有限公司']
            }
        ],

        yAxis: [
            {
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
            {
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
            }

        ],
        series: [
            {
                name: '厂商',
                type: 'bar',
                barWidth: 35,
                data: [70, 232, 120, 135, 162, 260, 70, 232, 120]
            },
            {
                name: '故障数',
                type: 'line',
                smooth: true,
                yAxisIndex: 1,
                data: [2, 3, 5, 3, 5, 2, 2, 2, 2]
            }
        ]
    };

    supplierChangeChart.setOption(supplierChangeOption, true);
    window.addEventListener("resize", function () {
        supplierChangeChart.resize();
    });
}

export default class assetOverview extends PureComponent {


    componentDidMount() {

        facilityProfession();
        facilityOrigin();
        facilityAlert();
        facilityChange();
        facilitySupplier();
    }

    render() {
        return (

            <Layout className={styles.assetOvervies}>
                <div className="bg-white-only">
                    <div className="wrapper-sm">
                        <div className="row">
                            <div className="col-md-4">
                                <div className="panel panel-default">
                                    <div className="wrapper-sm">
                                        <span className="text-base text-muted pull-right" style={{cursor:'pointer'}}>
                                            <i className="fa fa-times m-r-sm "></i>
                                        </span>
                                        <h4 className="m-t-none m-b-none title">设备专业统计</h4>
                                    </div>
                                    <div className="panel-body facilityProfession" id="facilityProfession" style={{width: '100%',height:'330px'}}>

                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="panel panel-default">
                                    <div className="wrapper-sm">
                            <span className="text-base text-muted pull-right" style={{cursor:'pointer'}}>


                                <i className="fa fa-times m-r-sm "></i>
                            </span>
                                        <h4 className="m-t-none m-b-none title">设备产地比例</h4>
                                    </div>
                                    <div className="panel-body facilityOrigin" style={{width:'100%',height:'330px'}}>

                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="panel panel-default">
                                    <div className="wrapper-sm">
                             <span className="text-base text-muted pull-right" style={{cursor:'pointer'}}>


                                 <i className="fa fa-times m-r-sm "></i>
                            </span>
                                        <h4 className="m-t-none m-b-none title">设备故障情况统计</h4>
                                    </div>
                                    <div className="panel-body facilityAlert" style={{width:'100%',height:'330px'}}>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="panel panel-default">
                                    <div className="wrapper-sm">
                            <span className="text-base text-muted pull-right" style={{cursor:'pointer'}}>

                                <i className="fa fa-times m-r-sm "></i>
                            </span>
                                        <h4 className="m-t-none m-b-none title">设备变更情况统计</h4>
                                    </div>
                                    <div className="panel-body FacilityChangeState">
                                        <div className="facilityChange" style={{height: '345px', width: '100%'}}></div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="panel panel-default">
                                    <div className="wrapper-sm">
                              <span className="text-base text-muted pull-right" style={{cursor:'pointer'}}>

                                  <i className="fa fa-times m-r-sm "></i>
                              </span>
                                    <h4 className="m-t-none m-b-none title">设备故障情况统计</h4>
                                    </div>
                                    <div className="panel-body ">
                                        <div className="facilitySupplier" style={{height: '345px', width: '100%'}}></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </Layout>
        );

    }


}

