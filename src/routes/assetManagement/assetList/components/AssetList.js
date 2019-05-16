import React, { PureComponent } from "react";
import styles from "../style/assetList.less"; //引入样式
import { Button, Dropdown, Icon,Tooltip, Layout, Menu, message, Table, Upload,Pagination  } from "antd"; //引入上传
import { ModalForm, showConfirm } from "components/Modal";
import FormSub from "../assetsLocation"; //资产设备单个定位页面
import FormSub2 from "./AssetChange"; //资产设备变更页面
import AssetMaintenance from "./AssetMaintenance"; //资产设备维保页面
import FormSub3 from "../assetsAllLocation"; //所有资产设备定位页面
import AssetDetails from "./info/AssetDetails";//资产设备详情页面
import Authorized from "../../../../utils/Authorized";
import PropTypes from 'prop-types';
import AssetModelInfo from '../modal/AssetModelInfo';
import cx from 'classnames';
import { connect } from 'dva';


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
const { ButtonAuthorize } = Authorized;


@connect(({loading, assetList}) => ({
    list:assetList.list,
    loading: loading.effects['assetList/fetch']
}))
export default class assetList extends PureComponent {

    static contextTypes = {
        openModal: PropTypes.func,
    };

    state = {
        columns:[],
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
        const {dispatch } = this.props;
        dispatch({
            type: 'assetList/fetch',
            payload: {
            },
        });
        this.initColums();
    }

    initColums =() =>{
        const columns = [{
            width:120,
            title: '当前状态',
            dataIndex: 'use_state',
            key:'use_state',
            render: (text, record) => {
              if (text == '使用') {
                return <span style={{color:'#40c334'}}>{text}</span>
              }else{
                return <span style={{color:'red'}}>{text}</span>
              }
            }
        }, {
            width:200,
            title: '项目名称',
            dataIndex: 'project_name',
            key:'project_name',
        }, {
            width:200,
            title: '项目合同编码',
            dataIndex: 'project_contract_no',
            key:'project_contract_no',
        },{
            width:200,
            title: '资产编码',
            dataIndex: 'asset_no',
            key:'asset_no',
        },{
            width:250,
            title: '资产名称',
            dataIndex: 'asset_description',
            key:'asset_description',
        },{
            width:200,
            title: '规格型号',
            dataIndex: 'fin_gzxh',
            key:'fin_gzxh',
            render: (text, record) => {
                return (
                    <Tooltip placement="topLeft" title={text}>
                      <div style={{width:'160px'}} className="table-slop">{text}</div>
                    </Tooltip>
                )
            }
        }, {
            width:100,
            title: '产地',
            dataIndex: 'produce_area',
            key:'produce_area',
        }, {
          width:250,
          title: '生产厂商',
          dataIndex: 'manufacturer',
          key:'manufacturer',
        }, {
          width:250,
          title: '供应商',
          dataIndex: 'supplier',
          key:'supplier',
        }, {
          width:150,
          title: '变更日期',
          dataIndex: 'change_date',
          key:'change_date',
        }, {
          width:150,
          title: '移交时间',
          dataIndex: 'transfer_date',
          key:'transfer_date',
        }, {
          width:150,
          title: '设计使用年限',
          dataIndex: 'design_use_life',
          key:'design_use_life',
        }, {
          width:150,
          title: '大修频次',
          dataIndex: 'overhaul_rate',
          key:'overhaul_rate',
        }, {
          width:150,
          title: '出厂价',
          dataIndex: 'factory_price',
          key:'factory_price',
        }, {
          width:150,
          title: '合同价',
          dataIndex: 'contract_price',
          key:'contract_price',
        }, {
          width:120,
          title: '原值',
          dataIndex: 'original_value',
          key:'original_value',
        },{
            width:120,
            title: '操作',
            key: 'operation',
            fixed: 'right',
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
    change =(type)=>{
        const {rows} = this.state
        if(rows.length!=1){
            Modal.warning({
                title: '警告信息',
                content: '请选中一行数据',
            });
            return;
        }
        let modalFormProps = {};
        console.log("type:",type)
        if(type==1){
            modalFormProps = {
                title:'资产变更',
                record:rows[0],
                isFooter:false,
                isShow:true,
                Contents:FormSub2,
                onSubmit: (values) => this.submit(values)
            }
        }else {
            console.log("type:-------------")
            modalFormProps = {
                title:'维修保养',
                record:rows[0],
                isFooter:false,
                isShow:true,
                Contents:AssetMaintenance,
                onSubmit: (values) => this.maintenance(values)
            }
        }

        this.context.openModal(modalFormProps);
    }

    maintenance =()=>{

    }
    submit =(values)=>{

        console.log("--",values)
        // const {dispatch } = this.props;
        // dispatch({
        //     type: 'personalCentre/add',
        //     payload: {
        //         tags:{
        //             key:i++,
        //             date:moment(values.date).format('YYYY-MM-DD'),
        //             label: values.describe,
        //         }
        //     },
        // });
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

    onRow =(record, index)=>{
        return {
            onDoubleClick: this.handlerDoubleClick.bind(this,record),
        };
    }
    render() {
        //增加form变量
        const { columns, pageSize,current} = this.state;
        const { list ,loading} = this.props;

        const rowSelection = {
            onChange: this.onSelectChange,

        };

        const dataTableProps ={
            total: list?list.length:null,
            pageSize: pageSize,
            current:current,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: total => `共 ${list.length} 条`,
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
                        <Button>product
                            <Icon type="upload" /> 上传
                        </Button>
                    </Upload>
                    <ButtonAuthorize icon="edit" type="edit" onClick={this.change.bind(this,1)} name="变更" authority="application:add"/>
                    <ButtonAuthorize icon="edit" type="edit" onClick={this.change.bind(this,2)} name="维保" authority="application:add"/>
                </div>
                <Content   className='ant_table_ui' >
                    <Table size="middle" rowKey='id' style={{  background: '#ffffff', minHeight: 360}}
                           loading={loading}
                           columns={columns}
                           dataSource={list}
                           onChange={this.handleChange}
                           rowSelection={rowSelection}
                           pagination={dataTableProps}
                           scroll={{x: 2900,y: '73vh'}}
                           onRow={this.onRow}
                    />
                </Content>
            </Layout>
        )

    }
}