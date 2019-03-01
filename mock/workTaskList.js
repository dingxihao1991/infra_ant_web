const list = [
  {
    "id":"103",
    "sys_Date":null,
    "lastModifiedDate":null,
    "markAsDeleted":false,
    "gallery_name_id":"2",
    "gallery_name":"彩虹西路(将军岭路~鸡鸣山路)1111",
    "work_name":"电力巡检",
    "work_detailed":"电力巡检",
    "work_type":"巡检",
    "work_admin_user":null,
    "work_line":"电力巡检",
    "work_line_id":"4028e4f66240feae0162411df3270000",
    "work_plan_type":"计划",
    "work_status":"待执行",
    "work_user":"运维二线人员",
    "startDate":"2018-11-26 09:00:00",
    "endDate":"2018-11-26 20:00:00",
    "work_admin_user_id":null,
    "work_user_id":"4028b23962ad479e0162ad4c95e30003",
    "startDateTime":null,
    "startDateDate":null
  },{
    "id":"200",
    "sys_Date":null,
    "lastModifiedDate":null,
    "markAsDeleted":false,
    "gallery_name_id":"2",
    "gallery_name":"彩虹西路(将军岭路~鸡鸣山路)",
    "work_name":"电力巡检",
    "work_detailed":"电力巡检",
    "work_type":"养护",
    "work_admin_user":null,
    "work_line":"电力巡检",
    "work_line_id":"4028e4f66240feae0162411df3270000",
    "work_plan_type":"临时",
    "work_status":"待执行",
    "work_user":"xj01",
    "startDate":"2018-11-25 09:00:00",
    "endDate":"2018-11-25 20:00:00",
    "work_admin_user_id":null,
    "work_user_id":"297e81cf62ad4fa60162ad542bce0001",
    "startDateTime":null,
    "startDateDate":null
  }];
