/**
 * @Author: CJN
 * @Date: 2018/8/23
 * @Description: router setting 路由设置 配置 组建面包屑 引用，权限控制器
 */
import React, {createElement} from 'react';
import {Spin} from 'antd';
import pathToRegexp from 'path-to-regexp';
import Loadable from 'react-loadable';
import {getMenuData} from './menu';

let routerDataCache;

const getRouterDataCache = app => {
    if (!routerDataCache) {
        routerDataCache = getRouterData(app);
    }
    return routerDataCache;
};

const modelNotExisted = (app, model) => {
    !app._models.some(({namespace}) => {
        return namespace === model.substring(model.lastIndexOf('/') + 1);
    });
};

// 面包屑组件控制  控制路由
const dynamicWrapper = (app, models, component) => {
    // register models
    models.forEach(model => {
        if (modelNotExisted(app, model)) {
            app.model(require(`../models/${model}`).default);
        }
    });

    // () => require('module')
    // transformed by babel-plugin-dynamic-import-node-sync
    if (component.toString().indexOf('.then(') < 0) {
        return props => {
            return createElement(component().default, {
                ...props,
                routerData: getRouterDataCache(app),
            });
        };
    }
    // () => import('module')
    return Loadable({
        loader: () => {
            return component().then(raw => {
                const Component = raw.default || raw;
                return props =>
                    createElement(Component, {
                        ...props,
                        routerData: getRouterDataCache(app),
                    });
            });
        },
        loading: () => {
            return <Spin size="large" className="global-spin"/>;
        },
    });
};

function getFlatMenuData(menus) {
    let keys = {};
    menus.forEach(item => {
        if (item.children) {
            keys[item.path] = {...item};
            keys = {...keys, ...getFlatMenuData(item.children)};
        } else {
            keys[item.path] = {...item};
        }
    });
    return keys;
}

function findMenuKey(menuData, path) {
    const menuKey = Object.keys(menuData).find(key => pathToRegexp(path).test(key));
    if (menuKey == null) {
        if (path === '/') {
            return null;
        }
        const lastIdx = path.lastIndexOf('/');
        if (lastIdx < 0) {
            return null;
        }
        if (lastIdx === 0) {
            return findMenuKey(menuData, '/');
        }
        return findMenuKey(menuData, path.substr(0, lastIdx));
    }
    return menuKey;
}

export const getRouterData = app => {
    //!!!! router set data  ....config  add router !!!!
    const routerConfig = {
        '/': {
            component: dynamicWrapper(app, ['user'], () => import('../layouts/BasicLayout')),
        },
        '/facility/assets': {
            component: dynamicWrapper(app, ['assets'], () => import('../routes/Facility/Assets')),
        },
        '/facility/spare': {
            component: dynamicWrapper(app, ['spare'], () => import('../routes/Facility/Spare')),
        },
        '/user': {
            component: dynamicWrapper(app, [], () => import('../layouts/UserLayout')),
        },
        '/user/login': {
            component: dynamicWrapper(app, ['login'], () => import('../routes/User/Login')),
        },
        '/user/register': {
            component: dynamicWrapper(app, ['register'], () => import('../routes/User/Register')),
        },
        '/user/register-result': {
            component: dynamicWrapper(app, [], () => import('../routes/User/RegisterResult')),
        },
        //权限菜单
        '/auth/application': {
            component: dynamicWrapper(app, [], () => import('../routes/auth/application/Application')),
        },
        '/auth/MenuManage': {
            component: dynamicWrapper(app, [], () => import('../routes/auth/menu/MenuManage')),
        },
        //用户管理
        '/auth/userManage': {
            component: dynamicWrapper(app, [], () => import('../routes/auth/user/UserManage')),
        },
        //角色管理
        '/auth/roleManage': {
            component: dynamicWrapper(app, [], () => import('../routes/auth/role/RoleManage')),
        },
        //机构管理
        '/auth/organizationManage': {
            component: dynamicWrapper(app, [], () => import('../routes/auth/organization/organizationManage')),
        },
      //echart测试
      '/echartsDemo/test': {
        component: dynamicWrapper(app, [], () => import('../routes/echartsDemo/test')),
      },
      //echart测试
      '/echartsDemo/test2': {
        component: dynamicWrapper(app, [], () => import('../routes/echartsDemo/test2')),
      },
        //个人中心
        '/personal/centre': {
            component: dynamicWrapper(app, [], () => import('../routes/User/centre/PersonalCentre')),
        },


    };

    /*  !!!!! Don't  touch  me !!!!! */
    // menu.js  getData router
    const menuData = getFlatMenuData(getMenuData());

    // eg. {name,authority ...routerConfig }
    const routerData = {};
    // The route matches the menu
    Object.keys(routerConfig).forEach(path => {
        // eg.  router /user/:id === /user/chen
        const menuKey = findMenuKey(menuData, path);
        let menuItem = {};
        // If menuKey is not empty
        if (menuKey) {
            menuItem = menuData[menuKey];
        }
        let router = routerConfig[path];

        router = {
            ...router,
            name: router.name || menuItem.name,
            authority: router.authority || menuItem.authority,
            hideInBreadcrumb: router.hideInBreadcrumb || menuItem.hideInBreadcrumb,
        };
        routerData[path] = router;
    });
    return routerData;
};

