import echarts from 'echarts/lib/echarts';// 引入 ECharts 主模块
import React, {PureComponent} from 'react';
// 开始↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
//客流总数统计
export var option1 = {
  tooltip: {
    trigger: 'axis'
  },
  color: ['#F5A459'],
  legend: {
    data: ['总客流量'],
    x:'left',
  },
  grid: {
    left: '0%',
    right: '12%',
    bottom: '3%',
    height:'80%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月','8月','9月','10月','11月','12月'],
    axisLine: {    // 轴线
      show: false,

    },
    axisTick: {    // 轴标记
      show: false,
    },
    axisLabel: {
      show: true,
    },
    splitLine: {
      show: false,
    },
    splitArea: {
      show: false,
    }
  },
  yAxis: {
    type: 'value',
    axisLine: {
      lineStyle: {
        color: '#B1B1B1',
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
      name: '总客流量',
      type: 'line',
      smooth: true,
      areaStyle: {normal: {}},
      stack: '总量',
      data: [2445,2234 , 2335, 3445, 3442, 4432, 2334,3321,2211,3344,1223,2232],

    }
  ]
};
// 结束↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑




// 开始↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
//进、出站流量统计
export var option2 = {
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    data:['进站','出站'],
    align:'left',
    x:'left',
    itemHeight :20
  },
  color:['#FFE083','#4CD0E1'],
  grid: {
    left: '0%',
    right: '10%',
    bottom: '3%',
    height:'80%',
    containLabel: true
  },
  xAxis : [
    {
      type : 'category',
      boundaryGap: true,
      axisLine: {    // 轴线
        show: false,
      },
      axisTick: {    // 轴标记
        show: false,
      },
      axisLabel: {
        show: true,
      },
      splitLine: {
        show: false,
      },
      splitArea: {
        show: false,
      },
      data : ['周一','周二','周三','周四','周五','周六','周日']
    }
  ],
  yAxis : [
    {
      type : 'value',
      axisLine: {
        lineStyle: {
          color: '#B1B1B1',
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
  series : [
    {
      name:'进站',
      type: 'line',
      smooth: true,
      stack: '总量',
      areaStyle: {normal: {}},
      data:[350, 132, 501, 534, 490, 430, 410]
    },
    {
      name:'出站',
      type: 'line',
      smooth: true,
      stack: '总量',
      areaStyle: {normal: {}},
      data:[220, 432, 501, 134, 120, 330, 320]
    }
  ]
};
// 结束↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑





// 开始↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
//设备专业统计
export var option3 = {
  tooltip: {
    trigger: 'item',
    formatter: "{a} <br/>{b} : {c} ({d}%)"
  },
  grid: {
    left: '1%',
    right: '50%',
    bottom: '3%',
    height:'80%',
    containLabel: true
  },
  color: ['#A3DE83', '#F2E394', '#F2AE72', '#D96459', '#38817A'],
  legend: {
    orient: 'vertical',
    x: 'left',
    data: ["风阀","排风机","照明","门禁","水泵","控制柜"]
  },
  series: [
    {
      name:"设备专业",
      type:"pie",
      radius:"65%",
      center:["50%","50%"],
      data:[
        {name:"风阀",value:"8"},
        {name:"排风机",value:"5"},
        {name:"照明",value:"2"},
        {name:"门禁",value:"3"},
        {name:"水泵",value:"7"},
        {name:"控制柜",value:"2"}
      ]
    }
  ]

};
// 结束↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑




// 开始↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
var data5 = [96, 80, 100, 90, 85]
var titlename5 = ['设备', '能耗', '安全', '消防', '客流'];
var myColor5 = ['#1089E7', '#1089E7', '#1089E7', '#1089E7', '#1089E7'];
//健康指数
export var option5 = {
  grid:{
    left:'18%',
    top: '10%',
    height: '84%',
    width:'50%',
  },
  xAxis: {
    show: false
  },
  yAxis: [{
    show: true,
    data: titlename5,
    inverse: true,
    axisLine: {
      show: false
    },
    splitLine: {
      show: false
    },
    axisTick: {
      show: false
    },
    axisLabel: {
      color: 'black',
      formatter: function(value, index) {
        return value
      },
      fontSize:15
    },
  }],
  series: [{
    name: '条',
    type: 'bar',
    yAxisIndex: 0,
    data: data5,
    barWidth: 14,
    itemStyle: {
      normal: {
        barBorderRadius: 40,
        color: function(params) {
          var num = myColor5.length;
          return myColor5[params.dataIndex % num]
        },
      }
    },
    label: {
      normal: {
        show: true,
        position: 'inside',
        formatter: '{c}%'
      }
    },
  }]
};
// 结束↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑





// 开始↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
// 水球图
export var option6 = {
  series: [{
    type: 'liquidFill',
    data: [0.89],
    radius: '80%'
  }]
};
// 结束↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑


// 开始↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
//设备产地比例
export var option7 = {
    tooltip: {
      trigger: 'item',
      formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    grid: {
      left: '1%',
      right: '1%',
      bottom: '3%',
      height:'80%',
      containLabel: true
    },
    color: ['#A3DE83', '#F2E394', '#F2AE72', '#D96459', '#38817A'],
    legend: {
      orient: 'vertical',
      x: 'left',
      data: ["上海","法国","加拿大"]
    },
    series: [
      {
        name:"设备产地",
        type:"pie",
        radius:"65%",
        center:["50%","50%"],
        data:[{
          name:"上海",
          value:"22"},
          {name:"法国",value:"2"},
          {name:"加拿大",value:"3"}]
      }
    ]

};

// 结束↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑


// 开始↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
export var option8 = {
  tooltip: {
    trigger: 'axis'
  },
  grid: {
    left: '1%',
    right: '12%',
    bottom: '3%',
    height:'80%',
    containLabel: true
  },
  legend: {
    top: -3,
    x:'left',
    data: ['厂商', '故障数']
  },
  color: ['#4CD0E1', '#F08175'],
  xAxis: [
    {
      axisLabel: {
        interval: '0',
        rotate: 15,
        textStyle: {
          color: '#B1B1B1',
          fontSize: 10,
        },
      },
      axisLine: {
        lineStyle: {
          color: '#48b',
          type: 'solid'
        }
      },
      type: 'category',
      data: ['上海奥的斯电梯', '东芝开利空调销售', '上海华铭智能终端设备', '上海克瑞丰球泵业',
        '上海汇业机械科技', '上海惠普', '上虞邦尼不锈消防设备制造',
        '上海同泰火安科技', '上海海得控制系统股份']
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
// 结束↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
















