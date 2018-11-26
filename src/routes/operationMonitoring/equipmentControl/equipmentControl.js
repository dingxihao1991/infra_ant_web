import React, {PureComponent} from 'react';
import styles from './assetRecord.less';
import { Table,Switch,Button, Layout, Tabs } from "antd";
import {ModalForm,showConfirm}  from 'components/Modal';
import FormSub from './assetRecordDetails.js';//资产设备单个定位页面
//引入折线图
import 'echarts/lib/chart/line';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';//折线说明


/**
 * 资产维保记录页面
 *
 */


function onChange(checked) {
  console.log(`switch to ${checked}`);
}

const { Content,} = Layout;
const TabPane = Tabs.TabPane;

//维保数据
const data = [{
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

export default class assetRecord extends PureComponent {


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
          <Switch defaultChecked onChange={onChange} />
        ),
      }];
    this.setState({columns:columns})
  }

  init= () =>{
    const thiz = this;

    thiz.setState({dataSource:data})

  }

  //编辑
  edit =()=>{
    console.log(this.state);
    let  form = FormSub
    this.setState({
      visible: true,
      form:form
    });
  }


  //选中项发生变化时的回调
  onSelectChange = (selectedRowKeys,selectedRows) => {
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
      record,
      visible,
      Contents:form,
      modalOpts: {
        width: 800,
      },
      onCancel: () => {
        this.setState({
          record: null,
          visible: false
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