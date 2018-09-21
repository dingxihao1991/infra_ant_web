/**
 * @Author: CJN
 * @Date: 2018/8/23
 * @Description: 菜单目录
 */

import { isUrl } from '../utils/utils';

const menuData = [
    {
        name: '资产备品备件管理',
        icon: 'dashboard',
        path: 'facility',
        children: [
            {
                name: '设备资产',
                path: 'assets',
            },
            {
                name: '备品备件',
                path: 'spare',
            }
        ],
    },
    {
        name: '账户',
        icon: 'user',
        path: 'user',
        authority: 'guest',
        children: [
            {
                name: '登录',
                path: 'login',
            },
            {
                name: '注册',
                path: 'register',
            },
            {
                name: '注册结果',
                path: 'register-result',
            },
        ],
    },
    {
        name: '权限中心',
        icon: 'dashboard',
        path: 'auth',
        children: [
            {
                name: '应用管理',
                path: 'application',
            },{
                name: '菜单管理',
                path: 'MenuManage',
            },{
                name: '用户管理',
                path: 'userManage',
            },{
                name: '角色管理',
                path: 'roleManage',
            },

        ],
    },
];

function formatter(data, parentPath = '/', parentAuthority) {
    return data.map(item => {
        let { path } = item;
        if (!isUrl(path)) {
            path = parentPath + item.path;
        }
        const result = {
            ...item,
            path,
            authority: item.authority || parentAuthority,
        };
        if (item.children) {
            result.children = formatter(item.children, `${parentPath}${item.path}/`, item.authority);
        }

        return result;
    });
}

export const getMenuData = () => formatter(menuData);
