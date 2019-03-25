const list = [
  {
    "id":"1",
    "pro_name":'复兴东路-崂山西路',
    "pro_date":'2004年9月29日',
    'pro_h':'214124215512',
    "pro_user":'张强',
    "pro_g":'正常',
    "pro_result":"验收通过"
  },{
    "id":"2",
    "pro_name":'中山南路-高科西路云莲路',
    "pro_date":'2011年2月1日',
    'pro_h':'214124215512',
    "pro_user":'张强',
    "pro_g":'正常',
    "pro_result":"验收通过"
  },{
    "id":"3",
    "pro_name":'上中路-中环线快速路',
    "pro_date":'2009年1月22日',
    'pro_h':'214124215512',
    "pro_user":'张强',
    "pro_g":'正常',
    "pro_result":"验收通过"
  }];



export default {
  // 支持值为 Object 和 Array
  'GET /api/projectManagerList': list,
}