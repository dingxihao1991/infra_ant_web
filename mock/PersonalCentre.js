import moment from 'moment';


const currentUser = {
    name: '超级管理员',
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
    userid: '00000001',
    email: 'antdesign@alipay.com',
    signature: '综合运维系统',
    group: '某某平台部－某某技术部－UED',
    notifyCount: 12,
    country: 'China',
    geographic: {
        province: {
            label: '浙江省',
            key: '330000',
        },
        city: {
            label: '杭州市',
            key: '330100',
        },
    },
    address: '西湖区工专路 77 号',
    phone: '0752-268888888',
}
let tagsList= [
    {
        key: '1',
        label: '10点汇报工作',
    },
    {
        key: '2',
        label: '14点参加部门会议',
    }
]

let calendarList = [
    {
        id: "402888c666d8b8870166d8c581cc0028",
        sys_Date: null,
        lastModifiedDate: null,
        markAsDeleted: false,
        title: "预警派单",
        desc: "预警派单",
        start: "2018-11-22 00:00:00",
        end: "2018-11-22 00:00:00",
        grade: "其它",
        remindTime: "2018-11-22 00:00:00",
        status: null,
        collaborator: null,
        tags: null,
        principal: null,
        calendarId: "402888c666d8b8870166d8c581cc0028",
    },
    {
        id: "402888c666d8b8870166d8c313d6001f",
        sys_Date: null,
        lastModifiedDate: null,
        markAsDeleted: false,
        title: "日常巡检",
        desc: "电力巡检",
        start: "2018-11-05 00:00:00",
        end: "2018-11-06 20:00:00",
        grade: "巡检",
        remindTime: "2018-11-08 00:00:00",
        status: null,
        collaborator: null,
        tags: null,
        principal: null,
        calendarId: "402888c666d8b8870166d8c313d6001f"
    },
    {
        id: "402888c666d8b8870166d8c3134d000e",
        sys_Date: null,
        lastModifiedDate: null,
        markAsDeleted: false,
        title: "日常巡检",
        desc: "电力巡检",
        start: "2018-11-03 00:00:00",
        end: "2018-11-03 20:00:00",
        grade: "巡检",
        remindTime: "2018-11-03 00:00:00",
        status: null,
        collaborator: null,
        tags: null,
        principal: null,
        calendarId: "402888c666d8b8870166d8c3134d000e"
    },
]


let i = 0;
function addMemo(req, res, u, b){

    const body = (b && b.body) || req.body;
    const { tags} = body;
    let calendar = {
        id: i++,
        sys_Date: null,
        lastModifiedDate: null,
        markAsDeleted: false,
        title: tags.label,
        desc: tags.label,
        start: tags.date,
        end: tags.date,
        grade: "其它",
        remindTime: "2018-11-22 00:00:00",
        status: null,
        collaborator: null,
        tags: null,
        principal: null,
        calendarId: i++
    }

    const today =  moment(new Date).format('YYYY-MM-DD');
    if(today==tags.date){
        tagsList.push(tags)
    }
    calendarList.push(calendar)
    res.send({tags:tagsList,calendarList:calendarList});
}


export default {
    // 支持值为 Object 和 Array
    'GET /api/currentUser': function(req, res){
        res.send({currentUser:currentUser,tags:tagsList,calendarList:calendarList});
    },
    'POST /api/addcurrentUser': addMemo,
    'GET /api/calendar':calendarList,
}