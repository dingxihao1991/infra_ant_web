import pinyin from 'js-pinyin'

const data =[
    {
        title:'首页',
        id:'1',
        content:'客流',
        menu:'首页',
        children:[],
        path:'/index',
    },
    {
        title:'权限中心',
        id:'2',
        menu:'机构管理',
        content:'管廊',
        path:'/auth/organizationManage',
        children:[
            {
                title:'应用管理',
                id:'3',
                menu:'应用管理',
                content:'应用',
                children:[],
                path:'/auth/application',
            },
            {
                title:'菜单管理',
                id:'4',
                menu:'菜单管理',
                content:'菜单',
                children:[],
                path:'/auth/MenuManage',
            },
        ],

    },
    {
        title:'权限中心1',
        id:'5',
        menu:'机构管理',
        content:'管廊',
        path:'/auth/organizationManage',
        children:[
            {
                title:'应用管理1',
                id:'6',
                menu:'应用管理',
                content:'应用',
                children:[],
                path:'/auth/application',
            },
            {
                title:'菜单管理1',
                id:'7',
                menu:'菜单管理',
                content:'菜单',
                children:[],
                path:'/auth/MenuManage',
            },
        ],

    }, {
        title:'权限中心2',
        id:'5',
        menu:'机构管理',
        content:'管廊',
        path:'/auth/organizationManage',
        children:[
            {
                title:'应用管理1',
                id:'6',
                menu:'应用管理',
                content:'应用',
                children:[],
                path:'/auth/application',
            },
            {
                title:'菜单管理1',
                id:'7',
                menu:'菜单管理',
                content:'菜单',
                children:[],
                path:'/auth/MenuManage',
            },
        ],

    },
]

export default {
    // 支持值为 Object 和 Array
    'POST /api/querySearch': function(req, res, u, b){
        const body = (b && b.body) || req.body;
        const { value} = body;
        if(value.length==0){
            res.send([]);
        }else{
            let result = data.filter(item=>{
                return item.content.indexOf(value)!= -1 || item.title.indexOf(value)!= -1 || item.menu.indexOf(value)!= -1
                    || pinyin.getFullChars(item.content).toLowerCase().indexOf(value)!= -1 || pinyin.getFullChars(item.title).toLowerCase().indexOf(value)!= -1 || pinyin.getFullChars(item.menu).toLowerCase().indexOf(value)!= -1;
            })
            res.send(result);
        }


    },
}