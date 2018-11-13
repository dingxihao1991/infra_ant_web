import React, {PureComponent} from 'react';
import styles from './test.less';
import { Table, Button, Layout, Pagination, Form, Input, message, Dropdown, Menu, Tabs } from "antd";
import {ModalForm,showConfirm}  from 'components/Modal';
import FormSub from './Form';//资产设备单个定位页面
import FormSub2 from './Form2';//资产设备变更页面
import FormSub3 from './Form3';//所有资产设备定位页面
import FormSub4 from './Form4';//资产设备详情页面

import { Upload, Icon } from 'antd';//引入上传
import { getToken } from "../../utils/authority";

// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
//引入折线图
import 'echarts/lib/chart/line';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';

import { Map ,Markers} from 'react-amap';//引入高德地图


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

const FormItem = Form.Item;
const { Content, Header, Footer } = Layout;
const Modal = ModalForm.Modal;
const confirm = Modal.confirm;
const TabPane = Tabs.TabPane;

const Paging = ({dataItems, onChange, ...otherProps}) => {
  const { total, pageSize, pageNum } = dataItems;
  const paging = {
    total: total,
    pageSize: pageSize,
    current: pageNum,
    showSizeChanger: true,
    showQuickJumper: true,
    showTotal: total => `共 ${total} 条`,
    onShowSizeChange: (pageNum, pageSize) => onChange({pageNum, pageSize}),
    onChange: (pageNum) => onChange({pageNum}),
    ...otherProps
  };
  return <Pagination {...paging} />;
};

const data = [{
  1: 'WB-BG-0000001',
  2: 'NV-TB9716',
  3: '安科瑞智慧用电在线监控装置',
  4: '电力系统',
  5: '管廊系统',
  6: '日常检修',
  7: '李明',
  8: '2018-10-12',
  9: '合肥市高新区鸡鸣山路管廊段',
  10:'/',
}, {
  1: 'WB-BG-0000001',
  2: 'NV-TB9716',
  3: '安科瑞智慧用电在线监控装置',
  4: '电力系统',
  5: '管廊系统',
  6: '日常检修',
  7: '李明',
  8: '2018-10-12',
  9: '合肥市高新区鸡鸣山路管廊段',
  10:'/',
}, {
  1: 'WB-BG-0000001',
  2: 'NV-TB9716',
  3: '安科瑞智慧用电在线监控装置',
  4: '电力系统',
  5: '管廊系统',
  6: '日常检修',
  7: '李明',
  8: '2018-10-12',
  9: '合肥市高新区鸡鸣山路管廊段',
  10:'/',
}, {
  1: 'WB-BG-0000001',
  2: 'NV-TB9716',
  3: '安科瑞智慧用电在线监控装置',
  4: '电力系统',
  5: '管廊系统',
  6: '日常检修',
  7: '李明',
  8: '2018-10-12',
  9: '合肥市高新区鸡鸣山路管廊段',
  10:'/',
}, {
  1: 'WB-BG-0000001',
  2: 'NV-TB9716',
  3: '安科瑞智慧用电在线监控装置',
  4: '电力系统',
  5: '管廊系统',
  6: '日常检修',
  7: '李明',
  8: '2018-10-12',
  9: '合肥市高新区鸡鸣山路管廊段',
  10:'/',
}, {
  1: 'WB-BG-0000001',
  2: 'NV-TB9716',
  3: '安科瑞智慧用电在线监控装置',
  4: '电力系统',
  5: '管廊系统',
  6: '日常检修',
  7: '李明',
  8: '2018-10-12',
  9: '合肥市高新区鸡鸣山路管廊段',
  10:'/',
}
];

const menu = (
  <Menu>
    <Menu.Item key="1">定位</Menu.Item>
    <Menu.Item key="2">变更</Menu.Item>
    <Menu.Item key="3" > <Button icon="form" onClick={this.detail}>详情</Button></Menu.Item>
  </Menu>
);

