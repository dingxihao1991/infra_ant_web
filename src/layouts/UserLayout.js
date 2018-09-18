import React, {PureComponent} from 'react';
import {Link, Redirect, Switch, Route} from 'dva/router';
import DocumentTitle from 'react-document-title';
import styles from './UserLayout.less';
import {getRoutes, getPageQuery, getQueryPath} from '../utils/utils';


const links = [
    {
        key: 'help',
        title: '帮助',
        href: '',
    },
    {
        key: 'privacy',
        title: '隐私',
        href: '',
    },
    {
        key: 'terms',
        title: '条款',
        href: '',
    },
];


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
                        <div className={styles.contentCenter}>
                            <div>
                                <h2 className={styles.top} style={{padding: '25px'}}>账号登录</h2>
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
                        </div>
                    </div>
                </div>
            </DocumentTitle>
        );
    }
}

export default UserLayout;