const jobPlanList=[
  {
    "id":"1",
    "sys_Date":null,
    "lastModifiedDate":null,
    "markAsDeleted":false,
    "gallery_name_id":"2",
    "gallery_name":"彩虹西路(将军岭路~鸡鸣山路)",
    "work_name":"预警派单",
    "work_detailed":"预警派单详情",
    "work_line":'预定路线',
    "work_line_id":null,
    "work_status":"启动",
    "work_user":"王强",
    "work_time":'每周一',
    "work_type":'养护',
    "startDate":"12:45:00",
    "endDate":"23:30:00",
  },
  {
    "id":"2",
    "sys_Date":null,
    "lastModifiedDate":null,
    "markAsDeleted":false,
    "gallery_name_id":"2",
    "gallery_name":"彩虹西路(将军岭路~鸡鸣山路)",
    "work_name":"预警派单",
    "work_detailed":"预警派单详情",
    "work_line":'预定路线',
    "work_line_id":null,
    "work_status":"启动",
    "work_user":"王强",
    "work_time":'每周一',
    "work_type":'巡检',
    "startDate":"15:45:00",
    "endDate":"12:30:00",
  }

]
let workEventList = [
  {
    id:1,
    title: '合肥管廊运营处_紧急巡视',
    unitName:'合肥管廊运营管理处',
    work_user:'周福',
    reasons:'临时任务',
    workType:'紧急巡视',
    startDate:'2018-03-13 08：30：00',
    endDate:'2018-03-13 17：30：00',
    gallery_name:'彩虹西路(将军岭路~鸡鸣山路)',
    ops:'系统管理员',
    eventContent:'彩虹西路管廊发生烟雾报警，彩虹西路管廊发生烟雾报警',
    workLevel:'一级',
    status:'进行中'
  },
  {
    id:2,
    title: '合肥管廊运营处_紧急巡视',
    unitName:'合肥管廊运营管理处',
    work_user:'周福',
    reasons:'临时任务',
    workType:'紧急巡视',
    startDate:'2018-03-13 08：30：00',
    endDate:'2018-03-13 17：30：00',
    gallery_name:'彩虹西路(将军岭路~鸡鸣山路)',
    ops:'系统管理员',
    eventContent:'彩虹西路管廊发生烟雾报警',
    workLevel:'一级',
    status:'进行中'
  },
  {
    id:3,
    title: '合肥管廊运营处_紧急巡视',
    unitName:'合肥管廊运营管理处',
    work_user:'周福',
    reasons:'临时任务',
    workType:'紧急巡视',
    startDate:'2018-03-13 08：30：00',
    endDate:'2018-03-13 17：30：00',
    gallery_name:'彩虹西路(将军岭路~鸡鸣山路)',
    ops:'系统管理员',
    eventContent:'彩虹西路管廊发生烟雾报警',
    workLevel:'一级',
    status:'待处理'
  },
  {
    id:4,
    title: '合肥管廊运营处_紧急巡视',
    unitName:'合肥管廊运营管理处',
    work_user:'周福',
    reasons:'临时任务',
    workType:'紧急巡视',
    startDate:'2018-03-13 08：30：00',
    endDate:'2018-03-13 17：30：00',
    gallery_name:'彩虹西路(将军岭路~鸡鸣山路)',
    ops:'系统管理员',
    eventContent:'彩虹西路管廊发生烟雾报警',
    workLevel:'一级',
    status:'待处理'
  },{
        id:5,
        title: '合肥管廊运营处_紧急巡视',
        unitName:'合肥管廊运营管理处',
        work_user:'周福',
        reasons:'临时任务',
        workType:'紧急巡视',
        startDate:'2018-03-13 08：30：00',
        endDate:'2018-03-13 17：30：00',
        gallery_name:'彩虹西路(将军岭路~鸡鸣山路)',
        ops:'系统管理员',
        eventContent:'彩虹西路管廊发生烟雾报警',
        workLevel:'一级',
        status:'待处理'
    },{
        id:6,
        title: '合肥管廊运营处_紧急巡视',
        unitName:'合肥管廊运营管理处',
        work_user:'周福',
        reasons:'临时任务',
        workType:'紧急巡视',
        startDate:'2018-03-13 08：30：00',
        endDate:'2018-03-13 17：30：00',
        gallery_name:'彩虹西路(将军岭路~鸡鸣山路)',
        ops:'系统管理员',
        eventContent:'彩虹西路管廊发生烟雾报警',
        workLevel:'一级',
        status:'待处理'
    },{
        id:7,
        title: '合肥管廊运营处_紧急巡视',
        unitName:'合肥管廊运营管理处',
        work_user:'周福',
        reasons:'临时任务',
        workType:'紧急巡视',
        startDate:'2018-03-13 08：30：00',
        endDate:'2018-03-13 17：30：00',
        gallery_name:'彩虹西路(将军岭路~鸡鸣山路)',
        ops:'系统管理员',
        eventContent:'彩虹西路管廊发生烟雾报警',
        workLevel:'一级',
        status:'待处理'
    },{
        id:8,
        title: '合肥管廊运营处_紧急巡视',
        unitName:'合肥管廊运营管理处',
        work_user:'周福',
        reasons:'临时任务',
        workType:'紧急巡视',
        startDate:'2018-03-13 08：30：00',
        endDate:'2018-03-13 17：30：00',
        gallery_name:'彩虹西路(将军岭路~鸡鸣山路)',
        ops:'系统管理员',
        eventContent:'彩虹西路管廊发生烟雾报警',
        workLevel:'一级',
        status:'待处理'
    },{
        id:9,
        title: '合肥管廊运营处_紧急巡视',
        unitName:'合肥管廊运营管理处',
        work_user:'周福',
        reasons:'临时任务',
        workType:'紧急巡视',
        startDate:'2018-03-13 08：30：00',
        endDate:'2018-03-13 17：30：00',
        gallery_name:'彩虹西路(将军岭路~鸡鸣山路)',
        ops:'系统管理员',
        eventContent:'彩虹西路管廊发生烟雾报警',
        workLevel:'一级',
        status:'待处理'
    },
];
let taskRecordList = [
  {
    "id":"1",
    "sys_Date":null,
    "lastModifiedDate":null,
    "markAsDeleted":false,
    "gallery_name_id":"2",
    "gallery_name":"彩虹西路(将军岭路~鸡鸣山路)",
    "work_name":"彩虹西路发生烟雾报警",
    "work_detailed":"预警派单",
    "work_type":"其它",
    "work_admin_user":null,
    "work_line":null,
    "work_line_id":null,
    "work_plan_type":"临时",
    "work_status":"进行中",
    "work_user":"王强",
    "startDate":"2018-11-03 12:45:00",
    "endDate":"2018-11-03 23:30:00",
    "work_admin_user_id":null,
    "work_user_id":"402880e662948ec5016294907df60000",
    "startDateTime":null,
    "startDateDate":null
  },
  {
    "id":"2",
    "sys_Date":null,
    "lastModifiedDate":null,
    "markAsDeleted":false,
    "gallery_name_id":"2",
    "gallery_name":"彩虹西路(将军岭路~鸡鸣山路)",
    "work_name":"彩虹西路发生烟雾报警",
    "work_detailed":"彩虹西路发生烟雾报警",
    "work_type":"其它",
    "work_admin_user":null,
    "work_line":null,
    "work_line_id":null,
    "work_plan_type":"临时",
    "work_status":"已完成",
    "work_user":"王强",
    "startDate":"2018-11-03 12:45:00",
    "endDate":"2018-11-03 23:30:00",
    "work_admin_user_id":null,
    "work_user_id":"402880e662948ec5016294907df60000",
    "startDateTime":null,
    "startDateDate":null
  },
  {
    "id":"3",
    "sys_Date":null,
    "lastModifiedDate":null,
    "markAsDeleted":false,
    "gallery_name_id":"2",
    "gallery_name":"彩虹西路(将军岭路~鸡鸣山路)",
    "work_name":"彩虹西路发生烟雾报警",
    "work_detailed":"彩虹西路发生烟雾报警",
    "work_type":"其它",
    "work_admin_user":null,
    "work_line":null,
    "work_line_id":null,
    "work_plan_type":"临时",
    "work_status":"待处理",
    "work_user":"王强",
    "startDate":"2018-11-03 12:45:00",
    "endDate":"2018-11-03 23:30:00",
    "work_admin_user_id":null,
    "work_user_id":"402880e662948ec5016294907df60000",
    "startDateTime":null,
    "startDateDate":null
  }
]
function addTask(req, res, u, b){
    const body = (b && b.body) || req.body;
    const { method, params} = body;
    res.send(list.concat(params));
}

