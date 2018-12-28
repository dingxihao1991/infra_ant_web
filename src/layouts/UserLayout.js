import React, {PureComponent} from 'react';
import {Redirect, Switch, Route} from 'dva/router';
import DocumentTitle from 'react-document-title';
import styles from './UserLayout.less';
import {getRoutes, getPageQuery, getQueryPath} from '../utils/utils';


function getLoginPathWithRedirectPath() {
    const params = getPageQuery();
    const {redirect} = params;
    return getQueryPath('/user/login', {
        redirect,
    });
}

class UserLayout extends PureComponent {
    getPageTitle() {
        const {routerData, location} = this.props;

        const {pathname} = location;

        let title = '运维管理平台';
        if (routerData[pathname] && routerData[pathname].name) {
            title = `${routerData[pathname].name} - 运维管理平台`;
        }
        return title;
    }

    render() {
        const {routerData, match} = this.props;

        return (
            <DocumentTitle title={this.getPageTitle()}>
                <div className={styles.container}>
                    <div className={styles.content}>
                        <h1 className={styles.top} style={{padding: '25px'}}>账户登录</h1>
                        <div>
                            <Switch>
                                {getRoutes(match.path, routerData).map(item => (
                                    <Route
                                        key={item.key}
                                        path={item.path}
                                        component={item.component}
                                        exact={item.exact}
                                    />
                                ))}
                                <Redirect from="/user" to={getLoginPathWithRedirectPath()}/>
                            </Switch>
                        </div>
                        <div className={styles.footer}>
                            <div style={{marginLeft:'10px',float:'left'}}>
                                <span>基于BIM的运维管理平台<br/></span>
                                <span>@2018</span>
                            </div>
                            <div style={{marginRight:'10px',float:'right'}}>
                                <div className={styles.qrcode}></div>
                                <div style={{float:'left'}}>
                                    <a>扫二维码<br/></a>
                                    <a style={{coloe:'#2a9ae9'}}>移动端下载</a>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </DocumentTitle>
        );
    }
}

export default UserLayout;
