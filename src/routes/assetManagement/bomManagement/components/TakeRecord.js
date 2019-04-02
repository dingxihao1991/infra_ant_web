import React, { PureComponent } from "react";
import { Button, Dropdown, Icon,Tooltip, Layout, Menu, message, Table, Upload,Pagination  } from "antd"; //引入上传
import PropTypes from 'prop-types';
import styles from '../style/style.less';
import InventoryRegisterFrom from './InventoryRegisterFrom';

const {Content,} = Layout;

//备品备件数据
const data = [
{
    code: 'BJ-TD-0000001',
    name: '探头',
    itemType: '其他系统',
    num: '15',
    deliveryTime: '2018-11-19 15:03',
    describe: '设备过期',
    registerUser:'张三峰'
}, {
    code: 'BJ-TD-0000002',
    name: '调高垫板',
    itemType: '其他系统',
    num: '200',
    deliveryTime: '2018-11-20 16:23',
    describe: '设备过期', 
    registerUser:'张三峰'
}, {
    code: 'BJ-TD-0000003',
    name: '通风管',
    itemType: '通风系统',
    num: '10',
    deliveryTime: '2018-11-20 16:23',
    describe: '设备过期',
    registerUser:'张三峰'
}, {
    code: 'BJ-TD-0000004',
    name: '排水管',
    itemType: '排水系统',
    num: '5',
    deliveryTime: '2018-11-20 16:23',
    describe: '设备过期',
    registerUser:'张三峰'
}, {
    code: 'BJ-TD-0000005',
    name: '小型发电机',
    itemType: '供电系统',
    num: '2',
    deliveryTime: '2018-11-20 16:23',
    describe: '设备过期',
    registerUser:'张三峰'
}, {
    code: 'BJ-TD-0000006',
    name: 'LED显示屏',
    itemType: '其他系统',
    num: '1',
    deliveryTime: '2018-11-20 16:23',
    describe: '设备损坏，需要更换',
    registerUser:'王朝'
}, {
    code: 'BJ-ZZ-0000007',
    name: '支柱绝缘子及其附件',
    itemType: '供电系统',
    num: '19',
    deliveryTime: '2018-11-21 9:52',
    describe: '设备损坏，需要更换',
    registerUser:'王朝'
}, {
    code: 'BJ-JY-0000008',
    name: '绝缘密封套管',
    itemType: '供电系统',
    num: '7',
    deliveryTime: '2018-11-19 16:27',
    describe: '设备损坏，需要更换',
    registerUser:'王朝'
}, {
    code: 'BJ-SD-0000009',
    name: '湿度传感器',
    itemType: '排水系统',
    num: '0',
    deliveryTime: '2018-11-20 10:43',
    describe: '设备损坏，需要更换',
}, {
    code: 'BJ-GX-0000010',
    name: '光学配件',
    itemType: '其他系统',
    registerUser:'王朝',
    num: '80',
    deliveryTime: '2018-11-19 13:15',
    describe: '设备损坏，需要更换',
}, {
    code: 'BJ-GB-0000011',
    name: '隔离变压器',
    itemType: '供电系统',
    num: '5',
    deliveryTime: '2018-11-20 15:29',
    describe: '设备损坏，需要更换',
    registerUser:'王朝'
}
];

const columns = [
{
    title: '备件编号',
    dataIndex: 'code',
    id: 'code',
    width:200
}, {
    title: '备件名称',
    dataIndex: 'name',
    id: 'name',
    width:200
}, {
    title: '备件所属系统',
    dataIndex: 'itemType',
    id: 'itemType',
    width:250
}, {
    title: '备件数量',
    dataIndex: 'num',
    id: 'num',
    width: 150
}, {
    title: '出库时间',
    dataIndex: 'deliveryTime',
    id: 'deliveryTime',
    width:200
}, {
    title: '备注',
    dataIndex: 'describe',
    id: 'describe',
    width:250
},{
    title: '申领人',
    dataIndex: 'registerUser',
    id: 'registerUser',
    width:150
}];


export default class TakeRecord extends PureComponent {

    static contextTypes = {
        openModal: PropTypes.func,
    };

    state = {
        columns:[],
        dataSource:[],
        record: null,
        rows: [],
        current:1,
        pageSize:10,
    };

    //props :接收任意的输入值
    constructor(props,context) {
        //传递props到基础构造函数中
        super(props,context)
    }

    openModel = record =>{
        const modalFormProps = {
            title:'出库登记',
            record:record,
            isShow:true,
            Contents:InventoryRegisterFrom,
            modalOpts: {
                width: 700,
            },
            onSubmit: (values) => this.onSubmit(values)
        }
        this.context.openModal(modalFormProps);
    }

    onSubmit = (values) =>{
        console.log(values);
    }

    register =()=>{

        this.openModel();
    }

    handleChange = (pagination, filters, sorter, extra) =>{
        this.setState({current:pagination.current,pageSize:pagination.pageSize});
    }

    render() {
        const {  pageSize,current} = this.state;


        const rowSelection = {
            onChange: this.onSelectChange,
        };
        const dataTableProps ={
            total: data?data.length:null,
            pageSize: pageSize,
            current:current,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: total => `共 ${data.length} 条`,
        }

        return(
            <div >
                <div className={styles.tableOperations}>
                    <Button onClick={this.register}>
                        <Icon type="edit" />出库登记
                    </Button>
                </div>
                <Content className='ant_table_ui' >
                    <Table  size="middle" rowKey='code' columns={columns}
                           dataSource={data} onChange={this.handleChange} rowSelection={rowSelection}
                           pagination={dataTableProps}
                           scroll={{ y: '68vh'  }}
                    />
                </Content>
            </div>
        )

    }
}