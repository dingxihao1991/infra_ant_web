const list = [
  {
    "id":"1",
    "pro_name":'复兴东路-崂山西路',
    "pro_date":'张强',
    'pro_h':'否',
    "pro_user":'否',
    "pro_g":'否',
    "pro_result":"/"
  },{
    "id":"2",
    "pro_name":'中山南路-高科西路云莲路',
    "pro_date":'张强',
    'pro_h':'是',
    "pro_user":'否',
    "pro_g":'否',
    "pro_result":"发生沉降，请注意！"
  },{
    "id":"3",
    "pro_name":'上中路-中环线快速路',
    "pro_date":'张强',
    'pro_h':'否',
    "pro_user":'否',
    "pro_g":'否',
    "pro_result":"/"
  }];



export default {
  // 支持值为 Object 和 Array
  'GET /api/diseaseDisposalList': list,
}