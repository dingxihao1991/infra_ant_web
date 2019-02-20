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



//维护变更记录
const data2 = [
    {
        title: '管廊系统—合肥管廊高新段—鸡鸣山路排水设备检修',
        description: '工程师李明于2018-11-25在鸡鸣山路完成排水设备检查【周检】',
    },
    {
        title: '隧道系统—上海长江隧道—B1出口处通风设备检修',
        description: '值班长汪飞龙于2017-6-9在长江隧道B1出口完成通风设备检查【月检】',
    },
    {
        title: '车站系统—上海诸光路地铁站—供电系统设备维修',
        description: '车站长李浩然于2018-9-15在诸光路地铁站完成供电设备维修【点检】',
    },{
        title: '管廊系统—合肥管廊新站段—智能照明设备临时检修',
        description: '高级工程师张向阳于2018-10-11在合肥管廊新站段完成对智能照明设备的临时检修【临检】',
    }, {
        title: '管廊系统—合肥管廊高新段—鸡鸣山路排水设备检修',
        description: '工程师李明于2018-11-25在鸡鸣山路完成排水设备检查【周检】',
    },
    {
        title: '隧道系统—上海长江隧道—B1出口处通风设备检修',
        description: '值班长汪飞龙于2017-6-9在长江隧道B1出口完成通风设备检查【月检】',
    },
    {
        title: '车站系统—上海诸光路地铁站—供电系统设备维修',
        description: '车站长李浩然于2018-9-15在诸光路地铁站完成供电设备维修【点检】',
    },{
        title: '管廊系统—合肥管廊新站段—智能照明设备临时检修',
        description: '高级工程师张向阳于2018-10-11在合肥管廊新站段完成对智能照明设备的临时检修【临检】',
    }
];


//文档数据
const listData = [];
for (let i = 0; i < 23; i++) {
    listData.push({
        href: 'http://ant.design',
        title: `关于建设管廊系统安全培训会议的通知`,
        description: '管廊系统—会议通知',
        content: '各市区管廊公司、管廊主体单位...',
    });
}


class AssetDetails extends Component {

    state = {
        checkNick: false,
        value: undefined,
        treeData:[],
        treeData2:[],
        initLoading: true,
        loading: false,
        data: [],
        list: [],
    };


    componentDidMount() {//sp
        this.setState({
            initLoading: false,
        });
    }


    constructor(props){
        super(props);
    }

    //文档分页函数
    onChange = (value) => {
        console.log(value);
        this.setState({ value });
    }

    //编辑
    edit =()=>{
        message.error("功能开发中~~~");
    }

    render(){
        return (
            <Layout className={styles.tabs} style={{background: '#fff',height: '650px'}}>
                <Tabs style={{backgroundColor: '#FBFBFB'}}>
                    <TabPane tab="基本信息" key="1" style={{background: '#fff'}}>
                        <AssetInf />
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

