import React, {PureComponent} from 'react';
import { Table, Switch, Button, Layout, Tabs, List, Icon ,Spin,message } from "antd";
import MonitoringType from './monitoringType';
const { Content} = Layout;
import styles from './monitoringType.less';
import CCTVPlay from "./CCTVPlay";
import PropTypes from "prop-types";


const data = [
    {
        division:"高新区",
        storeType:"燃气舱",
        monitorIndex:"沉降",
        equipName:"感烟探测器",
        address:"高新区彩虹路",
        monitorValue:"20",
        equipStatus:"正常",
        monitorTime:"2018-01-01 20:00:32",
        monitorType:"烟雾浓度_环境监测",
        history_value: [21,24,20,25],

    },
    {
        division:"高新区",
        storeType:"燃气舱",
        monitorIndex:"沉降",
        equipName:"彩虹路温度传感器",
        address:"高新区彩虹路",
        monitorValue:"29",
        equipStatus:"故障",
        monitorTime:"2018-01-01 20:00:32",
        monitorType:"温湿度传感器_环境监测",
        history_value: [29,30,20,25],
    },
    {
        division:"高新区",
        storeType:"燃气舱",
        monitorIndex:"沉降",
        equipName:"超声波液位计",
        address:"高新区彩虹路",
        monitorValue:"29",
        equipStatus:"正常",
        monitorTime:"2018-01-01 20:00:32",
        monitorType:"液位高度_环境监测",
        history_value: [29,30,20,25],
    },
    {
        division:"高新区",
        storeType:"燃气舱",
        monitorIndex:"沉降",
        equipName:"沟内甲烷气体传感器",
        address:"高新区彩虹路",
        monitorValue:"29",
        equipStatus:"正常",
        monitorTime:"2018-01-01 20:00:32",
        monitorType:"气体浓度_环境监测",
        history_value: [21,26,20,25],
    },
    {
        division:"高新区",
        storeType:"燃气舱",
        monitorIndex:"沉降",
        equipName:"可燃气体探测器",
        address:"高新区彩虹路",
        monitorValue:"29",
        equipStatus:"正常",
        monitorTime:"2018-01-01 20:00:32",
        monitorType:"气体浓度_环境监测",
        history_value: [10,25,20,22],
    },{
        division:"高新区",
        storeType:"燃气舱",
        monitorIndex:"电压",
        equipName:"区间照明总箱ZQBM1",
        address:"高新区习友路",
        monitorValue:"220",
        equipStatus:"正常",
        monitorTime:"2018-01-01 20:00:32",
        monitorType:"电气系统_设备监测",
        history_value: [220,210,230,220],
    },{
        division:"蜀山区",
        storeType:"燃气舱",
        monitorIndex:"电压",
        equipName:"电动组合风阀",
        address:"高新区彩虹路",
        monitorValue:"220",
        equipStatus:"关",
        monitorTime:"2018-01-01 20:00:32",
        monitorType:"通风系统_设备监测",
        history_value: [220,320,210,220],
    },{
        division:"蜀山区",
        storeType:"燃气舱",
        monitorIndex:"电压",
        equipName:"火灾报警（联动）控制器",
        address:"高新区彩虹路",
        monitorValue:"220",
        equipStatus:"断电",
        monitorTime:"2018-01-01 20:00:32",
        monitorType:"消防系统_设备监测",
        history_value: [210,230,320,230],
    },{
        division:"蜀山区",
        storeType:"燃气舱",
        monitorIndex:"电压",
        equipName:"45kv主变电所",
        address:"高新区彩虹路",
        monitorValue:"220",
        equipStatus:"正常",
        monitorTime:"2018-01-01 20:00:32",
        monitorType:"电力系统_设备监测",
        history_value: [210,240,200,220],
    }
];

