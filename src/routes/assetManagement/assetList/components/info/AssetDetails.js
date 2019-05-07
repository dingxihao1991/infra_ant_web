import React, { Component } from 'react';
import {
    Form,
    Tabs,
    Card,
    Icon,
    List,
    message,
    Steps,
    Layout
} from "antd";
import styles from '../../style/asserDetails.less';

import AssetInf from './AssetInfo';
import AssetExchange from './AssetExchange';
import AssetDocument from './AssetDocument';
/**
 * 资产详情页面
 *
 * @type {<TOwnProps>(options?: FormCreateOption<TOwnProps>) => ComponentDecorator}
 */

//定义各类变量
const createForm = Form.create;

const TabPane = Tabs.TabPane;
const { Content} = Layout;
const Step = Steps.Step;




class AssetDetails extends Component {


    render(){

        const { record } = this.props;
        return (
            <Layout className={styles.tabs} style={{background: '#fff',height: '650px'}}>
                <Tabs style={{backgroundColor: '#FBFBFB'}}>
                    <TabPane tab="基本信息" key="1" style={{background: '#fff'}}>
                        <AssetInf record={record}/>
                    </TabPane>
                    <TabPane tab="维护变更记录" key="2" style={{background: '#fff'}}>
                        <AssetExchange />
                    </TabPane>
                    <TabPane tab="相关文档" key="3" style={{background: '#fff'}}>
                        <AssetDocument/>
                    </TabPane>
                </Tabs>
            </Layout>
        )

    }

}

export default AssetDetails;

