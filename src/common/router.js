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
    return !app._models.some(({namespace}) => {
        return namespace === model.substring(model.lastIndexOf('/') + 1);
    });
};

// 面包屑组件控制  控制路由
const dynamicWrapper = (app, models, component) => {
    // register models

    models.forEach(model => {

        if (modelNotExisted(app, model)) {
            console.log("-------"+`${model}`)
            app.model(require(`../${model}`).default);
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
            component: dynamicWrapper(app, ['models/search'], () => import('../layouts/BasicLayout')),
},
    '/index': {
        component: dynamicWrapper(app, [], () => import('../routes/home/HomeIndex')),
    },
    '/user': {
        component: dynamicWrapper(app, [], () => import('../layouts/UserLayout')),
    },
    '/user/login': {
        component: dynamicWrapper(app, ['routes/User/login/model/login'], () => import('../routes/User/login/components/Login')),
    },
    '/user/register': {
        component: dynamicWrapper(app, [], () => import('../routes/User/login/components/Register')),
    },
    '/user/register-result': {
        component: dynamicWrapper(app, [], () => import('../routes/User/login/components/RegisterResult')),
    },
    //权限菜单
    '/auth/application': {
        component: dynamicWrapper(app, ['routes/auth/application/model/applicationModel'], () => import('../routes/auth/application/components/Application')),
    },
    //菜单管理
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
    //资产列表
    '/assetManagement/assetList': {
        component: dynamicWrapper(app, [], () => import('../routes/assetManagement/assetList/components/AssetList')),
    },
    //资产概览
    '/assetManagement/assetOverview': {
        component: dynamicWrapper(app, [], () => import('../routes/assetManagement/assetOverview/components/AssetOverview')),
    },
    //资产维保记录
    '/assetManagement/assetRecord': {
        component: dynamicWrapper(app, [], () => import('../routes/assetManagement/assetRecord/assetRecord.js')),
    },
    //资产备品备件
    '/assetManagement/bomManagement': {
        component: dynamicWrapper(app, [], () => import('../routes/assetManagement/bomManagement/bomManagement.js')),
    },
    //个人中心
    '/personal/centre': {
        component: dynamicWrapper(app, ['routes/User/centre/model/personalCentre','routes/User/centre/model/taskList'], () => import('../routes/User/centre/components/Personal')),
    },
    //操作记录
    '/auth/systemOperationLogs': {
        component: dynamicWrapper(app, [], () => import('../routes/auth/log/LogManage')),
    },
    //工作计划
    '/job/plan': {
        component: dynamicWrapper(app, ['routes/workManager/workPlan/model/jobPlan'], () => import('../routes/workManager/workPlan/components/JobPlan')),
    },
    //监控列表
    '/operationMonitoring/monitoringList': {
        component: dynamicWrapper(app, [], () => import('../routes/operationMonitoring/monitoringList/MonitoringList')),
    },
    //设备控制
    '/operationMonitoring/equipmentControl': {
        component: dynamicWrapper(app, [], () => import('../routes/operationMonitoring/equipmentControl/equipmentControl')),
    },
    //待办任务
    '/job/willdo': {
        component: dynamicWrapper(app, ['routes/workManager/workTask/model/workTask'], () => import('../routes/workManager/workTask/components/TaskPlan')),
    },
    //工作记录
    '/job/record': {
        component: dynamicWrapper(app, ['routes/workManager/workRecord/model/workRecord'], () => import('../routes/workManager/workRecord/components/TaskRecord')),
    },
    //事件记录
    '/job/event': {
        component: dynamicWrapper(app, ['routes/workManager/workEvents/model/workEvent'], () => import('../routes/workManager/workEvents/components/WorkEvent'))
    },

    //预案管理
    '/planManagement/emergencyPlanRecord': {
        component: dynamicWrapper(app, ['routes/planManagement/emergencyPlanRecord/model/emergencyPlanRecord'], () => import('../routes/planManagement/emergencyPlanRecord/components/emergencyPlanRecord')),
    },

    //文档管理
    '/dataManagement/docManagement': {
        component: dynamicWrapper(app, ['routes/documentManagement/model/documentModel'], () => import('../routes/documentManagement/components/DocumentManagement')),
    },

    //巡检配置
    '/system/perambulate': {
        component: dynamicWrapper(app, ['routes/systemConfigManagement/perambulate/model/perambulate'], () => import('../routes/systemConfigManagement/perambulate/components/Perambulate')),
    },

      //费用管理
      '/maintenance/costManager': {
        component: dynamicWrapper(app, ['routes/maintenance/costManager/model/costManager'], () => import('../routes/maintenance/costManager/components/CostManager')),
      },

      //病害处置
      '/maintenance/diseaseDisposal': {
        component: dynamicWrapper(app, ['routes/maintenance/diseaseDisposal/model/diseaseDisposal'], () => import('../routes/maintenance/diseaseDisposal/components/diseaseDisposal')),
      },

      //工程管理
      '/maintenance/projectManager': {
        component: dynamicWrapper(app, ['routes/maintenance/projectManager/model/projectManager'], () => import('../routes/maintenance/projectManager/components/ProjectManager')),
      },

      //运维养护管理
      '/statistics/conserveManager': {
        component: dynamicWrapper(app, ['routes/statistics/conserveManager/model/conserveManager'], () => import('../routes/statistics/conserveManager/components/ConserveManager')),
      },
      //费用核算
      '/maintenance/costCheck': {
        component: dynamicWrapper(app, ['routes/maintenance/costCheck/model/costCheck'], () => import('../routes/maintenance/costCheck/components/CostCheck')),
      },
      //结构安全
      '/model/index': {
        component: dynamicWrapper(app, [], () => import('../routes/model/index')),
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