const deviceList = [
    {
        'id':1,
        'device_name':'彩虹西路(测试1)',
        'type':'枪机',
        'state':'在线',
        'channel':0,
        'videoSource':0,
        'address':'1号区域楼梯转角',
        'up_date':'2017-05-16 10:51:30',
        'sys_date':'2017-05-14 09:51:30',
        'device_paly_url':'http://114.215.175.1:90/live/31000000002000000000/31000000001320000003/0_2/a.m3u8'
    },
    {
        'id':2,
        'device_name':'彩虹西路(测试2)',
        'type':'球机',
        'state':'在线',
        'channel':0,
        'videoSource':0,
        'address':'1号区域楼梯转角',
        'up_date':'2017-05-16 10:51:30',
        'sys_date':'2017-05-14 09:51:30',
        'device_paly_url':'http://114.215.175.1:90/live/31000000002000000000/31000000001320000003/0_2/a.m3u8'
    },
    {
        'id':3,
        'device_name':'彩虹西路(测试3)',
        'type':'枪机',
        'state':'在线',
        'channel':0,
        'videoSource':0,
        'address':'1号区域楼梯转角',
        'up_date':'2017-05-16 10:51:30',
        'sys_date':'2017-05-14 09:51:30',
        'device_paly_url':'http://114.215.175.1:90/live/31000000002000000000/31000000001320000003/0_2/a.m3u8'
    },
    {
        'id':4,
        'device_name':'彩虹西路(测试5)',
        'type':'球机',
        'state':'在线',
        'channel':0,
        'videoSource':0,
        'address':'1号区域楼梯转角',
        'up_date':'2017-05-16 10:51:30',
        'sys_date':'2017-05-14 09:51:30',
        'device_paly_url':'http://114.215.175.1:90/live/31000000002000000000/31000000001320000003/0_2/a.m3u8'
    },
    {
        'id':6,
        'device_name':'小马路(测试6)',
        'type':'枪机',
        'state':'在线',
        'channel':0,
        'videoSource':0,
        'address':'1号区域楼梯转角',
        'up_date':'2017-05-16 10:51:30',
        'sys_date':'2017-05-14 09:51:30',
        'device_paly_url':'http://114.215.175.1:90/live/31000000002000000000/31000000001320000003/0_2/a.m3u8'
    },
    {
        'id':7,
        'device_name':'明珠大道(测试7)',
        'type':'枪机',
        'state':'在线',
        'channel':0,
        'videoSource':0,
        'address':'1号区域楼梯转角',
        'up_date':'2017-05-16 10:51:30',
        'sys_date':'2017-05-14 09:51:30',
        'device_paly_url':'http://114.215.175.1:90/live/31000000002000000000/31000000001320000003/0_2/a.m3u8'
    },
    {
        'id':8,
        'device_name':'明珠大道(测试8)',
        'type':'枪机',
        'state':'在线',
        'channel':0,
        'videoSource':0,
        'address':'1号区域楼梯转角',
        'up_date':'2017-05-16 10:51:30',
        'sys_date':'2017-05-14 09:51:30',
        'device_paly_url':'http://114.215.175.1:90/live/31000000002000000000/31000000001320000003/0_2/a.m3u8'
    },
    {
        'id':9,
        'device_name':'明珠大道(测试9)',
        'type':'枪机',
        'state':'在线',
        'channel':0,
        'videoSource':0,
        'address':'1号区域楼梯转角',
        'up_date':'2017-05-16 10:51:30',
        'sys_date':'2017-05-14 09:51:30',
        'device_paly_url':'http://114.215.175.1:90/live/31000000002000000000/31000000001320000003/0_2/a.m3u8'
    },
    {
        'id':10,
        'device_name':'明珠大道(测试10)',
        'type':'枪机',
        'state':'在线',
        'channel':0,
        'videoSource':0,
        'address':'1号区域楼梯转角',
        'up_date':'2017-05-16 10:51:30',
        'sys_date':'2017-05-14 09:51:30',
        'device_paly_url':'http://114.215.175.1:90/live/31000000002000000000/31000000001320000003/0_2/a.m3u8'
    },
    {
        'id':11,
        'device_name':'明珠大道(测试11)',
        'type':'枪机',
        'state':'在线',
        'channel':0,
        'videoSource':0,
        'address':'1号区域楼梯转角',
        'up_date':'2017-05-16 10:51:30',
        'sys_date':'2017-05-14 09:51:30',
        'device_paly_url':'http://114.215.175.1:90/live/31000000002000000000/31000000001320000003/0_2/a.m3u8'
    },

    {
        'id':12,
        'device_name':'将军岭北路(测试12)',
        'type':'枪机',
        'state':'在线',
        'channel':0,
        'videoSource':0,
        'address':'1号区域楼梯转角',
        'up_date':'2017-05-16 10:51:30',
        'sys_date':'2017-05-14 09:51:30',
        'device_paly_url':'http://114.215.175.1:90/live/31000000002000000000/31000000001320000003/0_2/a.m3u8'
    },

    {
        'id':13,
        'device_name':'将军岭北路(测试13)',
        'type':'枪机',
        'state':'在线',
        'channel':0,
        'videoSource':0,
        'address':'1号区域楼梯转角',
        'up_date':'2017-05-16 10:51:30',
        'sys_date':'2017-05-14 09:51:30',
        'device_paly_url':'http://114.215.175.1:90/live/31000000002000000000/31000000001320000003/0_2/a.m3u8'
    },
    {
        'id':14,
        'device_name':'将军岭北路(测试14)',
        'type':'枪机',
        'state':'在线',
        'channel':0,
        'videoSource':0,
        'address':'1号区域楼梯转角',
        'up_date':'2017-05-16 10:51:30',
        'sys_date':'2017-05-14 09:51:30',
        'device_paly_url':'http://114.215.175.1:90/live/31000000002000000000/31000000001320000003/0_2/a.m3u8'
    },

    {
        'id':15,
        'device_name':'将军岭北路(测试15)',
        'type':'枪机',
        'state':'在线',
        'channel':0,
        'videoSource':0,
        'address':'1号区域楼梯转角',
        'up_date':'2017-05-16 10:51:30',
        'sys_date':'2017-05-14 09:51:30',
        'device_paly_url':'http://114.215.175.1:90/live/31000000002000000000/31000000001320000003/0_2/a.m3u8'
    },
    {
        'id':16,
        'device_name':'将军岭北路(测试15)',
        'type':'枪机',
        'state':'在线',
        'channel':0,
        'videoSource':0,
        'address':'1号区域楼梯转角',
        'up_date':'2017-05-16 10:51:30',
        'sys_date':'2017-05-14 09:51:30',
        'device_paly_url':'http://114.215.175.1:90/live/31000000002000000000/31000000001320000003/0_2/a.m3u8'
    }


]

