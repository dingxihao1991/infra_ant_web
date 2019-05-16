import moment from "moment";

const data = [
    {
        code: 'BJ-TD-0000001',
        deviceName: '探头',
        itemType: '其他系统',
        num: '15',
        deliveryTime: '2018-11-19 15:03',
        describe: '设备过期',
        registerUser:'张三峰'
    }, {
        code: 'BJ-TD-0000002',
        deviceName: '调高垫板',
        itemType: '其他系统',
        num: '200',
        deliveryTime: '2018-11-20 16:23',
        describe: '设备过期',
        registerUser:'张三峰'
    }, {
        code: 'BJ-TD-0000003',
        deviceName: '通风管',
        itemType: '通风系统',
        num: '10',
        deliveryTime: '2018-11-20 16:23',
        describe: '设备过期',
        registerUser:'张三峰'
    }, {
        code: 'BJ-TD-0000004',
        deviceName: '排水管',
        itemType: '排水系统',
        num: '5',
        deliveryTime: '2018-11-20 16:23',
        describe: '设备过期',
        registerUser:'张三峰'
    }, {
        code: 'BJ-TD-0000005',
        deviceName: '小型发电机',
        itemType: '供电系统',
        num: '2',
        deliveryTime: '2018-11-20 16:23',
        describe: '设备过期',
        registerUser:'张三峰'
    }, {
        code: 'BJ-TD-0000006',
        deviceName: 'LED显示屏',
        itemType: '其他系统',
        num: '1',
        deliveryTime: '2018-11-20 16:23',
        describe: '设备损坏，需要更换',
        registerUser:'王朝'
    }, {
        code: 'BJ-ZZ-0000007',
        deviceName: '支柱绝缘子及其附件',
        itemType: '供电系统',
        num: '19',
        deliveryTime: '2018-11-21 9:52',
        describe: '设备损坏，需要更换',
        registerUser:'王朝'
    }, {
        code: 'BJ-JY-0000008',
        deviceName: '绝缘密封套管',
        itemType: '供电系统',
        num: '7',
        deliveryTime: '2018-11-19 16:27',
        describe: '设备损坏，需要更换',
        registerUser:'王朝'
    }, {
        code: 'BJ-SD-0000009',
        deviceName: '湿度传感器',
        itemType: '排水系统',
        num: '0',
        deliveryTime: '2018-11-20 10:43',
        describe: '设备损坏，需要更换',
    }, {
        code: 'BJ-GX-0000010',
        deviceName: '光学配件',
        itemType: '其他系统',
        registerUser:'王朝',
        num: '80',
        deliveryTime: '2018-11-19 13:15',
        describe: '设备损坏，需要更换',
    }, {
        code: 'BJ-GB-0000011',
        deviceName: '隔离变压器',
        itemType: '供电系统',
        num: '5',
        deliveryTime: '2018-11-20 15:29',
        describe: '设备损坏，需要更换',
        registerUser:'王朝'
    }
];

function add(req, res, u, b){

    const body = (b && b.body) || req.body;
    const { params} = body;
    consoel.log(params);
    const today =  moment(new Date).format('YYYY-MM-DD');
    if(today==tags.date){
        data.push(params)
    }
    res.send({list:data});
}


export default {
    // 支持值为 Object 和 Array
    'GET /api/takeRecord': data,
    'POST /api/takeRecord/add': add,
}