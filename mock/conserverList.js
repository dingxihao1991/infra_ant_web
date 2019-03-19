const list = [
  {
    "id":"1",
    "gallery_name":"彩虹西路(将军岭路~鸡鸣山路)",
    "work_name":"电力巡检",
    "work_detailed":"电力巡检",
    "plan_type":"计划",
    "work_type":"巡检",
    "worker":"运维二线人员",
    "start_date":"2018-11-26 09:00:00",
    "end_date":"2018-11-26 20:00:00",
  },{
    "id":"2",
    "gallery_name":"彩虹西路(将军岭路~鸡鸣山路)",
    "work_name":"电力巡检",
    "work_detailed":"电力巡检",
    "plan_type":"计划",
    "work_type":"巡检",
    "worker":"运维二线人员",
    "start_date":"2018-11-26 09:00:00",
    "end_date":"2018-11-26 20:00:00",
  }];

export default {
  // 支持值为 Object 和 Array
  'GET /api/conserveManagerList': list,
}