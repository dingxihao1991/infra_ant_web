

const list = [
    {
        id: '000000009',
        title: '任务名称',
        content: '任务需要在 2018-01-12 20:00 前启动',
        updatedAt:'2018-01-11 15:46',
        extra: '未开始',
        status: 'todo',
        owner:'管理员',
        type: '计划巡检',
        avatar:'https://gw.alipayobjects.com/zos/rmsportal/ZiESqWwCXBRQoaPONSJe.png',

    }, {
        id: '000000010',
        title: '第三方紧急代码变更',
        content: '冠霖提交于 2018-01-06，需在 2018-01-07 前完成代码变更任务',
        updatedAt:'2018-01-11 15:46',
        extra: '马上到期',
        status: 'urgent',
        owner:'管理员',
        type: '临时任务',
        avatar:'https://gw.alipayobjects.com/zos/rmsportal/ZiESqWwCXBRQoaPONSJe.png',

    }, {
        id: '000000011',
        title: '信息安全考试',
        content: '指派竹尔于 2018-01-09 前完成更新并发布',
        extra: '已耗时 8 天',
        updatedAt:'2018-01-11 15:46',
        status: 'doing',
        owner:'管理员',
        type: '计划巡检',
        avatar:'https://gw.alipayobjects.com/zos/rmsportal/ZiESqWwCXBRQoaPONSJe.png',

    }, {
        id: '000000012',
        title: 'ABCD 版本发布',
        content: '冠霖提交于 2018-01-06，需在 2018-01-07 前完成代码变更任务',
        extra: '进行中',
        updatedAt:'2018-01-11 15:46',
        status: 'processing',
        owner:'管理员',
        type: '临时任务',
        avatar:'https://gw.alipayobjects.com/zos/rmsportal/ZiESqWwCXBRQoaPONSJe.png',

    }];

function addTask(req, res, u, b){

    const body = (b && b.body) || req.body;
    const { method, params} = body;
    res.send(list.concat(params));
}

export default {
    // 支持值为 Object 和 Array
    'GET /api/task': list,
}