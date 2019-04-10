import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import styles from '../style/workEvent.less';
import {
  Table ,Button ,Layout,Pagination,Form,Input , message , Menu , Dropdown,Icon,Tree,List,Card,
  Row,Col ,Radio,Tag} from 'antd';
import {ModalForm,showConfirm}  from 'components/Modal';
import { POST,GET,PUT,DELETE } from '../../../../services/api';
import Authorized from '../../../../utils/Authorized';
import FormSub from './FormEvent';
import EditFormEvent from './EditFormEvent';
import img4 from '../../../../image/4.png'
import img5 from '../../../../image/5.png'
import img6 from '../../../../image/6.png'
import img7 from '../../../../image/7.png'
import { connect } from 'dva';

const { Header, Footer, Sider, Content } = Layout;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const { ButtonAuthorize } = Authorized;
const Modal = ModalForm.Modal;
const confirm = Modal.confirm;
const Search = Input.Search;
const Meta = Card.Meta;

let workEventList = [
  {
    id:1,
    title: '复兴东路隧道_设备故障',
    unitName:'',
    work_user:'周福',
    reasons:'临时任务',
    workType:'设备故障',
    startDate:'2018-03-13 08：30：00',
    endDate:'2018-03-13 17：30：00',
    gallery_name:'复兴东路隧道',
    ops:'系统管理员',
    eventContent:'照明灯坏了',
    workLevel:'一级',
    status:'进行中'
  },
  {
    id:2,
    title: '上中路隧道_紧急巡视',
    unitName:'复兴东路隧道',
    work_user:'周福',
    reasons:'临时任务',
    workType:'紧急情况',
    startDate:'2018-03-13 08：30：00',
    endDate:'2018-03-13 17：30：00',
    gallery_name:'上中路隧道',
    ops:'系统管理员',
    eventContent:'巡视隧道安全情况',
    workLevel:'一级',
    status:'进行中'
  },
  {
    id:3,
    title: '上中路隧道_设备故障',
    unitName:'复兴东路隧道',
    work_user:'周福',
    reasons:'临时任务',
    workType:'设备故障',
    startDate:'2018-03-13 08：30：00',
    endDate:'2018-03-13 17：30：00',
    gallery_name:'上中路隧道消防水枪坏了',
    ops:'系统管理员',
    eventContent:'上中路隧道',
    workLevel:'一级',
    status:'待处理'
  },
  {
    id:4,
    title: '西藏南路隧道_紧急巡视',
    unitName:'西藏南路隧道',
    work_user:'周福',
    reasons:'临时任务',
    workType:'紧急情况',
    startDate:'2018-03-13 08：30：00',
    endDate:'2018-03-13 17：30：00',
    gallery_name:'西藏南路隧道',
    ops:'系统管理员',
    eventContent:'巡视地质沉降',
    workLevel:'一级',
    status:'待处理'
  },{
    id:5,
    title: '复兴东路隧道_紧急巡视',
    unitName:'复兴东路隧道',
    work_user:'周福',
    reasons:'临时任务',
    workType:'紧急情况',
    startDate:'2018-03-13 08：30：00',
    endDate:'2018-03-13 17：30：00',
    gallery_name:'复兴东路隧道',
    ops:'系统管理员',
    eventContent:'巡视地质沉降',
    workLevel:'一级',
    status:'已归档'
  },{
    id:6,
    title: '西藏南路隧道_设备故障',
    unitName:'西藏南路隧道',
    work_user:'周福',
    reasons:'临时任务',
    workType:'突发事件',
    startDate:'2018-03-13 08：30：00',
    endDate:'2018-03-13 17：30：00',
    gallery_name:'西藏南路隧道',
    ops:'系统管理员',
    eventContent:'射流风机修理',
    workLevel:'一级',
    status:'已归档'
  },{
    id:7,
    title: '复兴东路隧道_突发事件',
    unitName:'',
    work_user:'周福',
    reasons:'临时任务',
    workType:'突发事件',
    startDate:'2018-03-13 08：30：00',
    endDate:'2018-03-13 17：30：00',
    gallery_name:'复兴东路隧道',
    ops:'系统管理员',
    eventContent:'复兴东路隧道发生撞车事故',
    workLevel:'一级',
    status:'进行中'
  },{
    id:8,
    title: '上中路隧道_突发事件',
    unitName:'上中路隧道',
    work_user:'周福',
    reasons:'临时任务',
    workType:'突发事件',
    startDate:'2018-03-13 08：30：00',
    endDate:'2018-03-13 17：30：00',
    gallery_name:'上中路隧道',
    ops:'系统管理员',
    eventContent:'发生撞车事故',
    workLevel:'一级',
    status:'进行中'
  },{
    id:9,
    title: '西藏南路隧道_突发事件',
    unitName:'西藏南路隧道',
    work_user:'周福',
    reasons:'临时任务',
    workType:'突发事件',
    startDate:'2018-03-13 08：30：00',
    endDate:'2018-03-13 17：30：00',
    gallery_name:'西藏南路隧道',
    ops:'系统管理员',
    eventContent:'发生撞车事故',
    workLevel:'一级',
    status:'进行中'
  },
  {
    id:10,
    title: '西藏南路隧道_设备故障',
    unitName:'西藏南路隧道',
    work_user:'周福',
    reasons:'临时任务',
    workType:'设备故障',
    startDate:'2019-03-13 08：30：00',
    endDate:'2019-03-13 17：30：00',
    gallery_name:'西藏南路隧道',
    ops:'系统管理员',
    eventContent:'交通信号指示灯坏了',
    workLevel:'一级',
    status:'进行中'
  },
];

