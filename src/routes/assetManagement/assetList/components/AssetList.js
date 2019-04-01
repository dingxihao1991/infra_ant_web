import React, { PureComponent } from "react";
import styles from "../style/assetList.less"; //引入样式
import { Button, Dropdown, Icon,Tooltip, Layout, Menu, message, Table, Upload,Pagination  } from "antd"; //引入上传
import { ModalForm, showConfirm } from "components/Modal";
import FormSub from "../assetsLocation"; //资产设备单个定位页面
import FormSub2 from "./AssetChange"; //资产设备变更页面
import FormSub3 from "../assetsAllLocation"; //所有资产设备定位页面
import AssetDetails from "./info/AssetDetails";//资产设备详情页面
import Authorized from "../../../../utils/Authorized";
import PropTypes from 'prop-types';
import AssetModelInfo from '../modal/AssetModelInfo';
import cx from 'classnames';
/**
 * 资产列表页面
 *
 * @param file
 * @returns {boolean}
 */

const { ButtonAuthorize } = Authorized;

//上传方法
function beforeUpload(file) {
    //无法获取excel的type，故采用name获取file类型    fileName is undefined
    let fileName  = file.name;
    const isXls = fileName.indexOf("xls")==-1?false:true;
    if(!isXls){
        message.error('请上传xls或xlsx格式的文件~');
    }

    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }

    if(isXls&&isLt2M){
        message.success("上传成功~");
    }

    return isXls && isLt2M;
}

const { Content,Footer} = Layout;
const Modal = ModalForm.Modal;

const data = [
    {
    'id':'101',
    1: 'NV-TB9716',
    2: '智能照明设备',
    3: '照明系统',
    4: '复兴东路隧道',
    5: '正常',
    6: '/',
    7: '2018-10-12',
    8: 'admin',
    9: '2018-10-12',
}, {
    'id':'102',
    1: 'AD-359916',
    2: '排水设备',
    3: '排水系统',
    4: '复兴东路隧道',
    5: '检修',
    6: '/',
    7: '2016-9-12',
    8: 'admin',
    9: '2017-6-26',
}, {
    'id':'1023',
    1: 'GD-569ASD',
    2: '信号灯设备',
    3: '信号控制系统',
    4: '上中路隧道',
    5: '正常',
    6: '/',
    7: '2018-5-8',
    8: 'admin',
    9: '2018-10-12',
}, {
    'id':'1024',
    1: 'ARCM300T-Z-2G',
    2: '车辆检测器',
    3: '交通检测系统',
    4: '上中路隧道',
    5: '检修',
    6: '/',
    7: '2018-9-6',
    8: 'admin',
    9: '2018-11-8',
}, {
    'id':'1025',
    1: 'ARCM300T-F-2G',
    2: '通风设备',
    3: '通风系统',
    4: '上中路隧道',
    5: '检修',
    6: '/',
    7: '2018-9-6',
    8: 'admin',
    9: '2018-11-8',
  }, {
    'id':'1026',
    1: 'AR-F-2G',
    2: '消防设备',
    3: '消防系统',
    4: '复兴东路隧道',
    5: '检修',
    6: '/',
    7: '2018-9-6',
    8: 'admin',
    9: '2018-11-8',
  }, {
    'id':'1027',
    1: 'AR-F-2G',
    2: '消防设备',
    3: '消防系统',
    4: '西藏南路隧道',
    5: '检修',
    6: '/',
    7: '2018-9-6',
    8: 'admin',
    9: '2018-11-8',
  }, {
    'id':'1028',
    1: 'AR-F-2G',
    2: '通风设备',
    3: '通风系统',
    4: '西藏南路隧道',
    5: '检修',
    6: '/',
    7: '2018-9-6',
    8: 'admin',
    9: '2018-11-8',
  }
];

export default class assetList extends PureComponent {

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

    componentDidMount(){
        this.initColums();
        this.init();
    }


