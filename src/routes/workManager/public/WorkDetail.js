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
    Timeline
} from "antd";



/**
 * 工作计划详情页面
 */
export default class WorkDetail extends Component {

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

    render(){

        const Step = Steps.Step;

        const {record} =this.props;
        const span1 =  <p style={{fontSize:20}}><span>{record.gallery_name}</span><span style={{marginLeft:10,fontSize:16}}>{record.work_name}</span></p>
        const span2 =  <span style={{fontSize:16}}><Icon type="reload" style={{color:'#4194ce',marginRight:6}}/><span style={{fontWeight: 'bolder'}}>任务详细: </span>{record.work_detailed}</span>
        const span3 =  <span style={{fontSize:16}}><Icon type="clock-circle" style={{color:'#4194ce',marginRight:6}}/><span style={{fontWeight: 'bolder'}}>预计开始时间: </span>{record.startDate}</span>
        const span4 =  <span style={{fontSize:16}}><Icon type="unlock" style={{color:'#4194ce' , marginRight:6}}/><span style={{fontWeight: 'bolder'}}>任务类型: </span>{record.work_type}</span>
        const span5 =  <span style={{fontSize:16}}> <Icon type="bars" style={{color:'#4194ce' ,marginRight:6}}/><span style={{fontWeight: 'bolder'}}>执行人: </span> {record.work_plan_type}</span>
        const span7 =  <span style={{fontSize:16}}> <Icon type="user" style={{color:'#4194ce' ,marginRight:6}}/><span style={{fontWeight: 'bolder'}}>预计结束时间: </span> {record.startDate}</span>

        const span6 =  <div style={{background: '#EEEEEE',fontSize:16,marginTop: '20px'}}>
            <div style={{padding:'6px'}}>
                <h5 style={{color:'#575191'}}>A-001-B-01</h5>
                <p><span>描述：</span><span>UPS蓄电检查</span></p>
                <p><i className="iconfont icon-time"></i><span>完成时间：</span><span style={{marginLeft:10}}>{record.endDate}</span></p>
                <p><span>当前状态：</span><span style={{marginLeft:10}}>待执行</span></p>
            </div>
        </div>

        return (
            <div style={{height: '646px',padding: '10px',overflow:' auto'}}>
                <div >
                    <Row style={{padding:10,borderBottom: '1px solid #E8E8E8'}}>
                        <Col>{span1}</Col>
                    </Row>
                    <Row style={{padding:10,borderBottom: '1px solid #E8E8E8'}}>
                        <Col style={{fontSize:18}}><Icon type="info-circle" style={{marginRight:6}}/>基本信息</Col>
                    </Row>
                    <Row style={{padding:10,borderBottom: '1px solid #E8E8E8'}} >
                        <Col  span={8}>
                            {span2}
                        </Col>
                        <Col span={8} >
                            {span3}
                        </Col>
                        <Col span={8} >
                            {span4}
                        </Col>
                    </Row>
                    <Row style={{padding:10}}  >
                        <Col span={8}>
                            {span5}
                        </Col>
                        <Col span={8}>
                            {span7}
                        </Col>
                    </Row>

                    <Row style={{marginTop: 32}}>
                        <Col style={{fontSize:18}}><Icon type="clock-circle" style={{marginRight:6}}/>历史记录</Col>
                    </Row>
                </div>
                <div style={{paddingLeft: '20%'}}>
                    <Steps direction="vertical" current={1}>
                        <Step description={span6} icon='tool'/>
                        <Step description={span6} status="wait"/>
                        <Step description={span6} />
                        <Step description={span6} />
                        <Step description={span6} />
                        <Step description={span6} />
                        <Step description={span6} />
                    </Steps>
                </div>


            </div>
        )

    }

}


