import React, { Component,PureComponent } from 'react';
import {
    Icon,Layout
} from "antd";
import SideLayout from 'components/SideLayout';
import styles from '../../style/asserDetails.less';

const { Content} = Layout;



export default class AssetInfo extends PureComponent{

    render(){
        return (
            <Layout className="asset-datail">
                <header className="panel_header" style={{float:'left'}}>
                    <h2 className="title pull-left">
                        智能照明设备
                        <small>({"NV-TB9716"})</small>
                    </h2>
                </header>
                <Layout className={styles.modelInfo}  style={{float:'left',padding:'10px',width:'100%',height:'492px'}}>
                    <SideLayout
                        title="组织机构"
                        width={450}
                        handleSearch={this.handleSearch}
                        sideContent={
                            <div style={{border:'1px solid #edf1f2',width:'100%',height:'400px'}}>
                                <img src='/images/35kv.png' width="100%" height="100%"/>
                            </div>
                        }
                    >
                    </SideLayout>
                    <Content style={{margin:'10px', paddingLeft: '20px',height: '100%'}}>
                        <div className="" >
                            <div className="col-md-12">
                                <h4>基本信息</h4>
                            </div>
                            <div className="line line-lg b-b b-light"></div>
                            <div className="col-md-6">
                                <p>编号：NV-TB9716</p>
                            </div>
                            <div className="col-md-6">
                                <p>名称：智能照明设备</p>
                            </div>
                            <div className="col-md-6">
                                <p>类型：照明系统</p>
                            </div>
                            <div className="col-md-6">
                                <p>使用日期：2018-10-12</p>
                            </div>
                            <div className="col-md-6">
                                <p>使用年限：1年</p>
                            </div>
                            <div className="col-md-6">
                                <p>安装地点：上海市青浦区诸光路</p>
                            </div>
                            <div className="col-md-6">
                                <p>供应日期：2018-10-12</p>
                            </div>
                            <div className="col-md-6">
                                <p>出厂日期：2018-10-12</p>
                            </div>
                            <div className="line line-lg b-b b-light"></div>
                            <div className="col-md-12">
                                <p>供应商：/</p>
                            </div>
                            <div className="col-md-12">
                                <p>生产商：/</p>
                            </div>
                            <div className="col-md-12 text-right" style={{paddingRight: '20px'}}>
                                <img src="/images/APPQR.png" className="img-thumbnail" width="150px" height="150px"/>
                            </div>
                        </div>
                    </Content>
                </Layout>
            </Layout>
        )
    }

}