import React, { PureComponent } from "react";
import styles from "./assetList.less"; //引入样式
import { Button, Dropdown, Icon, Layout, Menu, message, Table, Upload } from "antd"; //引入上传
import { ModalForm, showConfirm } from "components/Modal";
import FormSub from "./assetsLocation"; //资产设备单个定位页面
import FormSub2 from "./assetChange"; //资产设备变更页面
import FormSub3 from "./assetsAllLocation"; //所有资产设备定位页面
import FormSub4 from "./assetDetails";//资产设备详情页面
import Authorized from "../../../utils/Authorized";
import PropTypes from 'prop-types';
import AssetModelInfo from './modal/AssetModelInfo';
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

const { Content,} = Layout;
const Modal = ModalForm.Modal;

const data = [{
  1: 'NV-TB9716',
  2: '智能照明设备',
  3: '照明系统',
  4: '上海市青浦区诸光路(地铁站)',
  5: '正常',
  6: '/',
  7: '2018-10-12',
  8: 'admin',
  9: '2018-10-12',
}, {
  1: 'AD-359916',
  2: '排水设备',
  3: '排水系统',
  4: '上海市浦东新区大连路隧道',
  5: '检修',
  6: '/',
  7: '2016-9-12',
  8: 'admin',
  9: '2017-6-26',
}, {
  1: 'GD-569ASD',
  2: '管廊施工机器臂',
  3: '管廊系统',
  4: '合肥市高新区管廊控制中心',
  5: '正常',
  6: '/',
  7: '2018-5-8',
  8: 'admin',
  9: '2018-10-12',
}, {
  1: 'ARCM300T-Z-2G',
  2: '安科瑞智慧用电在线监控装置',
  3: '管廊系统',
  4: '合肥市新站区管廊控制中心',
  5: '检修',
  6: '/',
  7: '2018-9-6',
  8: 'admin',
  9: '2018-11-8',
}, {
  1: 'ASD862O-GB',
  2: '管廊地下管道甲烷检测器',
  3: '通风系统',
  4: '上海市松江南站大型居民区',
  5: '正常',
  6: '/',
  7: '2017-5-15',
  8: 'admin',
  9: '2018-11-11',
}, {
  1: 'BG-569ASD',
  2: '集水坑内液位传感器',
  3: '供水系统',
  4: '上海市长江隧道',
  5: '正常',
  6: '/',
  7: '2018-5-8',
  8: 'admin',
  9: '2018-10-12',
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
    visible: false,
    rows: [],
    form: FormSub,
    title:"资产设备定位"
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
      title: '资产设备编号',
      dataIndex: '1',
      id: '1',
      align: 'center',
      key:'1'
    }, {
        title: '模型',
        dataIndex: '21',
        id: '21',
        align: 'center',
        key:'21',
        width:'80',
        render: (text, record) => {
          return <Icon type="codepen" style={{height:'30px',width:'40px'}} onClick={this.openModel.bind(this,record)}/>
        }
    },{
      title: '资产设备名称',
      dataIndex: '2',
      id: '2',
      align: 'center',
      key:'2'
    },{
      title: '资产设备类型',
      dataIndex: '3',
      id: '3',
      align: 'center',
      key:'3'
    },{
      title: '资产设备位置',
      dataIndex: '4',
      id: '4',
      align: 'center',
      key:'4'
    }, {
      title: '资产设备状态',
      dataIndex: '5',
      id: '5',
      align: 'center',
      key:'5'
    },{
      title: '描述',
      dataIndex: '6',
      id: '6',
      align: 'center',
      width: 150
    },
      {
        title: '创建时间',
        dataIndex: '7',
        id: '7',
        align: 'center',
        width: 150
      }, {
        title: '最后修改人',
        dataIndex: '8',
        id: '8',
        align: 'center',
        width: 100
      }, {
        title: '最后修改时间',
        dataIndex: '9',
        id: '9',
        align: 'center',
        width: 150
      },{//增加操作栏
        title: '操作',
        dataIndex: '10',
        id: '10',
        align: 'center',
        width: 150,
        render: () => (
          <Dropdown overlay={<Menu>
            <Menu.Item key="1">  <ButtonAuthorize  icon="form"  onClick={this.edit} name="定位" authority="application:update" /></Menu.Item>
            <Menu.Item key="2">  <ButtonAuthorize  icon="form"  onClick={this.change} name="变更" authority="application:update" /></Menu.Item>
            <Menu.Item key="3">  <ButtonAuthorize  icon="form"  onClick={this.detail} name="详情" authority="application:update" /></Menu.Item>
      </Menu>}>
        <Button >
    更多 <Icon type="down" />
      </Button>
  </Dropdown>

        ),
      }];
    this.setState({columns:columns})
  }


  openModel = record =>{
    console.log("---------",record);
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

  //编辑
  edit =()=>{
    const {rows} = this.state
    if(rows.length>1){
      Modal.warning({
        title: '警告信息',
        content: '请选中一行数据',
      });
      return;
    }
    let  form = FormSub
    this.setState({
      record:rows[0],
      visible: true,
      form:form
    });
  }

  //变更
  change =()=>{
    const {rows} = this.state
    console.log(rows)
    if(rows.length>1){
      Modal.warning({
        title: '警告信息',
        content: '请选中一行数据',
      });
      return;
    }
    console.log("变更...");
    let  form2 = FormSub2
    this.setState({
      form: form2,
      record:rows[0],
      visible: true,
      title:"资产设备变更",

    });
  }

  //资产详情页
  detail =()=>{
    const {rows} = this.state
    console.log(rows)
    if(rows.length>1){
      Modal.warning({
        title: '警告信息',
        content: '请选中一行数据',
      });
      return;
    }
    console.log("资产详情...");
    let  form4 = FormSub4
    this.setState({
      form: form4,
      record:rows[0],
      visible: true,
      title:"详细信息",
    });
  }

  //获取所有设备位置
  getAll =()=>{
    const {rows} = this.state
    console.log(rows)
    let  form = FormSub3
    this.setState({
      record:rows[0],
      visible: true,
      form:form,
      title:"资产设备位置",
    });
  }

  //选中项发生变化时的回调
  onSelectChange = (selectedRowKeys,selectedRows) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({rows:selectedRows,record:selectedRows[0]});
  }

  render() {
    //增加form变量
    let { columns, visible,record,dataSource,form,title} = this.state;

    const rowSelection = {
      onChange: this.onSelectChange,
    };
    const modalFormProps = {
      title:title,
      loading: true,
      isFooter:true,
      record,
      visible,
      Contents:form,
      modalOpts: {
        width: 800,
      },
      onCancel: () => {
        this.setState({
          record: null,
          visible: false,
      })
      },
      onSubmit: () => {
        this.setState({
          record: null,
          visible: false
        })
      },
    }

    return(
      <Layout className={styles.application}>
        <div className={styles.tableOperations}>

          <Upload
            name="userUploadFile"
            showUploadList={false}
            beforeUpload={beforeUpload}
            onChange={this.handleChange}
            style={{margin: '10px'}}
          >
            <Button>
              <Icon type="upload" /> 上传
            </Button>
          </Upload>
          <Button icon="search"  onClick={this.getAll}>查看所有设备位置</Button>
        </div>
        <Content  >
          <Table rowKey='id' style={{  background: '#ffffff', minHeight: 360}} columns={columns} dataSource={dataSource} onChange={this.handleChange} rowSelection={rowSelection}
                 pagination={{
                    showSizeChanger:true,
                    showQuickJumper:true,
                    total:dataSource?dataSource.length:null,
                    onChange:this.onChange
                  }}
          />
        </Content>
        <ModalForm {...modalFormProps}/>

      </Layout>
    )

  }
}