/*@connect(({loading, workEvent}) => ({
  workEvent
}))*/
export default class workEvent extends PureComponent {

  static contextTypes = {
    openModal: PropTypes.func,
  };

  state = {
    dataSource:[],
    fileDataSource:[],
    record: null,
    visible: false,
    rows: [],
    openSide: true,
    data:[],
  };

  constructor(props,context) {
    super(props,context)
  }

  componentDidMount(){
    /*    const {dispatch } = this.props;
        dispatch({
          type: 'workEvent/fetch',
          payload: {
          },
        });*/
    this.init();
  }

  init= () =>{
    const thiz = this;
    thiz.setState({dataSource:workEventList,fileDataSource:workEventList});
  };

    componentWillReceiveProps = (nextProps) => {
        const {dataSource } = this.state;
        const thiz =this;
        if (nextProps.message != null) {
            var messageType = nextProps.message.header.msgType;

            if (messageType == "TaskMesg" || messageType == "EquipmentMesg" || messageType == "AlertMesg") {
                if (this.props.message == null) {
                    let array = dataSource
                    array.push(nextProps.message.body);
                    this.setState({dataSource:array});
                    console.log(this.state.dataSource)
                } else {

                    if (this.props.message.body.time != nextProps.message.body.time) {
                        let array = dataSource
                        array.push(nextProps.message.body);
                        this.setState({dataSource:array});
                        console.log(this.state.dataSource)
                    }
                }
            }
        }
    }

  //新增事件
  onAdd = () => {
    this.setState({record:null});
    this.openModal(null,FormSub);
  };

  openModal =(record,form)=>{
    const modalFormProps = {
      record:record,
      isShow:true,
      Contents:form,
      modalOpts: {
        width: 700,
      },
      onSubmit: (values) => this.onSubmit(values)
    };
    this.context.openModal(modalFormProps);
  };

