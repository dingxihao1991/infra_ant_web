import React, { Component,PureComponent } from 'react';
import {
    Icon,Layout,Steps
} from "antd";
import SideLayout from 'components/SideLayout';

const Step = Steps.Step;
const { Content} = Layout;

export default  class AssetExchange extends PureComponent{

    render(){

        const span6 =  <div style={{background: '#F5F5F5',fontSize:16,marginTop: '20px'}}>
            <div style={{padding:'6px'}}>
                <p style={{marginBottom:'0px'}}><span>状态：</span><span>报废</span></p>
                <p style={{marginBottom:'0px'}}><span>变更时间：</span><span style={{marginLeft:10}}>2019-02-10</span></p>
                <p style={{marginBottom:'0px'}}><span>变更人：</span><span style={{marginLeft:10}}>系统管理员</span></p>
            </div>
        </div>

        return(
            <Layout className="asset-datail">
                <header className="panel_header" style={{float:'left'}}>
                    <h2 className="title pull-left">
                        智能照明设备
                        <small>({"NV-TB9716"})</small>
                    </h2>
                </header>
                <Layout style={{float:'left',padding:'10px',width:'100%'}}>
                    <Steps current={1}  direction="vertical">
                        <Step description={span6} icon='tool' status="finish"/>
                        <Step description={span6} icon='tool' status="finish"/>
                        <Step description={span6} icon='tool' status="finish"/>
                        <Step description={span6} icon='tool' status="finish"/>
                        <Step description={span6} icon='tool' status="finish"/>
                        <Step description={span6} icon='tool' status="finish"/>
                        <Step description={span6} icon='tool' status="finish"/>
                    </Steps>
                </Layout>
            </Layout>
        )
    }
}