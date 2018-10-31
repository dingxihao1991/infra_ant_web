/**
 * @Author: CJN
 * @Date: 2018/8/23
 * @Description: public  global  header
 */

import React, {PureComponent} from 'react';
import { Menu, Icon, Spin, Tag, Dropdown, Avatar, Divider, Tooltip,message,Button } from 'antd';
import Debounce from 'lodash-decorators/debounce';
import styles from './index.less';
import {Link} from "react-router-dom";
import NoticeIcon from '../NoticeIcon';
import HeaderSearch from "../HeaderSearch";
import {ModalForm}  from 'components/Modal';
import FormSub from './Form';
import { PUT } from '../../services/api';
import groupBy from 'lodash/groupBy';
import moment from 'moment';
import PropTypes from 'prop-types';

const Modal = ModalForm.Modal;


const data = [
    {
    id: '000000001',
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png',
    title: '你收到了 14 份新周报',
    datetime: '2018-10-25 10:21:30',
    type: '通知',
}, {
    id: '000000002',
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/OKJXDXrmkNshAMvwtvhu.png',
    title: '你推荐的 曲妮妮 已通过第三轮面试',
    datetime: '2018-10-10',
    type: '通知',
}, {
    id: '000000005',
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png',
    title: '内容不要超过两行字，超出时自动截断',
    datetime: '2018-10-07',
    type: '通知',
}, {
    id: '000000006',
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
    title: '曲丽丽 评论了你',
    description: '描述信息描述信息描述信息',
    datetime: '2018-10-07',
    type: '消息',
}, {
    id: '000000007',
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
    title: '朱偏右 回复了你',
    description: '这种模板用于提醒谁与你发生了互动，左侧放『谁』的头像',
    datetime: '2018-10-07',
    type: '消息',
}, {
    id: '000000008',
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
    title: '标题',
    description: '这种模板用于提醒谁与你发生了互动，左侧放『谁』的头像',
    datetime: '2018-10-07',
    type: '消息',
}, {
    id: '000000009',
    title: '任务名称',
    description: '任务需要在 2018-01-12 20:00 前启动',
    extra: '未开始',
    status: 'todo',
    type: '待办',
}, {
    id: '000000010',
    title: '第三方紧急代码变更',
    description: '冠霖提交于 2018-01-06，需在 2018-01-07 前完成代码变更任务',
    extra: '马上到期',
    status: 'urgent',
    type: '待办',
}, {
    id: '000000011',
    title: '信息安全考试',
    description: '指派竹尔于 2018-01-09 前完成更新并发布',
    extra: '已耗时 8 天',
    status: 'doing',
    type: '待办',
}, {
    id: '000000012',
    title: 'ABCD 版本发布',
    description: '冠霖提交于 2018-01-06，需在 2018-01-07 前完成代码变更任务',
    extra: '进行中',
    status: 'processing',
    type: '待办',
}];
export default class GlobalHeader extends PureComponent {

    static contextTypes = {
        location: PropTypes.object,
        breadcrumbNameMap: PropTypes.object,
        userInfo:PropTypes.object
    };

    state = {
        visible: false,
        messageArray:[]
    }

    constructor(props) {
        super(props);
    }

    componentWillReceiveProps = (nextProps) => {
        if (nextProps.message != null) {
            var messageType = nextProps.message.header.msgType;
            console.log("收到消息------------"+messageType,this.props.message)
            if (messageType == "TaskMesg" || messageType == "EquipmentMesg" || messageType == "AlertMesg") {
                if (this.props.message == null) {
                    this.setMessageValue(nextProps.message);
                } else {

                    if (this.props.message.body.time != nextProps.message.body.time) {
                        this.setMessageValue(nextProps.message);
                    }
                }
            }
        }
    }

    toggle = () => {
        const { collapsed, onCollapse } = this.props;
        onCollapse(!collapsed);
        this.triggerResizeEvent();
    };
    /* eslint-disable*/
    @Debounce(600)
    triggerResizeEvent() {
        const event = document.createEvent('HTMLEvents');
        event.initEvent('resize', true, false);
        window.dispatchEvent(event);
    }

    setMessageValue = (data) => {
        var text = "有一条新通知 来自" + data.body.content;
        var msg = new SpeechSynthesisUtterance();
        msg.rate = 1;
        msg.pitch = 1;
        msg.text = text;
        msg.lang = 'zh-CN';
        speechSynthesis.speak(msg);
        this.setState({messageArray:this.state.messageArray.concat([data])})

    }

    getNoticeData(){
        const newNotices = data.map(notice => {
            const newNotice = { ...notice };
            if (newNotice.datetime) {
                newNotice.datetime = moment(notice.datetime).fromNow();
            }
            if (newNotice.id) {
                newNotice.key = newNotice.id;
            }
            if (newNotice.extra && newNotice.status) {
                const color = {
                    todo: '',
                    processing: 'blue',
                    urgent: 'red',
                    doing: 'gold',
                }[newNotice.status];
                newNotice.extra = (
                    <Tag color={color} style={{ marginRight: 0 }}>
                        {newNotice.extra}
                    </Tag>
            );
            }
            return newNotice;
        });

        return groupBy(newNotices, 'type');
    }


    deleteMessage = (record) =>{
        const {messageArray } = this.state;
        this.setState({ messageArray: messageArray.filter(item => !(item.header.msgID==record.key))});
    }