function filterList(req, res, u, b){
  const body = (b && b.body) || req.body;
  const { tags } = body;
  let newArray = null;
  switch (tags.data) {
    case '进行中':
      newArray = taskRecordList.filter(function(item,index,array){
        return (item.work_status == tags.data);
      })
      break;
    case '待处理':
      newArray = taskRecordList.filter(function(item,index,array){
        return (item.work_status == tags.data);
      })
      break;
    case '已完成' :
      newArray = taskRecordList.filter(function(item,index,array){
        return (item.work_status == tags.data);
      })
      break;
    default:
      newArray = taskRecordList;
  }
  res.send(newArray);
}

function workEventFilterList(req, res, u, b){
  const body = (b && b.body) || req.body;
  const { tags } = body;
  let newArray = null;
  switch (tags.data) {
    case '进行中':
      newArray = workEventList.filter(function(item,index,array){
            return (item.status == tags.data);
      })
      break;
    case '待处理':
      newArray = workEventList.filter(function(item,index,array){
        return (item.status == tags.data);
      })
      break;
    case '已完成' :
      newArray = workEventList.filter(function(item,index,array){
        return (item.status == tags.data);
      })
      break;
    default:
      newArray = workEventList;
  }
  res.send(newArray);
}

export default {
  // 支持值为 Object 和 Array
  'GET /api/workTask': list,
  'GET /api/jobPlan': jobPlanList,
  'GET /api/workEvent': workEventList,
  'GET /api/workRecord': taskRecordList,
  'POST /api/filterList': filterList,
  'POST /api/workEventFilterList': workEventFilterList
}