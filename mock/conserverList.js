const list = [
  {
    "id":"1",
    "gallery_name":"复兴东路隧道",
    "work_name":"安全巡检",
    "work_detailed":"检查消防设备，交通检测设备",
    "plan_type":"计划",
    "work_type":"巡检",
    "worker":"运维二线人员",
    "start_date":"2018-11-26 09:00:00",
    "end_date":"2018-11-26 20:00:00",
  },{
    "id":"2",
    "gallery_name":"复兴东路隧道",
    "work_name":"电力巡检",
    "work_detailed":"检查照明线路，应急灯线路",
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