const randomMarker = (len) => (//随机makers数据
    Array(len).fill(true).map(() => ({
        position: {
            longitude: 100 + Math.random() * 30,
            latitude: 30 + Math.random() * 20,
        },
    }))
);
const type=[
   
            {
                id: "4028c25a625c56dc01625c56f9b90000",
                children: [
                    {
                        children: [ ],
                        id: "4028c25a625c56dc01625c56fa150001",
                        iconCls: "",
                        leaf: true,
                        title: "结构应力"
                    },
                    {
                        title: "地质沉降",
                        id: "4028c25a625c56dc01625c56fa3f0002",
                        leaf: true,
                        iconCls: "",
                        children: [ ]
                    }
                ],
                iconCls: "x-fa fa-fan-icon",
                title: "廊体监测",
                leaf: false
            },
            {
                iconCls: "x-fa fa-balance-scale",
                leaf: false,
                children: [
                    {
                        title: "消防系统",
                        id: "4028c25a625c56dc01625c56faa60004",
                        iconCls: "",
                        children: [ ],
                        leaf: true
                    },
                    {
                        leaf: true,
                        id: "4028c25a625c56dc01625c56fae60005",
                        iconCls: "",
                        children: [ ],
                        title: "安防系统"
                    },
                    {
                        id: "4028c25a625c56dc01625c56fb100006",
                        title: "通风系统",
                        iconCls: "",
                        children: [ ],
                        leaf: true
                    },
                    {
                        iconCls: "",
                        title: "排水系统",
                        children: [ ],
                        leaf: true,
                        id: "4028c25a625c56dc01625c56fb3f0007"
                    },
                    {
                        children: [ ],
                        iconCls: "",
                        id: "4028c25a625c56dc01625c56fb690008",
                        leaf: true,
                        title: "电气系统"
                    }
                ],
                title: "设备监测",
                id: "4028c25a625c56dc01625c56fa710003"
            },
            {
                children: [
                    {
                        children: [ ],
                        leaf: true,
                        iconCls: "",
                        title: "气体浓度",
                        id: "4028c25a625c56dc01625c56fbbb000a"
                    },
                    {
                        leaf: true,
                        id: "4028c25a625c56dc01625c56fbe9000b",
                        title: "温湿度",
                        children: [ ],
                        iconCls: ""
                    },
                    {
                        children: [ ],
                        iconCls: "",
                        title: "烟雾浓度",
                        leaf: true,
                        id: "4028c25a625c56dc01625c56fc18000c"
                    },
                    {
                        iconCls: "",
                        id: "4028c25a625c56dc01625c56fc52000d",
                        title: "液位高度",
                        children: [ ],
                        leaf: true
                    }
                ],
                leaf: false,
                title: "环境监测",
                iconCls: "x-fa fa-thermometer-quarter",
                id: "4028c25a625c56dc01625c56fb930009"
            },
            {
                id: "4028c25a625c56dc01625c56fc83000e",
                children: [
                    {
                        id: "4028c25a625c56dc01625c56fcae000f",
                        iconCls: "",
                        title: "供水管线监测",
                        children: [ ],
                        leaf: true
                    },
                    {
                        leaf: true,
                        iconCls: "",
                        id: "4028c25a625c56dc01625c56fcda0010",
                        children: [ ],
                        title: "燃气管线监测"
                    },
                    {
                        leaf: true,
                        id: "4028c25a625c56dc01625c56fd020011",
                        iconCls: "",
                        title: "污水管线监测",
                        children: [ ]
                    },
                    {
                        title: "热力管线监测",
                        leaf: true,
                        id: "4028c25a625c56dc01625c56fd2d0012",
                        iconCls: "",
                        children: [ ]
                    },
                    {
                        children: [ ],
                        id: "4028c25a625c56dc01625c56fd5c0013",
                        title: "数据异常监测",
                        iconCls: "",
                        leaf: true
                    }
                ],
                title: "管线监测",
                leaf: false,
                iconCls: "x-fa fa-water-icon"
            },
            {
                title: "CCTV",
                children: [ ],
                leaf: true,
                iconCls: "x-fa fa-video-camera",
                id: "4028b237622da2ba01622da2e1a30006"
            }
      
]