const mapData = [{
  draggable: true,
  position:
    {
      longitude: 121.2932245,
      latitude: 31.1925968,
    },
  someProperty: 57
},
  {
    draggable: true,
    position:
      {
        longitude: 121.5195704,
        latitude: 31.2460267,
      },
    someProperty: 57
  },
  {
    draggable: true,
    position:
      {
        longitude: 117.090391,
        latitude: 31.812578,
      },
    someProperty: 57
  },
  {
    draggable: true,
    position:
      {//新站区管廊
        longitude: 117.413797,
        latitude: 31.954947,
      },
    someProperty: 57
  },
  {
    draggable: true,
    position:
      {//松江南  30.983012,121.2293614,
        longitude: 121.2293614,
        latitude: 30.983012,
      },
    someProperty: 57
  },
  {
    draggable: true,
    position:
      {//长江隧道  31.3727025,121.6438394,12z
        longitude: 121.687247,
        latitude: 31.317757,
      },
    someProperty: 57
  }

];

const randomMarker = (len) => (//随机makers数据
  Array(len).fill(true).map((e, idx) => ({
    position: {
      longitude: 100 + Math.random() * 30,
      latitude: 30 + Math.random() * 20,
    },
  }))
);

export default class userManage extends PureComponent {


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
   /* this.markers = mapData;//30.859224，119.782202

    let data  = this.markers;

    this.mapCenter = {longitude: 120, latitude: 31};*/
    this.markers = randomMarker(1000);
    this.center = {longitude: 115, latitude: 40};
    this.state = {
      useCluster: true,
    }
  }

  toggleCluster(){
    this.setState({
      useCluster: !this.state.useCluster,
    });
  }

  randomAngle(extData, index){
    if (extData.someProperty % 3 === 0){
      return 45;
    }
    return 0;
  }
  componentDidMount(){
    /*    this.initColums();
        this.init();*/
//加载折线图
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('main'));
    // 绘制图表   textAlign:'center',
    myChart.setOption({
      title: {
        text: '2018年—资产设备类型月度维保统计图',
        left: 'center',
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


    this.initColums();
    this.init();



  }


  initColums =() =>{
    const columns = [{
      title: '维保单号',
      dataIndex: '1',
      id: '1',
      align: 'center',
      key:'1'
    }, {
      title: '资产设备编号',
      dataIndex: '2',
      id: '2',
      align: 'center',
      key:'2'
    },{
      title: '资产设备名称',
      dataIndex: '3',
      id: '3',
      align: 'center',
      key:'3'
    },{
      title: '资产设备类型',
      dataIndex: '4',
      id: '4',
      align: 'center',
      key:'4'
    }, {
      title: '资设所属系统',
      dataIndex: '5',
      id: '5',
      align: 'center',
      key:'5'
    },{
      title: '维保类型',
      dataIndex: '6',
      id: '6',
      align: 'center',
    },
      {
        title: '维保人员',
        dataIndex: '7',
        id: '7',
        align: 'center',
      }, {
        title: '维保时间',
        dataIndex: '8',
        id: '8',
        align: 'center',
      }, {
        title: '维保地点',
        dataIndex: '9',
        id: '9',
        align: 'center',
      }, {
        title: '维保说明',
        dataIndex: '10',
        id: '10',
        align: 'center',
      },
      {//增加操作栏
        title: '操作',
        dataIndex: '9',
        id: '9',
        align: 'center',
        render: () => (
          <Dropdown overlay={<Menu>
            <Menu.Item key="1"><Button style={{ marginRight: 5 }} icon="form" onClick={this.edit}>详情</Button></Menu.Item>
            <Menu.Item key="1"><Button style={{ marginRight: 5 }} icon="form" onClick={this.change}>记录</Button></Menu.Item>
            <Menu.Item key="1"><Button style={{ marginRight: 5 }} icon="form" onClick={this.detail}>测试</Button></Menu.Item>
          </Menu>}>
            <Button >
              更多 <Icon type="down" />
            </Button>
          </Dropdown>




        ),
      }];
    this.setState({columns:columns})
  }

  /*<Dropdown overlay={menu}>
  <Button>
  Actions <Icon type="user" />
  </Button>
  </Dropdown>*/

  init= () =>{
    const thiz = this;

    thiz.setState({dataSource:data})


    /*//加载折线图
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('main'));
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
*/


  }

  //编辑
  edit =()=>{
    // alert("进入定位页面"+"dataq为"+data);
    console.log(this.state);
    const {rows} = this.state
    console.log(rows)
/*    if(rows.length>1){
      Modal.warning({
        title: '警告信息',
        content: '请选中一行数据',
      });
      return;
    }*/
    let  form = FormSub
    this.setState({
     // record:rows[0],
      visible: true,
      form:form
    });
  }

  //变更
  change =()=>{
    const {rows} = this.state
    console.log(rows)
 /*   if(rows.length>1){
      Modal.warning({
        title: '警告信息',
        content: '请选中一行数据',
      });
      return;
    }*/
    console.log("变更...");
    let  form2 = FormSub2
    this.setState({
      form: form2,
      //record:rows[0],
      visible: true,
      title:"资产设备变更",

    });
  }


  //资产详情页
  detail =()=>{
    const {rows} = this.state
    console.log(rows)
  /*  if(rows.length>1){
      Modal.warning({
        title: '警告信息',
        content: '请选中一行数据',
      });
      return;
    }*/
    console.log("资产详情...");
    let  form4 = FormSub4
    this.setState({
      form: form4,
      //record:rows[0],
      visible: true,
      title:"详细信息",
    });
  }

  //获取所有设备位置
  getAll =()=>{
    message.error('功能开发中~~~');
  }

  //新增事件
  onAdd = () => {
    this.setState({
      record: null,
      visible: true
    });
  };

  delete =()=> {
    const {rows,record} = this.state;
    const dataSource = [...this.state.dataSource];
    let thiz = this;
    confirm({
      title: '提示信息',
      content: '确定删除【'+rows.length+'】行数据吗?',
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        let params = []
        rows.map(value=>{
          params.push(value.id);
        });
        DELETE('/users/delete', params , function(result){
          if(result.success){
            thiz.setState({ dataSource: dataSource.filter(item => !rows.some(jtem=>jtem.id == item.id))});
          }else{
            alert(result.message);
          }

        },function(error){
          console.log(error)
        })
      },
      onCancel() {

      },

    })

  }

  //选中项发生变化时的回调
  onSelectChange = (selectedRowKeys,selectedRows) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({rows:selectedRows,record:selectedRows[0]});
  }

  setFileId = (fileId) =>{
    console.log("ffulei"+fileId);
  }

  render() {
    //增加form变量
    let { columns, visible,record,rows,dataSource,form,title} = this.state;

    const rowSelection = {
      onChange: this.onSelectChange,
    };
    const thiz = this;
    //const from = FormSub;
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

    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
        <p>请上传头像</p>
      </div>
    );


    {/* 切换至表格模式*/}

    return(
      <Tabs defaultActiveKey="1">
        <TabPane tab="图表模式" key="1" styles>
          <div id="main"  className="col-md-12" style={{ width: 1200, height: 350 }}/>
          <div style={{ height: 50,textAlign: 'center',marginTop:10}}><span style={{fontSize:20,fontWeight:800}}> 2018年—资产设备维保分布图</span></div>
            <div className="col-md-12" style={{width: 1200, height: 350}}>
              <Map plugins={['ToolBar']} center={this.center} zoom={5}>
                <Markers
                  markers={this.markers}
                  useCluster={this.state.useCluster}
                />
              </Map>
            </div>
        </TabPane>
       <TabPane tab="表格模式" key="2" >
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
        </TabPane>
      </Tabs>
    )

  }
}