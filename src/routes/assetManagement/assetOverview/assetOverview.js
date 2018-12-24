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
//引入列表
import { Avatar, Layout, List } from "antd";
//引入卡片
import { Card } from 'antd';
//引入图标
import { Icon } from 'antd';
import styles from "../../auth/organization/organizationManage.less";


//数据
const data = [
  {
    title: '报警信息',
    description: '编号GQ7423HV9照明设备在诸光路发生故障',
  },
  {
    title: '预警信息',
    description: '延安东路隧道排水系统发出预警，点击查看详情',
  },
  {
    title: '报警信息',
    description: '编号SJ7854T9通风设备在松江南站综合管廊发出二级报警信息',
  },
];

//数据2
const data2 = [
  {
    title: '设备运行日志',
    description: '诸光路通信系统B-1设备运行良好—2018/10/11',
  },
  {
    title: '操作日志',
    description: '管廊系统—高新区—高级工程师—完成对照明系统设备巡检',
  },
  {
    title: '操作日志',
    description: '隧道系统—超级管理员—增加新设备AB-156',
  },{
    title: '设备运行日志',
    description: '隧道系统—大连路隧道—完成设备周巡检，巡检结果正常',
  },
  {
    title: '操作日志',
    description: '车站系统—耀华路—操作员—扫描上报BL-197设备异常并上报',
  },
];

export default class assetOverview extends PureComponent {
  componentDidMount() {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('main'));
    var myChart3 = echarts.init(document.getElementById('main3'));
    // 绘制图表
    myChart.setOption({
      title: {
        text: '各月资产设备类型异常图'
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data:['供电系统','照明系统','排水系统','其它','通风系统']
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name:'供电系统',
          type:'line',
          stack: '总量',
          data:[3, 5, 1, 4, 2, 1, 6, 7, 8, 3, 4, 2]
        },
        {
          name:'排水系统',
          type:'line',
          stack: '总量',
          data:[2, 3, 4, 3, 1, 6, 7, 9, 5, 2, 3, 2]
        },
        {
          name:'通风系统',
          type:'line',
          stack: '总量',
          data:[5, 7, 3, 7, 5, 3, 2, 1, 3, 4, 2, 3]
        },
        {
          name:'其它',
          type:'line',
          stack: '总量',
          data:[7, 8, 1, 8, 5, 7, 5, 6, 4, 8, 5, 4]
        },
        {
          name:'照明系统',
          type:'line',
          stack: '总量',
          data:[1, 0, 1, 0, 1, 2, 1, 4, 3, 2, 0, 2]
        }
      ]

    });

    myChart3.setOption({

      title : {
        text: '资产设备类型分布图',
        subtext: '',
        x:'center'
      },
      tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        data: ['供电系统','照明系统','排水系统','其它','通风系统']
      },

      color:['#60acfc', '#32d3eb','#5bc49f','#feb64d','#9287e7'],

      series : [
        {
          name: '访问来源',
          type: 'pie',
          radius : '55%',
          center: ['50%', '60%'],
          data:[
            {value:350, name:'供电系统'},
            {value:200, name:'照明系统'},
            {value:200, name:'排水系统'},
            {value:100, name:'其它'},
            {value:250, name:'通风系统'}

          ],
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]


    });

  }

  render() {
    return (

      <Layout className={styles.application} style={{border:"1px red"}}>
      <div className="row">

        <List className="col-md-3"
          itemLayout="horizontal"
          dataSource={data}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1539235724605&di=9df58aa5e357520015434fa1cb60f2d4&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2Fb03533fa828ba61ecfb8c2074a34970a304e5947.jpg" />}
                title={<a href="https://ant.design">{item.title}</a>}
                description={item.description}
              />
            </List.Item>
          )}
        />

        <div  id="main3" className="col-md-5"   style={{ width: 400, height: 400 }}></div>

        <Card className="col-md-4"
          title="当前待处理任务"
          extra={<a href="#">查看更多</a>}
          style={{ width: 300 }}
        >
          <p><Icon type="double-right"/>              虹梅南路隧道通风管线周检</p>
          <p><Icon type="double-right"/>              诸光路地铁站照明日常运维检修</p>
          <p><Icon type="double-right"/>              松江南站综合综合管廊点检</p>
          <p><Icon type="double-right"/>              大连路隧道周检班前会</p>
          <p><Icon type="double-right"/>              管廊系统高新区宿松路-巢湖路定期巡检</p>
        </Card>

        <List className="col-md-4"
          itemLayout="horizontal"
          dataSource={data2}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1539249546855&di=0c948aa3a485a1f4623d0ef7f22af663&imgtype=0&src=http%3A%2F%2Fimg1.tplm123.com%2F2008%2F04%2F23%2F35734%2F11536049842635.jpg" />}
                title={<a href="https://ant.design">{item.title}</a>}
                description={item.description}
              />
            </List.Item>
          )}
        />

        <div id="main"  className="col-md-8" style={{ width: 400, height: 400 }}></div>

      </div>

      </Layout>
    );

  }


}