export default class MonitoringList extends PureComponent {
  static contextTypes = {
    openModal: PropTypes.func,
  };

  state = {
      columns:[],
      dataSource:[],
      current:1,
      pageSize:10,
      sideType:'common'
  };

    componentDidMount(){
        this.initColums();
    }



    initColums =() =>{
        const columns = [{
            title: '设备名称',
            dataIndex: 'equipName',
            id: 'name',
            align: 'center',
            key:'name'
        }, {
            title: '设备类型',
            dataIndex: 'storeType',
            id: '2',
            align: 'center',
            key:'2'
        },{
            title: '监测位置',
            dataIndex: 'address',
            id: '3',
            align: 'center',
            key:'3'
        }, {
            title: '监测项',
            dataIndex: 'monitorIndex',
            id: '4',
            align: 'center',
            key:'4'
        }, {
            title: '设备状态',
            dataIndex: 'equipStatus',
            id: '5',
            align: 'center',
        },
        {//增加操作栏
            title: '监控值',
            dataIndex: 'monitorValue',
            id: '6',
            align: 'center'
        }];

        this.setState({columns:columns,dataSource:data,sideType:'common'})
    }


    openModel = record =>{
        const{sideType} =this.state;
        if(sideType!='CCTV'){
            return;
        }

        const modalFormProps = {
            title:'CCTV监控',
            isFooter:true,
            isShow:true,
            Contents:CCTVPlay,
            modalOpts: {
                width: 690,
                height:480
            },
            full:true,
        }
        this.context.openModal(modalFormProps);
  }

    cctvColuns= () =>{
        const columns = [{
            title: '设备名称',
            dataIndex: 'device_name',
            id: 'name',
            align: 'center',
            key:'device_name'
        }, {
            title: '设备类型',
            dataIndex: 'type',
            id: '2',
            align: 'center',
            key:'type'
        },{
            title: '运行状态',
            dataIndex: 'state',
            id: '3',
            align: 'center',
            key:'3'
        }, {
            title: '更新时间',
            dataIndex: 'up_date',
            id: '4',
            align: 'center',
            key:'4'
        }];

        this.setState({columns:columns,dataSource:deviceList,sideType:'CCTV'})
    }


    onRow =(record, index)=>{
        return {
            onDoubleClick: this.openModel.bind(this,record),
        };
    }

    onSelect =(selectedKeys, info)=>{

        console.log()
        if(info.node.props.title.props['children'][2]=='CCTV'){
            this.cctvColuns();
        }else{
            this.initColums();
        }
    }

    render() {

        //增加form变量
        let { columns, dataSource,pageSize,current} = this.state;

        const dataTableProps ={
            total: data?data.length:null,
            pageSize: pageSize,
            current:current,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: total => `共 ${data.length} 条`,
        }
        const rowSelection = {
            onRowDoubleClick:this.handlerDoubleClick
        };

        return(
            <Layout className={styles.application}>
              <MonitoringType
                  treeData={type}
                  onSelect={this.onSelect}
              />
              <Content style={{borderLeft:'1px solid #E5E5E5'}} className='ant_table_ui'>
                  <Table rowKey='id' style={{  background: '#ffffff', minHeight: 360}} columns={columns} dataSource={dataSource}
                         pagination={dataTableProps}
                         rowSelection={rowSelection}
                         onRow={this.onRow}
                  />
              </Content>

            </Layout>
        )

    }
}
