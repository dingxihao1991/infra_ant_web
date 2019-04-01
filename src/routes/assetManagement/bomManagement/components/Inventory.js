import React, { PureComponent } from "react";
import { Button, Dropdown, Icon,Tooltip, Layout, Menu, message, Table, Upload,Pagination  } from "antd"; //引入上传
import PropTypes from 'prop-types';
import styles from '../style/style.less';
const {Content,} = Layout;

//备品备件数据
const data = [
    {
        code: 'BJ-TD-0000001',
        name: '探头',
        itemType: '其他系统',
        num: '15',
        inventoryTime: '2018-11-19 15:03',
    }, {
        code: 'BJ-TD-0000002',
        name: '调高垫板',
        itemType: '其他系统',
        num: '200',
        inventoryTime: '2018-11-20 16:23',
    }, {
        code: 'BJ-TD-0000003',
        name: '通风管',
        itemType: '通风系统',
        num: '10',
        inventoryTime: '2018-11-20 16:23',
    }, {
        code: 'BJ-TD-0000004',
        name: '排水管',
        itemType: '排水系统',
        num: '5',
        inventoryTime: '2018-11-20 16:23',
    }, {
        code: 'BJ-TD-0000005',
        name: '小型发电机',
        itemType: '供电系统',
        num: '2',
        inventoryTime: '2018-11-20 16:23',
    }, {
        code: 'BJ-TD-0000006',
        name: 'LED显示屏',
        itemType: '其他系统',
        num: '1',
        inventoryTime: '2018-11-20 16:23',
    }, {
        code: 'BJ-ZZ-0000007',
        name: '支柱绝缘子及其附件',
        itemType: '供电系统',
        num: '19',
        inventoryTime: '2018-11-21 9:52',
    }, {
        code: 'BJ-JY-0000008',
        name: '绝缘密封套管',
        itemType: '供电系统',
        num: '7',
        inventoryTime: '2018-11-19 16:27',
    }, {
        code: 'BJ-SD-0000009',
        name: '湿度传感器',
        itemType: '排水系统',
        num: '0',
        inventoryTime: '2018-11-20 10:43',
    }, {
        code: 'BJ-GX-0000010',
        name: '光学配件',
        itemType: '其他系统',
        num: '80',
        inventoryTime: '2018-11-19 13:15',
    }, {
        code: 'BJ-GB-0000011',
        name: '隔离变压器',
        itemType: '供电系统',
        num: '5',
        inventoryTime: '2018-11-20 15:29',
    }
];

const columns = [
    {
        title: '备件编号',
        dataIndex: 'code',
        id: 'code',
        key: '1',
        width:200
    }, {
        title: '备件名称',
        dataIndex: 'name',
        id: 'name',
        key: '2',
        width:200
    }, {
        title: '备件所属系统',
        dataIndex: 'itemType',
        id: 'itemType',
        key: '3',
        width:250
    }, {
        title: '备件数量',
        dataIndex: 'num',
        id: 'num',
        key: '4',
        width: 150
    }, {
        title: '更新时间',
        dataIndex: 'inventoryTime',
        id: 'inventoryTime',
        key: '5',
        width:200
    }];


export default class Inventory extends PureComponent {

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


    constructor(props,context) {

        super(props,context)
    }


    openModel = record =>{
        const modalFormProps = {
            title:'BIM属性',
            record:record,
            isFooter:true,
            isShow:true,
            Contents:AssetModelInfo,
            modalOpts: {
                width: 1000,
            },
        }
        this.context.openModal(modalFormProps);
    }


    //定位
    edit =(record)=>{

        const modalFormProps = {
            title:'设备位置',
            record:record,
            isFooter:false,
            isShow:true,
            Contents:FormSub,
        }
        this.context.openModal(modalFormProps);
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
            <div>
                <div className={styles.tableOperations}>
                    <Button onClick={this.change}>
                        <Icon type="edit" />入库登记
                    </Button>
                </div>
                <Content className='ant_table_ui' >
                    <Table size="middle" rowKey='id' columns={columns}
                           dataSource={data} onChange={this.handleChange} rowSelection={rowSelection}
                           pagination={dataTableProps}
                           scroll={{ y: '68vh'  }}
                    />
                </Content>
            </div>
        )

    }
}