    initColums =() =>{
        const columns = [{
            title: '设备编号',
            dataIndex: '1',
            id: '1',
            key:'1',
            width:150
        }, {
            title: '设备状态',
            dataIndex: '5',
            id: '5',
            key:'5',
            width:150
        }, {
            title: '设备名称',
            dataIndex: '2',
            id: '2',
            key:'2',
            width:300
        },{
            title: '设备类型',
            dataIndex: '3',
            id: '3',
            key:'3',
            width:200
        },{
            title: '设备位置',
            dataIndex: '4',
            id: '4',
            key:'4',
            width:400
        },{
            title: '创建时间',
            dataIndex: '7',
            id: '7',
            width:200
        }, {
            title: '最后修改人',
            dataIndex: '8',
            id: '8',
        },{
            title: '操作',
            key: 'operation',
            fixed: 'right',
            width:150,
            render: (text, record) => {
                return (
                    <div className="table-row-button">
                        <Tooltip placement="topLeft" title='设备定位'>
                            <Button onClick={this.edit.bind(this,record)}>
                                <Icon type="environment" />
                            </Button>
                        </Tooltip>
                        <Tooltip placement="topLeft" title='模型信息'>
                            <Button onClick={this.openModel.bind(this,record)}>
                                <Icon type="codepen" />
                            </Button>
                        </Tooltip>

                    </div>
                )
            }
        },];
        this.setState({columns:columns})
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

    init= () =>{
        const thiz = this;
        thiz.setState({dataSource:data})

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

    //变更
    change =()=>{
        const {rows} = this.state
        if(rows.length!=1){
            Modal.warning({
                title: '警告信息',
                content: '请选中一行数据',
            });
            return;
        }

        const modalFormProps = {
            title:'资产变更',
            record:rows[0],
            isFooter:false,
            isShow:true,
            Contents:FormSub2,
        }
        this.context.openModal(modalFormProps);
    }

    //资产详情页
    detail =(record)=>{

        const modalFormProps = {
            title:'详细信息',
            record:record,
            isFooter:true,
            isShow:true,
            Contents:AssetDetails,
            modalOpts: {
                width: 1200,
                height:710,
            },
            full:true,
        }
        this.context.openModal(modalFormProps);
    }

    //获取所有设备位置
    getAll =()=>{
        const {rows} = this.state
        console.log(rows)
        let  form = FormSub3

        const modalFormProps = {
            title:'资产设备位置',
            record:rows[0],
            isFooter:true,
            isShow:true,
            Contents:form,
            modalOpts: {
                width: 1000,
            },
        }
        this.context.openModal(modalFormProps);
    }

    handleChange = (pagination, filters, sorter, extra) =>{
        this.setState({current:pagination.current,pageSize:pagination.pageSize});
    }
    //选中项发生变化时的回调
    onSelectChange = (selectedRowKeys,selectedRows) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({rows:selectedRows,record:selectedRows[0]});
    }

    handlerDoubleClick = (record, index, event) =>{
        this.detail(record);
    }
    render() {
        //增加form变量
        let { columns, pageSize,record,dataSource,current} = this.state;

        let classname = cx(
            "antui-datatable",
            {'table-row-alternate-color': true},
        );

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
            <Layout className={styles.application}>
                <div className={styles.tableOperations}>

                    <Upload
                        name="userUploadFile"
                        showUploadList={false}
                        beforeUpload={beforeUpload}
                        style={{margin: '10px'}}
                    >
                        <Button>
                            <Icon type="upload" /> 上传
                        </Button>
                    </Upload>
                    <Button onClick={this.change}>
                        <Icon type="edit" />变更
                    </Button>
                    <Button icon="search"  onClick={this.getAll}>查看所有设备位置</Button>
                </div>
                <Content   className='ant_table_ui' >
                    <Table size="middle" rowKey='id' style={{  background: '#ffffff', minHeight: 360}} columns={columns} dataSource={dataSource} onChange={this.handleChange} rowSelection={rowSelection}
                           pagination={dataTableProps}
                           scroll={{x: '110%', y: '73vh'  }}
                           onRowDoubleClick={this.handlerDoubleClick}
                    />
                </Content>
            </Layout>
        )

    }
}