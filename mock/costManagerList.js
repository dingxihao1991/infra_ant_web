const list = [
  {
    "id":"1",
    "cost_x":'材料费',
    "cost_b":321,
    "cost_d":'元/米'
  },{
    "id":"2",
    "cost_x":'机械费',
    "cost_b":3234,
    "cost_d":'元/台',
  }];



export default {
  // 支持值为 Object 和 Array
  'GET /api/constManagerList': list,
}