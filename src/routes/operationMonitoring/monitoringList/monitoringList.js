import React, {PureComponent} from 'react';
import { Table,Switch,Button, Layout, Tabs,List } from "antd";
import MonitoringType from './monitoringType';
const { Content} = Layout;
import styles from './monitoringType.less';

//维保数据
const data = [
    {
    1: 'NV-TB9716',
    2: '安科瑞智慧用电在线监控装置',
    3: '电力系统',
    4: '管廊系统',
    5: '合肥市高新区鸡鸣山路管廊段',
    6:'/',
}, {
    1: 'AD-359916',
    2: '排水设备',
    3: '排水系统',
    4: '车站系统',
    5: '上海市浦东新区大连路隧道',
}, {
    1: 'GD-569ASD',
    2: '管廊施工机器臂',
    3: '其他系统',
    4: '管廊系统',
    5: '合肥市高新区管廊控制中心',
}, {
    1: 'ARCM300T-Z-2G',
    2: '智能照明设备',
    3: '电力系统',
    4: '隧道系统',
    5: '合肥市新站区管廊控制中心',
}, {
    1: 'ASD862O-GB',
    2: '管廊地下管道甲烷检测器',
    3: '通风系统',
    4: '管廊系统',
    5: '上海市松江南站大型居民区',
}, {
    1: 'BG-569ASD',
    2: '集水坑内液位传感器',
    3: '供水系统',
    4: '车站系统',
    5: '上海市长江隧道',
}
];

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


export default class assetRecord extends PureComponent {


    state = {
        columns:[],
        dataSource:[],
        treeData:[],
    };

    //props :接收任意的输入值
    constructor(props,context) {
        //传递props到基础构造函数中
        super(props,context);
        this.markers = randomMarker(1000);
        this.center = {longitude: 115, latitude: 40};
        this.state = {
            useCluster: true,
        }
    }

    componentDidMount(){
        //加载折线图
        // 基于准备好的dom，初始化echarts实例

        this.initColums();
        this.init();
    }

    initColums =() =>{
        const columns = [{
            title: '设备编号',
            dataIndex: '1',
            id: '1',
            align: 'center',
            key:'1'
        },{
            title: '设备名称',
            dataIndex: '2',
            id: '2',
            align: 'center',
            key:'2'
        },{
            title: '设备类型',
            dataIndex: '3',
            id: '3',
            align: 'center',
            key:'3'
        }, {
            title: '设备所属系统',
            dataIndex: '4',
            id: '4',
            align: 'center',
            key:'4'
        },
            {
                title: '设备地点',
                dataIndex: '5',
                id: '5',
                align: 'center',
            },
            {//增加操作栏
                title: '启停',
                dataIndex: '6',
                id: '6',
                align: 'center',
                render: () => (
                    <Switch defaultChecked />
                ),
            }];
        this.setState({columns:columns})
    }

    init= () =>{
        const thiz = this;

        thiz.setState({dataSource:data})

    }

    onSelect = (selectedKeys, info) => {
        // let array = []
        //
        // array.push(selectedKeys);
        // let recursive = function(node){
        //     if(node.key!=undefined){
        //         array.push(node.key)
        //     }
        //     if(node.props['children']){
        //         for(var i=0;i<node.props['children'].length;i++){
        //             recursive(node.props['children'][i]);
        //         }
        //     }
        // }
        // //递归获取子集
        // recursive(info.node);
        // const {fileDataSource} = this.state;
        // this.setState({ dataSource: fileDataSource.filter(item => array.some(jtem =>item.departmentId==jtem))});
    }


    render() {
        //增加form变量
        let { columns, dataSource,treeData} = this.state;

        const rowSelection = {
            onChange: this.onSelectChange,
        };

        return(
            <Layout className={styles.application}>
              <MonitoringType
                  treeData={type}
                  onSelect={this.onSelect}
              />
              <Content style={{borderLeft:'1px solid #E5E5E5'}}>
                <Table rowKey='id' style={{  background: '#ffffff', minHeight: 360}} columns={columns} dataSource={dataSource}
                       pagination={{
                           showSizeChanger:true,
                           showQuickJumper:true,
                           total:dataSource?dataSource.length:null,
                       }}
                />
              </Content>

            </Layout>
        )

    }
}
