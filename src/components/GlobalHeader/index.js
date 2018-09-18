/**
 * @Author: CJN
 * @Date: 2018/8/23
 * @Description: public  global  header
 */

import React, {PureComponent} from 'react';
import { Menu, Icon, Spin, Tag, Dropdown, Avatar, Divider, Tooltip } from 'antd';
import moment from 'moment';
import groupBy from 'lodash/groupBy';
import Debounce from 'lodash-decorators/debounce';
import styles from './index.less';
import {Link} from "react-router-dom";
import NoticeIcon from '../NoticeIcon';
import HeaderSearch from "../HeaderSearch";

export default class GlobalHeader extends PureComponent {
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

    render() {
        const {
            currentUser = {},
            collapsed,
            fetchingNotices,
            isMobile,
            logo,
            onNoticeVisibleChange,
            onMenuClick,
            onNoticeClear,
        } = this.props;
        const menu = (
            <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
                <Menu.Item disabled>
                    <Icon type="user" />个人中心
                </Menu.Item>
                <Menu.Item disabled>
                    <Icon type="setting" />设置
                </Menu.Item>
                <Menu.Item key="triggerError">
                    <Icon type="close-circle" />触发报错
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item key="logout">
                    <Icon type="logout" />退出登录
                </Menu.Item>
            </Menu>
        );

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
                        onClear={onNoticeClear}
                        onPopupVisibleChange={onNoticeVisibleChange}
                        loading={fetchingNotices}
                        popupAlign={{ offset: [20, -16] }}
                    >
                        <NoticeIcon.Tab
                            title="通知"
                            emptyText="你已查看所有通知"
                            emptyImage="https://gw.alipayobjects.com/zos/rmsportal/wAhyIChODzsoKIOBHcBk.svg"
                        />
                        <NoticeIcon.Tab
                            title="消息"
                            emptyText="您已读完所有消息"
                            emptyImage="https://gw.alipayobjects.com/zos/rmsportal/sAuJeJzSKbUmHfBQRzmZ.svg"
                        />
                        <NoticeIcon.Tab
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
            </div>
        );
    }
}