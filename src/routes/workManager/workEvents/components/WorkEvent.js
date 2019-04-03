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

@connect(({loading, workEvent}) => ({
  workEvent
}))
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
    const {dispatch } = this.props;
    dispatch({
      type: 'workEvent/fetch',
      payload: {
      },
    });
  }

  init= () =>{
    /*const thiz = this;
    GET('/users',function(data){
      if(data.success){
        thiz.setState({
          fileDataSource:data.result.users,
          dataSource:data.result.users,
          treeData:data.result.org,
          treeDataSote: data.result.org,
        })
      }
    },function(error){
      console.log(error)
    })*/
  };

  //编辑
  edit =(item)=>{
    this.openModal(item);
  };

  //新增事件
  onAdd = () => {
    this.setState({record:null});
    this.openModal(null);
  };

  openModal =(record)=>{
    const modalFormProps = {
      record:record,
      isShow:true,
      Contents:FormSub,
      modalOpts: {
        width: 700,
      },
      onSubmit: (values) => this.onSubmit(values)
    };
    this.context.openModal(modalFormProps);
  };

  delete =(item)=> {
    const {rows,record} = this.state;
    alert(item.id);
  };

  //选中项发生变化时的回调
  onSelectChange = (selectedRowKeys,selectedRows) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({rows:selectedRows,record:selectedRows[0]});
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

  closeModal = () =>{
    this.setState({
      visible: false
    });
  };

  onSelect = (selectedKey) => {

  };

  handleSearch = () => {

  };

  filter = (flag) => {
    const {dispatch } = this.props;
    dispatch({
      type: 'workEvent/filter',
      payload: {
        tags:{
          data:flag
        }
      },
    });
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

                  <Card.Meta title={<a style={{fontSize: '18px',fontWeight: 'bold'}}>{item.title}</a>} description={item.eventContent} />
                  <Tag color={color} style={{   top: '18px',left: '250px', position: 'absolute'}}>{item.status}</Tag>
                  <p style={{fontSize:14}}><Icon type="clock-circle" style={{color:'#4194ce'}}/>提醒时间：<span>2018-1-1 09:23:44</span></p>
                  <p style={{fontSize:14}}><Icon type="clock-circle" style={{color:'#4194ce'}}/>开始时间：<span>2018-1-2 09:23:44</span>
                  </p>
                  <p style={{fontSize:14}}><Icon type="user" style={{color:'#4194ce',marginRight:6}}/>执行人：<span>{item.work_user}</span>
                  </p>
                </Content>

                <div>
                  <div id={item.id} style={{textAlign: 'right',marginTop: '-30px'}} className="hide-active">
                    <div className="btn-group" title="编辑" >
                      <svg className="icon" aria-hidden="true">
                        <use href='#icon-preview-line'></use>
                      </svg>
                    </div>
                    <div className="btn-group" title="删除">
                      <svg className="icon" aria-hidden="true">
                        <use href='#icon-shanchu'></use>
                      </svg>
                    </div>
                    <div className="btn-group" title="下载">
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

    const {
      workEvent :{list},
    } = this.props;

    const extraContent = (
      <div>
        <RadioGroup defaultValue="all">
          <RadioButton value="all" onClick={()=>this.filter('全部')}>全部</RadioButton>
          <RadioButton value="progress" onClick={()=>this.filter('进行中')}>进行中</RadioButton>
          <RadioButton value="waiting" onClick={()=>this.filter('待处理')}>待处理</RadioButton>
          <RadioButton value="complete" onClick={()=>this.filter('已完成')}>已完成</RadioButton>
        </RadioGroup>
        <Search style={{marginLeft: 16,width: 272}} placeholder="请输入" onSearch={() => ({})} />
      </div>
    );

    return(
      <Layout className={styles.workEvent} >
      <div>
        <Row gutter={16} style={{marginLeft:'5px', marginRight: '0px', marginTop:'10px'}}>
          <Col className="gutter-row" span={6}>
            <Card>
              <h5>设备故障</h5>
              <div>
                <div style={{marginTop: 44}}>
                  <span style={{color:'#FFDF03',fontSize:36}}>
                    <img src={img4} style={{marginRight: '62%'}}></img><Icon type="arrow-up" style={{color:'#FFDF03'}} />5
                  </span>
                </div>
              </div>
            </Card>
          </Col>
          <Col className="gutter-row" span={6}>
            <Card>
              <h5>突发事件</h5>
              <div>
                <div style={{marginTop: 44}}>
                  <span style={{color:'#FC8505',fontSize:36}}><img src={img5} style={{marginRight: '62%'}}></img><Icon type="arrow-up" style={{color:'#FC8505'}} />8</span>
                </div>
              </div>
            </Card>
          </Col>
          <Col className="gutter-row" span={6}>
            <Card>
              <h5>紧急情况</h5>
              <div>
                <div style={{marginTop: 44}}>
                  <span style={{color:'red',fontSize:36}}><img src={img7} style={{marginRight: '62%'}}></img><Icon type="arrow-up" style={{color:'red'}} />2</span>
                </div>
              </div>
            </Card>
          </Col>
          <Col className="gutter-row" span={6}>
            <Card>
              <h5>其它事件</h5>
              <div>
                <div style={{marginTop: 44}}>
                  <span style={{color:'#03a9f3',fontSize:36}}><img src={img6} style={{marginRight: '62%'}}></img><Icon type="arrow-up" style={{color:'#03a9f3'}} />6</span>
                </div>
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
                grid={{ gutter: 16,column:4}}
                dataSource={list}
                renderItem={this.renderItem}
            />
          </div>
        </Content>
      </Layout>
    )

  }
}
