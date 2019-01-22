import React, { Component } from 'react';
import {
  Form,
  Tabs,
  Card,
  Icon,
  List,
  message,
  Avatar,
  Row,
  Col,
  Divider,
  Steps,
  Popover,
  Timeline,
  Rate
} from "antd";
import glimg from '../../../../image/gl.jpg'


export default class TaskRecordDetailByCompleted extends Component {

  state = {
    checkNick: false,
    value: undefined,
    treeData:[],
    treeData2:[],
    initLoading: true,
    loading: false,
    record:null,
    result:null
  };


  componentDidMount() {
    this.init();
    this.setState({
      initLoading: false,
    });
  }


  constructor(props){
    super(props);
  }

  onChange = (value) => {
    console.log(value);
    this.setState({ value });
  }

  init=()=>{
    /* const {record} =this.props;
     const Step = Steps.Step;
     let result = '';
     for(let i = 0 ; i < 5;i++){
       let str = "";
       if(i==0){
         let span = <span style={{fontSize:16}}>
                       <p><span>执行人：</span><span style={{marginLeft:10}}>{record.work_user}</span></p>
                       <p><span>结束时间：</span><span style={{marginLeft:10}}>{record.endDate}</span></p>
                       <p><span>当前状态：</span><span style={{marginLeft:10}}>待执行</span></p>
                     </span>;
         result += <Step title="进行中" description = {span} icon='tool'/>

       }else{
         let span = <span style={{fontSize:16}}>
                       <p><span>执行人：</span><span style={{marginLeft:10}}>{record.work_user}</span></p>
                       <p><span>结束时间：</span><span style={{marginLeft:10}}>{record.endDate}</span></p>
                       <p><span>当前状态：</span><span style={{marginLeft:10}}>完成</span></p>
                     </span>;
         result += <Step title="完成" description = {span}  icon='tool' status={"finish"}/>
       }
     }
     this.setState({ result:result });
     console.log(result)*/
  }
  render(){

    const Step = Steps.Step;
    const {record} =this.props;

    const span1 =  <div style={{background: '#EEEEEE',fontSize:16,marginTop: '20px'}}>
                      <div style={{padding:'6px'}}>
                        <h5 style={{color:'#575191'}}>{record.work_name}</h5>
                        <p><span>任务类型：</span><span>任务类型</span></p>
                        <p><i className="iconfont icon-time"></i><span>任务开始时间：</span><span style={{marginLeft:10 ,"font-weight":'bold'}}>{record.startDate}</span></p>
                        <p><i className="iconfont icon-time"></i><span>任务结束时间：</span><span style={{marginLeft:10 ,"font-weight":'bold'}}>{record.endDate}</span></p>
                        <p><span>所属管廊：</span><span style={{marginLeft:10 ,"font-weight":'bold'}}>{record.gallery_name}</span></p>
                      </div>
                    </div>
    const span2 =  <div style={{background: '#EEEEEE',fontSize:16,marginTop: '20px'}}>
      <div style={{padding:'6px'}}>
        <p><i className="iconfont icon-time"></i><span>实际开始时间：</span><span style={{marginLeft:10 ,"font-weight":'bold'}}>{record.startDate}</span></p>
        <p><i className="iconfont icon-time"></i><span>实际结束时间：</span><span style={{marginLeft:10 ,"font-weight":'bold'}}>{record.endDate}</span></p>
        <p><span>执行人：</span><span style={{marginLeft:10 ,"font-weight":'bold'}}>{record.work_user}</span></p>
        <img src={glimg}/>
      </div>
    </div>

    const span3 =  <div style={{background: '#EEEEEE',fontSize:16,marginTop: '20px'}}>
      <div style={{padding:'6px'}}>
        <h4>考核结果</h4>
        <p>总评分: <h3 style={{display: 'inline'}}>25</h3></p>
        <p><span>巡检时间完成率：</span><Rate allowHalf defaultValue={4.0} style={{color:'red'}}/></p>
        <p><span>巡检点到达率：</span><Rate allowHalf defaultValue={2.5} style={{marginLeft: 16 , color:'red'}}/></p>
      </div>
    </div>


    return (
      <div style={{height: 750}}>
        <div >
          <Row style={{padding:10,borderBottom: '1px solid #E8E8E8'}}>
            <Col>
              <p style={{fontSize:22}}><span>{record.work_name}</span><span style={{marginLeft:10,fontSize:22}}>---详细信息</span></p>
            </Col>
          </Row>
        </div>
        <div style={{paddingLeft: '30%'}}>
          <Steps direction="vertical" current={1}>
            <Step description={span1} icon='tool'/>
            <Step description={span2} status="wait"/>
            <Step description={span3} />
          </Steps>
        </div>
      </div>
    )

  }

}