  delete =(record)=> {
    const thiz = this;
    confirm({
      title: '提示信息',
      content: '确定删除吗?',
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        const {dataSource} = thiz.state;
        thiz.setState({ dataSource: dataSource.filter(item=> item.id!=record.id)});
      },
      onCancel() {
      },
    })
  };

  onSubmit= (values) =>{
    const thiz = this;
    if(thiz.state.record!=null){
      values['id'] = thiz.state.record.id;
      PUT('/users/update',values,function(data){
        console.log(data);
        if(data.success){
          message.success("更新成功");
          thiz.closeModal();
          thiz.init();
        }else{
          message.success("更新失败，请联系管理员")
        }
      },function(error){
        console.log(error);
      })
    }else {
      POST('/users/add',values,function(data){
        console.log(data);
        if(data.success){
          message.success("新增成功");
          thiz.closeModal();
          thiz.init();
        }else{
          message.success("新增失败，请联系管理员")
        }
      },function(error){
        console.log(error);
      })

    }
  };


  handleSearch = () => {

  };

  filterCard = (flag) => {

    const {fileDataSource} = this.state;
    this.setState({ dataSource: fileDataSource.filter(item => item.workType == flag )});
  }

  filter = (flag) => {
    const {fileDataSource} = this.state;
    if(flag == '全部'){
      this.setState({dataSource:fileDataSource});
      return;
    }
    this.setState({ dataSource: fileDataSource.filter(item=> item.status == flag)});
 /*   const {dispatch } = this.props;
    dispatch({
      type: 'workEvent/filter',
      payload: {
        tags:{
          data:flag
        }
      },
    });*/

  }

  MouseEnter =(id)=>{
        var elem = document.getElementById(id);
        elem.classList.remove('hide-active');
        elem.classList.add('show-active');
  }
  MouseLeave= (id)=>{
        var elem = document.getElementById(id);
        elem.classList.remove('show-active');
        elem.classList.add('hide-active');
  }

  //编辑
  edit =(item)=>{
    console.log(item,"123")
    this.openModal(item,EditFormEvent);
  };

  getTypeCount = (type) =>{
      const {fileDataSource} = this.state;
      return fileDataSource.filter(item => item.workType == type ).length;
  }

  renderItem = (item) =>{

        let title = <h5>{item.title} <span style={{marginLeft:'10%' , color:'#1890ff'}} >{item.status}</span></h5>;

        let color = '';
        if(item.status=='进行中'){
            color = 'blue'
        }
        return(
            <List.Item>
              <Card hoverable className={styles.card}
                    onMouseEnter={this.MouseEnter.bind(this,item.id)}
                    onMouseLeave={this.MouseLeave.bind(this,item.id)}
              >
                <Content>
                  <div>
                    <Card.Meta  title={<a style={{fontSize: '18px',fontWeight: 'bold'}}>{item.title}</a>} description={item.eventContent} />
                    <Tag color={color} style={{ top: '10px',left: '210px', position: 'absolute'}}>{item.status}</Tag>
                  </div>
                  <p style={{fontSize:12}}><Icon type="clock-circle" style={{color:'#4194ce'}}/>提醒时间：<span>2018-1-1 09:23:44</span></p>
                  <p style={{fontSize:12}}><Icon type="clock-circle" style={{color:'#4194ce'}}/>开始时间：<span>2018-1-2 09:23:44</span>
                  </p>
                  <p style={{fontSize:12}}><Icon type="user" style={{color:'#4194ce',marginRight:6}}/>执行人：<span>{item.work_user}</span>
                  </p>
                </Content>

                <div>
                  <div id={item.id} style={{textAlign: 'right',marginTop: '-28px'}} className="hide-active">
                    <div className="btn-group" title="编辑" onClick={()=>this.edit(item)}>
                      <svg className="icon" aria-hidden="true">
                        <use href='#icon-preview-line'></use>
                      </svg>
                    </div>
                    <div className="btn-group" title="删除" onClick={()=>this.delete(item)}>
                      <svg className="icon" aria-hidden="true">
                        <use href='#icon-shanchu'></use>
                      </svg>
                    </div>
                    <div className="btn-group" title="归档">
                      <svg className="icon" aria-hidden="true">
                        <use href='#icon-ziyuanldpi'></use>
                      </svg>
                    </div>
                  </div>
                </div>
              </Card>
            </List.Item>
        )
    }

  render() {

/*    const {
      workEvent :{list},
    } = this.props*/
    let {dataSource} = this.state;

    const extraContent = (
      <div>
        <RadioGroup defaultValue="all">
          <RadioButton value="all" onClick={()=>this.filter('全部')}>全部</RadioButton>
          <RadioButton value="progress" onClick={()=>this.filter('进行中')}>进行中</RadioButton>
          <RadioButton value="waiting" onClick={()=>this.filter('待处理')}>待处理</RadioButton>
          <RadioButton value="complete" onClick={()=>this.filter('已归档')}>已归档</RadioButton>
        </RadioGroup>
        <Search style={{marginLeft: 16,width: 272}} placeholder="请输入" onSearch={() => ({})} />
      </div>
    );

    return(
      <Layout className={styles.workEvent} >
      <div>
        <Row gutter={16} style={{margin: '10px'}}>
          <Col className="gutter-row" span={6}>
            <Card onClick={()=>this.filterCard('设备故障')}>
              <h5>设备故障</h5>
              <div>
                <span style={{marginTop: 44,fontSize:36,color:'#FFDF03'}}>
                    <img src={img4} />
                    <Icon type="arrow-up" style={{color:'#FFDF03'}} />
                    {this.getTypeCount('设备故障')}
                </span>
              </div>
            </Card>
          </Col>
          <Col className="gutter-row" span={6}>
            <Card onClick={()=>this.filterCard('突发事件')}>
              <h5>突发事件</h5>
              <div>
                <span style={{marginTop: 44,fontSize:36,color:'#FC8505'}}>
                    <img src={img5}/>
                    <Icon type="arrow-up" style={{color:'#FC8505'}} />
                    {this.getTypeCount('突发事件')}
                </span>
              </div>
            </Card>
          </Col>
          <Col className="gutter-row" span={6}>
            <Card onClick={()=>this.filterCard('紧急情况')}>
              <h5>紧急情况</h5>
              <div>
                <span style={{marginTop: 44,fontSize:36,color:'red'}}>
                    <img src={img7}/>
                    <Icon type="arrow-up" style={{}} />
                    {this.getTypeCount('紧急情况')}
                </span>
              </div>
            </Card>
          </Col>
          <Col className="gutter-row" span={6}>
            <Card onClick={()=>this.filterCard('其它事件')}>
              <h5>其它事件</h5>
              <div>
                <span style={{marginTop: 44,fontSize:36,color:'#03a9f3'}}>
                  <img src={img6} />
                  <Icon type="arrow-up" style={{color:'#03a9f3'}} />{this.getTypeCount('其它事件')}
                </span>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
      <Content >
        <Header className="header">
            <div>
              <ButtonAuthorize icon="plus" type="primary" onClick={this.onAdd} name="新增" authority="role:add" style={{margin:'0px'}}/>
              <div style={{float:'right'}}>
                  {extraContent}
              </div>
            </div>
        </Header>
        <div className="list-body">
          <List
              rowKey="id"
              grid={{ gutter: 24,column:4}}
              dataSource={dataSource}
              renderItem={this.renderItem}
          />
        </div>
      </Content>
      </Layout>
    )

  }
}
