import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import styles from './workEvent.less';
import {
  Table ,Button ,Layout,Pagination,Form,Input , message , Menu , Dropdown,Icon,Tree,List,Card,
  Row,Col ,Radio} from 'antd';
import {ModalForm,showConfirm}  from 'components/Modal';
import { POST,GET,PUT,DELETE } from '../../../services/api';
import Authorized from '../../../utils/Authorized';
import FormSub from './FormEvent';
import img4 from '../../../image/4.png'
import img5 from '../../../image/5.png'
import img6 from '../../../image/6.png'
import img7 from '../../../image/7.png'
import { connect } from 'dva';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const { ButtonAuthorize } = Authorized;
const { Content} = Layout;
const Modal = ModalForm.Modal;
const confirm = Modal.confirm;
const Search = Input.Search;


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
    if(flag == '进行中'){
        this.setState({
          data:[
            {
              id:1,
              title: '合肥管廊运营处_紧急巡视',
              unitName:'合肥管廊运营管理处',
              work_user:'周福',
              reasons:'临时任务',
              workType:'紧急巡视',
              startDate:'2018-03-13 08：30：00',
              endDate:'2018-03-13 17：30：00',
              gallery_name:'彩虹西路(将军岭路~鸡鸣山路)',
              ops:'系统管理员',
              eventContent:'彩虹西路管廊发生烟雾报警，彩虹西路管廊发生烟雾报警',
              workLevel:'一级',
              status:'进行中'
            },
            {
              id:2,
              title: '合肥管廊运营处_紧急巡视',
              unitName:'合肥管廊运营管理处',
              work_user:'周福',
              reasons:'临时任务',
              workType:'紧急巡视',
              startDate:'2018-03-13 08：30：00',
              endDate:'2018-03-13 17：30：00',
              gallery_name:'彩虹西路(将军岭路~鸡鸣山路)',
              ops:'系统管理员',
              eventContent:'彩虹西路管廊发生烟雾报警',
              workLevel:'一级',
              status:'进行中'
            },
          ]
        })
    }else if(flag == '等待中'){
      this.setState({
        data:[
          {
            id:3,
            title: '合肥管廊运营处_紧急巡视',
            unitName:'合肥管廊运营管理处',
            work_user:'周福',
            reasons:'临时任务',
            workType:'紧急巡视',
            startDate:'2018-03-13 08：30：00',
            endDate:'2018-03-13 17：30：00',
            gallery_name:'彩虹西路(将军岭路~鸡鸣山路)',
            ops:'系统管理员',
            eventContent:'彩虹西路管廊发生烟雾报警，彩虹西路管廊发生烟雾报警',
            workLevel:'一级',
            status:'等待中'
          },
          {
            id:4,
            title: '合肥管廊运营处_紧急巡视',
            unitName:'合肥管廊运营管理处',
            work_user:'周福',
            reasons:'临时任务',
            workType:'紧急巡视',
            startDate:'2018-03-13 08：30：00',
            endDate:'2018-03-13 17：30：00',
            gallery_name:'彩虹西路(将军岭路~鸡鸣山路)',
            ops:'系统管理员',
            eventContent:'彩虹西路管廊发生烟雾报警',
            workLevel:'一级',
            status:'等待中'
          },
        ]
      })
    }else{
      this.setState({
        data:dataTest
      })
    }
  }

  render() {
    const {
      workEvent :{list},
      loading,
    } = this.props;
    const {data,record,dataSource,treeData} = this.state;
    const rowSelection = {
      onChange: this.onSelectChange,
    };

    const extraContent = (
      <div>
        <RadioGroup defaultValue="all">
          <RadioButton value="all" onClick={()=>this.filter('全部')}>全部</RadioButton>
          <RadioButton value="progress" onClick={()=>this.filter('进行中')}>进行中</RadioButton>
          <RadioButton value="waiting" onClick={()=>this.filter('等待中')}>等待中</RadioButton>
        </RadioGroup>
        <Search style={{marginLeft: 16,width: 272}} placeholder="请输入" onSearch={() => ({})} />
      </div>
    );

    const tittleContent = (
        <ButtonAuthorize icon="plus" type="primary" onClick={this.onAdd} name="新增" authority="role:add" style={{margin:'0px'}}/>
    );

    return(
      <Layout className={styles.application} style={{border:"1px red"}}>
      <div>
        <Row gutter={16}>
          <Col className="gutter-row" span={6}>
            <Card>
              <h5>突发事件</h5>
              <div>
                <div style={{marginTop: 44}}>
                  <span style={{color:'#00c292',fontSize:36}}><img src={img4} style={{marginRight: '62%'}}></img><Icon type="arrow-up" style={{color:'#00c292'}} />5</span>
                </div>
              </div>
            </Card>
          </Col>
          <Col className="gutter-row" span={6}>
            <Card>
              <h5>突发事件</h5>
              <div>
              {/*  <div>
                  <canvas width="67" height="30"
                          style={{display: 'inline-block', width: 67, height: 30, verticalAlign: 'top'}}></canvas>
                </div>*/}
                <div style={{marginTop: 44}}>
                  <span style={{color:'#ab8ce4',fontSize:36}}><img src={img5} style={{marginRight: '62%'}}></img><Icon type="arrow-up" style={{color:'#ab8ce4'}} />8</span>
                </div>
              </div>
            </Card>
          </Col>
          <Col className="gutter-row" span={6}>
            <Card>
              <h5>突发事件</h5>
              <div>
                <div style={{marginTop: 44}}>
                  <span style={{color:'#03a9f3',fontSize:36}}><img src={img6} style={{marginRight: '62%'}}></img><Icon type="arrow-up" style={{color:'#03a9f3'}} />2</span>
                </div>
              </div>
            </Card>
          </Col>
          <Col className="gutter-row" span={6}>
            <Card>
              <h5>突发事件</h5>
              <div>
                <div style={{marginTop: 44}}>
                  <span style={{color:'#e46a76',fontSize:36}}><img src={img7} style={{marginRight: '62%'}}></img><Icon type="arrow-up" style={{color:'#e46a76'}} />6</span>
                </div>
              </div>
            </Card>
          </Col>
        </Row>

        <Card
          className={styles.listCard}
          bordered={true}
          style={{ marginTop: 24 }}
          bodyStyle={{ padding: '0 32px 40px 32px' }}
          extra={extraContent}
          title={tittleContent}
        >
          <div>
            <List
              rowKey="id"
              grid={{ gutter: 24, lg: 3, md: 2, sm: 1, xs: 1 }}
              dataSource={list}
              renderItem={item =>
                (
                  <List.Item key={item.id}>
                    <Card hoverable  title={<h5>{item.title}<span style={{marginLeft:'32%' , color:'#1890ff'}} >{item.status}</span></h5>}
                          actions={[<Icon type="edit" onClick={() => this.edit(item)}/>, <Icon type="close" onClick={() => this.delete(item)}/>]}
                          style={{background: '#f3f3f3'}}>
                      <p style={{fontSize:14 ,color:'#9674ce'}}>{item.eventContent}</p>
                      <p style={{fontSize:14}}><Icon type="clock-circle" style={{color:'#4194ce'}}/>提醒时间：<span>2018-1-1 09：23：44</span></p>
                      <p style={{fontSize:14}}><Icon type="user" style={{color:'#4194ce',marginRight:6}}/>
                        <span>执行人：<span>{item.work_user}</span></span>
                        <span style={{marginLeft:'22%'}}><Icon type="clock-circle" style={{color:'#4194ce'}}/>开始时间：<span>2018-1-2 09：23：44</span></span>
                      </p>
                    </Card>
                  </List.Item>
                )
              }
            />
          </div>
     {/*     <Button
            type="dashed"
            style={{ width: '100%', marginBottom: 8 }}
            icon="plus"
            onClick={this.showModal}
          >
            添加
          </Button>*/}
        </Card>
      </div>

      </Layout>
    )

  }
}
