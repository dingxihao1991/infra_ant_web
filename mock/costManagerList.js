const list = [
  {
    "id":"1",
    "cost_x":'人工费',
    "cost_b":321,
    "cost_d":'元/米'
  },{
    "id":"2",
    "cost_x":'照明费',
    "cost_b":322,
    "cost_d":'元/台',
  },{
    "id":"3",
    "cost_x":'风机费',
    "cost_b":432,
    "cost_d":'元/台',
  },{
    "id":"4",
    "cost_x":'应急灯费',
    "cost_b":123,
    "cost_d":'元/台',
  },{
    "id":"5",
    "cost_x":'消防栓费',
    "cost_b":267,
    "cost_d":'元/台',
  }];



export default {
  // 支持值为 Object 和 Array
  'GET /api/constManagerList': list,
}