import echarts from 'echarts/lib/echarts';// 引入 ECharts 主模块
import React, {PureComponent} from 'react';
// 开始↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
//客流总数统计
export var option11 = {
  tooltip: {
    trigger: 'axis'
  },
  color: ['#F5A459'],
  legend: {
    data: ['总车流量'],
    x:'left',
  },
/*  grid: {
    left: '10%',
    right: '14%',
    bottom: '10%',
  },*/
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
    axisLine: { //坐标轴轴线相关设置
      show: false,
      lineStyle: {
        color: '#B1B1B1',
        type: 'solid'
      }
    },
    axisLabel: { //坐标轴刻度标签的相关设置
      show:false,
      textStyle: {
        color: '#B1B1B1',
      }
    },
    splitLine:{ //坐标轴在 grid 区域中的分隔线。
      show:false
    },
    axisTick:{
      show:false
    }
  },
  series: [
    {
      name: '总车流量',
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
//设备专业统计
export var option13 = {
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
//设备产地比例
export var option17 = {
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
export var option18 = {
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

// 开始↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
export var EquipmentFailureOption = {
  tooltip: {
    trigger: 'item',
    formatter: "{a} <br/>{b}: {c} ({d}%)"
  },
  color: ['#FFCC00', '#99CCCC', '#996600', '#0066CC', '#FF9900', '#663300', '#999999', '#5cb85c', '#d9534f'],
  legend: {
    x: 'right',
    orient: 'vertical',
    data: ['供电', '环境', '通风', '排水', '照明', '门禁', 'CCTV', '健康', '故障'],
    selected: {}
  },
  series: [
    {
      name: '设备故障',
      type: 'pie',
      selectedMode: 'single',
      radius: [0, '68%'],
      center: ['40%', '45%'],
      label: {
        normal: {
          position: 'inner'
        }
      },
      labelLine: {
        normal: {
          show: false
        }
      },
      data: [
        {value: 0, name: '供电'},
        {value: 0, name: '环境'},
        {value: 0, name: '通风'},
        {value: 2, name: '排水'},
        {value: 1, name: '照明'},
        {value: 0, name: '门禁'},
        {value: 0, name: 'CCTV'},
      ]
    },
    {
      name: '设备故障占比',
      type: 'pie',
      radius: ['70%', '80%'],
      center: ['40%', '45%'],
      label: {
        show: false
      },
      data: [
        {value: 62, name: '健康'},
        {value: 3, name: '故障'}
      ]
    }
  ]
};
// 结束↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑

// 开始↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
export  var pipeTypeMonitorOption = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {            // 坐标轴指示器，坐标轴触发有效
      type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
    },
    formatter: function (params) {
      var result = '';
      params.forEach(function (item) {
        result += item.name + "<br />" + item.marker + " " + item.value + "条";
      });
      return result;
    }
  },
  // title: {
  //     text: '全市计划完成情况',
  // },
  grid: {
    top: '5%',
    left: '1%',
    right: '1%',
    bottom: '5%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    data: ['电力', '给水', '通讯', '中水', '热力', '燃气']
  },
  yAxis: {
    type: 'value',
    max: 5
  },
  series: [{
    data: [9,2,5,6,11,3],
    type: 'bar',
    barWidth: '70%',
    itemStyle: {
      //通常情况下：
      normal: {
        //每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
        color: function (params) {
          var colorList = [
            '#FFCC00',
            '#0099FF',
            '#006666',
            '#00CCCC',
            '#993300',
            '#CC6600'
          ];
          return colorList[params.dataIndex];
        }
      },
      //鼠标悬停时：
      emphasis: {
        shadowBlur: 10,
        shadowOffsetX: 0,
        shadowColor: 'rgba(0, 0, 0, 0.5)'
      }
    }
  }]
};
// 结束↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑

// 开始↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
var date = [];
var oneDay = 24 * 3600 * 1000;
var today = new Date();
var baseDate = new Date(today.setDate(today.getDate() - 30));
var base = +new Date(baseDate.getFullYear(), baseDate.getMonth(), baseDate.getDate());
for (var i = 1; i < 31; i++) {
  var now = new Date(base += oneDay);
  date.push([now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'));
}
export var lineDashboard = {
  tooltip: {
    trigger: 'axis',
    position: function (pt) {
      return [pt[0], '10%'];
    }
  },
  grid: {
    top: '2%',
    left: '1%',
    right: '10%',
    bottom: '6%',
    containLabel: true
  },
  legend: {
    x: 'right',
    orient: 'vertical',
    data: ['电力', '暴雨', '通讯', '消防', '燃气', "其它"]
  },
  color: ['#FFCC00', '#0099FF', '#006666', '#00CCCC', '#993300', '#CC6600'],
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: date
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      name: '电力',
      type: 'bar',
      stack: '总量',
      data: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    },
    {
      name: '暴雨',
      type: 'bar',
      stack: '总量',
      data: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0.5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    },
    {
      name: '通讯',
      type: 'bar',
      stack: '总量',
      data: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    },
    {
      name: '消防',
      type: 'bar',
      stack: '总量',
      data: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    },
    {
      name: '燃气',
      type: 'bar',
      stack: '总量',
      data: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0]
    },
    {
      name: '其它',
      type: 'bar',
      stack: '总量',
      data: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2]
    }
  ]
};
// 结束↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑



// 开始↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
// 结束↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑

// 开始↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
// 结束↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑

// 开始↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
// 结束↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑

// 开始↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
// 结束↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑

// 开始↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
// 结束↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑

// 开始↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
// 结束↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑












