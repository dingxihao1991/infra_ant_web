export  var option1 = {
  title : {
    text: '年度收支情况',
  },
  tooltip : {
    trigger: 'axis'
  },
  legend: {
    data:['收入','支出']
  },
  grid: {
    left: '13%',
    right: '14%',
    bottom: '7%',
  },
/*  toolbox: { //切换图标
    show : true,
    feature : {
      dataView : {show: true, readOnly: false},
      magicType : {show: true, type: ['line', 'bar']},
      restore : {show: true},
      saveAsImage : {show: true}
    }
  },*/
  calculable : true,
  xAxis : [
    {
      type : 'category',
      data : ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
    }
  ],
  yAxis : [
    {
      type : 'value'
    }
  ],
  series : [
    {
      name:'收入',
      type:'bar',
      data:[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
      itemStyle:{
        color:'#db5f5f'
      }
    },
    {
      name:'支出',
      type:'bar',
      data:[2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
      itemStyle:{
        color:'#f3be34'
      }
    }
  ]
};

export var option2 = {
    grid: {
      left: '12%',
      right: '14%',
      bottom: '7%',
    },
    tooltip : {
      trigger: 'axis'
    },
    legend: {
      data:['营收']
    },
    xAxis: {
      type: 'category',
      data: ['3月', '6月', '9月', '12月']
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      name:'营收',
      data: [120, 200, 150, 80],
      type: 'bar',
      itemStyle:{
        color:'#f3be34',
      },
      barWidth:'20%'
    }]
}

export  var option3 = {
    grid: {
      left: '10%',
      right: '100%',
      bottom: '7%',
    },
    title: {
      text: '消耗费用统计'
    },
    legend: {
      data: ['人工费', '用电费'],
      x:'right'
    },
    radar: {
      //center: ['45%', '50%'], //圆的位置
      radius:'60%', //圆的大小
      name: {
        textStyle: {
          color: '#fff',
          backgroundColor: '#999',
          borderRadius: 3,
          padding: [3, 5]
        }
      },
      indicator: [
        { name: '1月', max: 1000},
        { name: '2月', max: 1000},
        { name: '3月', max: 1000},
        { name: '4月', max: 1000},
        { name: '5月', max: 1000},
        { name: '6月', max: 1000},
        { name: '7月', max: 1000},
        { name: '8月', max: 1000},
        { name: '9月', max: 1000},
        { name: '10月', max: 1000},
        { name: '11月', max: 1000},
        { name: '12月', max: 1000},
      ]
    },
    series: [{
      name: '人工费 vs 用电费',
      type: 'radar',
      data : [
        {
          value : [222, 333, 122, 244, 355, 233,344,444,211,134,335,275],
          name : '人工费',
          lineStyle: {
            color:'#f3be34'
          },
        },
        {
          value : [422, 233, 322, 444, 555, 633,744,844,911,234,535,575],
          name : '用电费',
          lineStyle: {
            color:'#3eaccc'
          },
        }
      ]
    }]
}