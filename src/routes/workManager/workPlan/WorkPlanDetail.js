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
  Popover
} from "antd";

/**
 * 工作计划详情页面
 */
export default class WorkPlanDetail extends Component {

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
         let span = <span style={{fontSize:14}}>
                       <p><span>执行人：</span><span style={{marginLeft:10}}>{record.work_user}</span></p>
                       <p><span>结束时间：</span><span style={{marginLeft:10}}>{record.endDate}</span></p>
                       <p><span>当前状态：</span><span style={{marginLeft:10}}>待执行</span></p>
                     </span>;
         result += <Step title="进行中" description = {span} icon='tool'/>

       }else{
         let span = <span style={{fontSize:14}}>
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

    /*    const customDot = (dot, { status, index }) => (
          <Popover content={<span>step {index} status: {status}</span>} placement='left' trigger='click' arrowPointAtCenter={true}>
            {dot}
          </Popover>
        );*/

    const {record} =this.props;
    const span1 =  <p style={{fontSize:20}}><span>{record.gallery_name}</span><span style={{marginLeft:10,fontSize:16}}>{record.work_name}</span></p>
    const span2 =  <span style={{fontSize:14}}><Icon type="reload" style={{color:'#4194ce',marginRight:6}}/>任务详细:  {record.work_detailed}</span>
    const span3 =  <span style={{fontSize:14}}><Icon type="clock-circle" style={{color:'#4194ce',marginRight:6}}/>执行时间:  {record.startDate}</span>
    const span4 =  <span style={{fontSize:14}}><Icon type="unlock" style={{color:'#4194ce' , marginRight:6}}/>计划类型:  {record.work_type}</span>
    const span5 =  <span style={{fontSize:14}}> <Icon type="bars" style={{color:'#4194ce' ,marginRight:6}}/>计划类型:  {record.work_plan_type}</span>

    const span6 =  <span style={{fontSize:14}}>
                      <p><span>执行人：</span><span style={{marginLeft:10}}>{record.work_user}</span></p>
                      <p><span>结束时间：</span><span style={{marginLeft:10}}>{record.endDate}</span></p>
                      <p><span>当前状态：</span><span style={{marginLeft:10}}>待执行</span></p>
                    </span>

    return (
      <div style={{height: 750 ,overflow: 'auto'}}>
        <div>
          <Row style={{marginBottom:15}}>
            <Col>{span1}</Col>
          </Row>
          <Row style={{marginBottom:14}}>
            <Col style={{fontSize:18}}><Icon type="info-circle" style={{marginRight:6}}/>基本信息</Col>
          </Row>
          <Row style={{marginBottom:10}}>
            <Col span={10} style={{marginBottom:8}}>
              {span2}
            </Col>
            <Col span={10} style={{marginBottom:8}}>
              {span3}
            </Col>
            <Col span={10} style={{marginBottom:8}}>
              {span4}
            </Col>
            <Col span={10} style={{marginBottom:8}}>
              {span5}
            </Col>
          </Row>
          <Row style={{marginTop: 32}}>
            <Col style={{fontSize:18}}><Icon type="clock-circle" style={{marginRight:6}}/>历史记录</Col>
          </Row>
        </div>
        <div style={{paddingLeft: '30%'}}>
          <Steps direction="vertical" labelPlacement='vertical'>
            <Step title="进行中" description={span6} icon='tool'/>
            <Step title="完成" description={span6} status={"finish"}/>
            <Step title="完成" description={span6} status={"finish"}/>
            <Step title="完成" description={span6} status={"finish"}/>
            <Step title="完成" description={span6} status={"finish"}/>
            <Step title="完成" description={span6} status={"finish"}/>
            <Step title="完成" description={span6} status={"finish"}/>
          </Steps>
        </div>


      </div>
    )

  }

}