    emptyMessage = () =>{
        this.setState({messageArray:[]});
    }

    getMessageData() {
        const {messageArray} = this.state;
        const newNotices = messageArray.map(notice => {
            const newNotice = { ...notice };

            newNotice.avatar = 'http://localhost:8888/image/Error_48px.png';
            newNotice.datetime = moment(notice.header.sendTime).fromNow();
            newNotice.key = newNotice.header.msgID;
            newNotice.title = newNotice.body.title;
            newNotice.description = newNotice.body.content;
            newNotice.extra = (
                // <Tag color={color} style={{ marginRight: 0 }}>
                //     {newNotice.extra}
                // </Tag>
                //<span >
                    <Icon type="close" style={{ fontSize: '16px', color: '#08c' }} onClick={this.deleteMessage.bind(this, newNotice)}/>
                //</span>


            );
            return newNotice;
        });
        return newNotices;
    }
    //下拉菜单事件
    onMenuClick=( item, key, keyPath )=>{
        //修改密码
        if(item.key=='updatePassword'){
            this.setState({
                visible: true
            });
        }
    }
    //修改密码
    passwordSub = (values) =>{
        var thiz = this;
        PUT('/users/updatePassword',values,function(result){
            if(result.success){
                message.success('修改成功')
                thiz.closeModal();
            }else{
                Modal.error({
                    title: '提示信息',
                    content: '旧密码验证失败',
                });
            }
        })
    }
    //关闭弹窗
    closeModal = () =>{
        this.setState({
            visible: false
        });
    }

    //清空通知
    onNoticeClear = type =>{
        console.log("type-----------"+type)
        if(type == "消息"){
            this.emptyMessage();
        }
    }

    render() {

        const {
            currentUser = {name:this.context.userInfo.userName,avatar:'http://localhost:8888/image/psb.jpg'},
            collapsed,
            fetchingNotices,
            isMobile,
            logo,
            onNoticeVisibleChange,
            onMenuClick,
            onNoticeClear,

        } = this.props;
        const noticeData = this.getNoticeData();
        const {visible } =this.state
        const menu = (
            <Menu className={styles.menu} selectedKeys={[]} onClick={this.onMenuClick}>
                <Menu.Item key="">
                    <Icon type="user" />个人中心
                </Menu.Item>
                <Menu.Item >
                    <Icon type="setting" />设置
                </Menu.Item>
                <Menu.Item key="updatePassword">
                    <Icon type="edit" />修改密码
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item key="logout" >
                    <Icon type="logout" />退出登录
                </Menu.Item>
            </Menu>
        );

        const modalFormProps = {
            loading: true,
            visible,
            Contents:FormSub,
            modalOpts: {
                width: 500,
            },
            onCancel: () => this.closeModal(),
            onSubmit: (values) => this.passwordSub(values)
        }

        return (
            <div className={styles.header}>
                {isMobile && [
                    <Link to="/" className={styles.logo} key="logo">
                        <img src={logo} alt="logo" width="32" />
                    </Link>,
                    <Divider type="vertical" key="line" />,
                ]}
                <Icon
                    className={styles.trigger}
                    type={collapsed ? 'menu-unfold' : 'menu-fold'}
                    onClick={this.toggle}
                />
                <div className={styles.right}>
                    <HeaderSearch
                        className={`${styles.action} ${styles.search}`}
                        placeholder="搜索"
                        dataSource={[]}
                        onSearch={value => {
                            console.log('input', value);
                        }}
                        onPressEnter={value => {
                            console.log('enter', value);
                        }}
                    />
                    <NoticeIcon
                        className={styles.action}
                        onItemClick={(item, tabProps) => {
                            console.log(item, tabProps);
                        }}
                        onClear={this.onNoticeClear}
                        onPopupVisibleChange={onNoticeVisibleChange}
                        loading={fetchingNotices}
                        popupAlign={{ offset: [20, -16] }}
                    >
                        <NoticeIcon.Tab
                            list={noticeData["通知"]}
                            title="通知"
                            emptyText="你已查看所有通知"
                            emptyImage="https://gw.alipayobjects.com/zos/rmsportal/wAhyIChODzsoKIOBHcBk.svg"
                        />
                        <NoticeIcon.Tab
                            list={this.getMessageData()}
                            title="消息"
                            emptyText="您已读完所有消息"
                            emptyImage="https://gw.alipayobjects.com/zos/rmsportal/sAuJeJzSKbUmHfBQRzmZ.svg"
                        />
                        <NoticeIcon.Tab
                            list={noticeData["待办"]}
                            title="待办"
                            emptyText="你已完成所有待办"
                            emptyImage="https://gw.alipayobjects.com/zos/rmsportal/HsIsxMZiWKrNUavQUXqx.svg"
                        />
                    </NoticeIcon>
                    {currentUser.name ? (
                        <Dropdown overlay={menu}>
                          <span className={`${styles.action} ${styles.account}`}>
                            <Avatar size="small" className={styles.avatar} src={currentUser.avatar} />
                            <span className={styles.name}>{currentUser.name}</span>
                          </span>
                        </Dropdown>
                    ) : (
                        <Spin size="small" style={{ marginLeft: 8 }} />
                    )}
                </div>
                <ModalForm {...modalFormProps}/>
            </div>
        );
    }
}