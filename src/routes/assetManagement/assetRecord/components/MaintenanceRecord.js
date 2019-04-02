import React, {PureComponent} from 'react';
import { Table, Button, Layout, Tabs,Input,Radio } from "antd";
import {ModalForm,showConfirm}  from 'components/Modal';
const Search = Input.Search;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

const { Content,} = Layout;

//维保数据
const data = [{
    code: 'WB-BG-0000001',
    id: 'NV-TB9716',
    name: '安科瑞智慧用电在线监控装置',
    itemType: '电力系统',
    type: '维修',
    user: '李明',
    time: '2018-10-12',
    location: '合肥市高新区鸡鸣山路管廊段',
    describe:'',
}, {
    code: 'WB-BG-0000002',
    id: 'AD-359916',
    name: '排水设备',
    itemType: '排水系统',
    type: '维修',
    user: '李四光',
    time: '2018-11-15',
    location: '上海市浦东新区大连路隧道',
    describe:'',
}, {
    code: 'WB-BG-0000003',
    id: 'GD-569ASD',
    name: '管廊施工机器臂',
    itemType: '其他系统',
    type: '保养',
    user: '赵瑞',
    time: '2018-9-13',
    location: '合肥市高新区管廊控制中心',
    describe:'',
}, {
    code: 'WB-BG-0000004',
    id: 'ARCM300T-Z-2G',
    name: '智能照明设备',
    itemType: '电力系统',
    type: '保养',
    user: '周泽',
    time: '2018-11-11',
    location: '合肥市新站区管廊控制中心',
    describe:'',
}, {
    code: 'WB-BG-0000005',
    id: 'ASD862O-GB',
    name: '管廊地下管道甲烷检测器',
    itemType: '通风系统',
    type: '更换',
    user: '黄芳',
    time: '2018-7-11',
    location: '上海市松江南站大型居民区',
    describe:'',
}, {
    code: 'WB-BG-0000006',
    id: 'BG-569ASD',
    name: '集水坑内液位传感器',
    itemType: '供水系统',
    type: '更换',
    user: '张向阳',
    time: '2018-9-19',
    location: '上海市长江隧道',
    describe:'',
},{
    code: 'WB-BG-0000008',
    id: 'BG-ADS080DW',
    name: '科达中央集成电力控制设备',
    itemType: '电力系统',
    type: '维修',
    user: '李开前',
    time: '2018-10-5',
    location: '合肥高新区管廊试验段',
    describe:'',
}];

export default class MaintenanceRecord extends PureComponent {


    state = {
        columns:[],
        dataSource:[],
        fileDataSource:[],
        record: null,
        rows: [],
        current:1,
        pageSize:10,
    };

    //props :接收任意的输入值
    constructor(props,context) {
        //传递props到基础构造函数中
        super(props,context);

    }

    componentDidMount(){

        this.initColums();
        this.init();
    }

    initColums =() =>{
        const columns = [{
            title: '维保单号',
            dataIndex: 'code',
            id: 'code',
            width:150
        },{
            title: '设备名称',
            dataIndex: 'name',
            id: 'name',
            width:350
        },{
            title: '资产类型',
            dataIndex: 'itemType',
            id: 'itemType',
            width:150
        }, {
            title: '维保类型',
            dataIndex: 'type',
            id: 'type',
            width:100
        }, {
            title: '维保人员',
            dataIndex: 'user',
            id: 'user',
            width:150
        }, {
            title: '维保时间',
            dataIndex: 'time',
            id: 'time',
            width:200
        }, {
            title: '维保地点',
            dataIndex: 'location',
            id: 'location',
            width:250
        }, {
            title: '维保说明',
            dataIndex: 'describe',
            id: 'describe',

        }];
        this.setState({columns:columns})
    }

    init= () =>{
        const thiz = this;

        thiz.setState({dataSource:data,fileDataSource:data});

    }

    subFilter = (type) =>{
        const {fileDataSource} = this.state;
        if(type=='全部'){
            this.setState({dataSource:fileDataSource});
            return;
        }
        this.setState({ dataSource: fileDataSource.filter(item=> item.type==type)});

    }

    handleChange = (pagination, filters, sorter, extra) =>{
        this.setState({current:pagination.current,pageSize:pagination.pageSize});
    }

    render() {

        //增加form变量
        let { columns,dataSource,pageSize,current} = this.state;
        const rowSelection = {
            onChange: this.onSelectChange,
        };

        const dataTableProps ={
            total: dataSource?dataSource.length:null,
            pageSize: pageSize,
            current:current,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: total => `共 ${dataSource.length} 条`,

        }


        return(
            <Layout >
                <div>
                    <Search style={{float: 'right',  margin: 10,width:'20%'}} placeholder="搜索" onChange={this.handleSearch} />
                    <RadioGroup defaultValue="all" style={{float: 'right',margin: 10}}>
                        <RadioButton value="all" onClick={()=>this.subFilter('全部')}>全部</RadioButton>
                        <RadioButton value="progress" onClick={()=>this.subFilter('维修')}>维修</RadioButton>
                        <RadioButton value="waiting" onClick={()=>this.subFilter('保养')}>保养</RadioButton>
                        <RadioButton value="complete" onClick={()=>this.subFilter('更换')}>更换</RadioButton>
                    </RadioGroup>

                </div>
                <Content className='ant_table_ui'>
                    <Table  size="middle" rowKey='id' columns={columns} dataSource={dataSource} onChange={this.handleChange} rowSelection={rowSelection}
                           pagination={dataTableProps}
                           scroll={{y: '73vh'  }}
                    />

                </Content>
            </Layout>
        )

    }
}