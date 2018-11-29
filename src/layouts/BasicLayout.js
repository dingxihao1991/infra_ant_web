/**
 * @Author: CJN
 * @Date: 2018/8/23
 * @Description: *
 */
import React, {Fragment, PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Layout, Icon, message} from 'antd';
import DocumentTitle from 'react-document-title';
import {connect} from 'dva';
import {Route, Redirect, Switch, routerRedux} from 'dva/router';
import {ContainerQuery} from "react-container-query";
import GlobalHeader from '../components/GlobalHeader';
import SiderMenu from '../components/SiderMenu';
import classNames from 'classnames';
import logo from '../logo.svg';
import {getMenuData} from "../common/menu";
import pathToRegexp from "path-to-regexp";
import {enquireScreen, unenquireScreen} from "enquire-js";
import {getRoutes} from '../utils/utils';
import Authorized from '../utils/Authorized';
import {getAuthority} from '../utils/authority';
import exception from '../routes/exception/404';
import {ModalForm}  from 'components/Modal';

const {Content, Header} = Layout;
const {AuthorizedRoute, check} = Authorized;

const query = {
    'screen-xs': {
        maxWidth: 575,
    },
    'screen-sm': {
        minWidth: 576,
        maxWidth: 767,
    },
    'screen-md': {
        minWidth: 768,
        maxWidth: 991,
    },
    'screen-lg': {
        minWidth: 992,
        maxWidth: 1199,
    },
    'screen-xl': {
        minWidth: 1200,
        maxWidth: 1599,
    },
    'screen-xxl': {
        minWidth: 1600,
    },
};

/**
 * 根据菜单取得重定向地址.
 */
const redirectData = [];
const getRedirect = item => {
    if (item && item.children) {
        if (item.children[0] && item.children[0].path) {
            redirectData.push({
                from: `${item.path}`,
                to: `${item.children[0].path}`,
            });
            item.children.forEach(children => {
                getRedirect(children);
            });
        }
    }
};
getMenuData().forEach(getRedirect);

/**
 * 获取面包屑映射
 * @param {Object} menuData 菜单配置
 * @param {Object} routerData 路由配置
 */
const getBreadcrumbNameMap = (menuData, routerData) => {
    const result = {};
    const childResult = {};
    for (const i of menuData) {
        if (!routerData[i.path]) {
            result[i.path] = i;
        }
        if (i.children) {
            Object.assign(childResult, getBreadcrumbNameMap(i.children, routerData));
        }
    }
    return Object.assign({}, routerData, result, childResult);
};

const getMenuData1 = () =>{
    let auth = getAuthority();

    return auth?auth.menus: null;

}

@connect(({user, global = {}, loading}) => ({
    collapsed: global.collapsed
}))

export default class BasicLayout extends PureComponent {
    static childContextTypes = {
        location: PropTypes.object,
        breadcrumbNameMap: PropTypes.object,
        userInfo:PropTypes.object,
        openModal:PropTypes.func,
    };


    getChildContext() {
        const {location, routerData} = this.props;

        return {
            location,
            breadcrumbNameMap: getBreadcrumbNameMap(getMenuData1(), routerData),
            userInfo: getAuthority(),
            openModal:this.openModal
        };
    }

    state = {
        message:null,
        visible:false,
        modalFormProps:{
            visible:false
        }
    }
    constructor(props){
        super(props);
       // this.initWebSocket();
    }

    openModal = modalFormProps =>{
        console.log("modalFormProps----",modalFormProps)
        this.setState({visible:modalFormProps?modalFormProps.isShow:false,modalFormProps:modalFormProps});
    }

    onCancel =()=>{
        this.setState({visible:false});
    }

    receiveMessage = (data) =>{
        var result = JSON.parse(data.body);
        this.setState({message:result});

    }


    // initWebSocket= () =>{
    //     let url = 'ws://192.168.8.64:15674/ws';
    //     var stompClient = Stomp.over(new WebSocket(url));
    //     var destination = "/exchange/dtExchange/web-queue_12";
    //
    //     let thiz = this;
    //
    //     stompClient.connect("guest", "guest", function (data) {
    //         stompClient.subscribe(destination, message => {
    //             thiz.receiveMessage(message);
    //         });
    //
    //     }, function (err) {
    //         console.log("webSocket连接失败，5s后重连", err);
    //
    //         setTimeout(function () {
    //             thiz.initWebSocket();
    //         }, 5000);
    //     });
    // }

    getPageTitle() {
        const {routerData, location} = this.props;
        const {pathname} = location;
        let title = '运维管理';
        let currRouterData = null;
        for (const key in Object.keys(routerData)) {
            if (pathToRegexp(key).test(pathname)) {
                currRouterData = routerData[key];
                break;
            }
        }
        if (currRouterData && currRouterData.name) {
            title = `${currRouterData.name} - 运维管理`;
        }
        return title;
    }

    getBaseRedirect = () => {
        const urlParams = new URL(window.location.href);

        const redirect = urlParams.searchParams.get('redirect');
        if (redirect) {
            urlParams.searchParams.delete('redirect');
            window.history.replaceState(null, 'redirect', urlParams.href);
        } else {
            const {routerData} = this.props;
            const authorizedPath = Object.keys(routerData).find(
                item => check(routerData[item].authority, item) && item !== '/'
            );
            return authorizedPath;
        }
        return redirect;
    };

    handleMenuCollapse = collapsed => {
        const {dispatch} = this.props;
        dispatch({
            type: 'global/changeLayoutCollapsed',
            payload: collapsed,
        });
    };

    render() {
        const {
            currentUser,
            collapsed,
            fetchingNotices,
            notices,
            routerData,
            match,
            location,
        } = this.props;
        const {message ,visible ,modalFormProps} = this.state;
        const baseRedirect = this.getBaseRedirect();
        const layout = (
            <Layout>
                <ModalForm visible={visible} onCancel={this.onCancel} {...modalFormProps}/>
                <SiderMenu
                    logo={logo}
                    Authorized={Authorized}
                    menuData={getMenuData1()}
                    collapsed={collapsed}
                    location={location}
                    onCollapse={this.handleMenuCollapse}
                />
                <Layout>
                    <Header style={{padding: 0}}>
                        <GlobalHeader
                            message={message}
                            logo={logo}
                            currentUser={currentUser}
                            fetchingNotices={fetchingNotices}
                            notices={notices}
                            collapsed={collapsed}
                            onCollapse={this.handleMenuCollapse}
                        />
                    </Header>
                    <Content style={{margin: '24px 24px 0', height: '400px'}}>
                        <Switch>
                            {redirectData.map(item => (
                                <Redirect key={item.from} exact from={item.from} to={item.to}/>
                            ))}
                            {getRoutes(match.path, routerData).map(item => (
                                <AuthorizedRoute
                                    key={item.key}
                                    path={item.path}
                                    component={item.component}
                                    exact={item.exact}
                                    authority={item.authority}
                                    redirectPath="/exception/403"
                                />
                            ))}
                            <Redirect exact from="/" to={baseRedirect}/>
                            <Route component={exception}/>
                        </Switch>
                    </Content>
                </Layout>
            </Layout>
        );

        return (
            <DocumentTitle title={this.getPageTitle()}>
                <ContainerQuery query={query}>
                    {params => <div className={classNames(params)}>{layout}</div>}
                </ContainerQuery>
            </DocumentTitle>
        );
    }
}
