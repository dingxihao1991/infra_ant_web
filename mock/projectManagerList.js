const list = [
  {
    "id":"1",
    "pro_name":'十七号线',
    "pro_date":'2014-3-4',
    'pro_h':'214124215512',
    "pro_user":'张强',
    "pro_g":'设备运转正常',
    "pro_result":"验收通过"
  },{
    "id":"2",
    "pro_name":'十七号线',
    "pro_date":'2014-3-4',
    'pro_h':'214124215512',
    "pro_user":'张强',
    "pro_g":'设备运转正常',
    "pro_result":"验收通过"
  },{
    "id":"3",
    "pro_name":'十七号线',
    "pro_date":'2014-3-4',
    'pro_h':'214124215512',
    "pro_user":'张强',
    "pro_g":'设备运转正常',
    "pro_result":"验收通过"
  }];



export default {
  // 支持值为 Object 和 Array
  'GET /api/projectManagerList': list,
}