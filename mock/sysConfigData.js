let list = [
  {
    "id":"1",
    "template_name": 'template_name',
    "template_type":'template_type',
    "template_description":'template_description',
    "work_name":"work_name",
    "work_description":"work_description",
  },{
    "id":"2",
    "template_name": 'template_name',
    "template_type":'template_type',
    "template_description":'template_description',
    "work_name":"work_name",
    "work_description":"work_description",
  }
];

const assetData = [{
  'id':'101',
  "asset_1": 'NV-TB9716',
  "asset_2": '智能照明设备',
  "asset_3": '照明系统',
  "asset_4": '上海市青浦区诸光路(地铁站)',
  "asset_5": '正常',
  "asset_6": '/',
  "asset_7": '2018-10-12',
  "asset_8": 'admin',
  "asset_9": '2018-10-12',
}, {
  'id':'102',
  "asset_1": 'AD-359916',
  "asset_2": '排水设备',
  "asset_3": '排水系统',
  "asset_4": '上海市浦东新区大连路隧道',
  "asset_5": '检修',
  "asset_6": '/',
  "asset_7": '2016-9-12',
  "asset_8": 'admin',
  "asset_9": '2017-6-26',
}, {
  'id':'1023',
  "asset_1": 'GD-569ASD',
  "asset_2": '管廊施工机器臂',
  "asset_3": '管廊系统',
  "asset_4": '合肥市高新区管廊控制中心',
  "asset_5": '正常',
  "asset_6": '/',
  "asset_7": '2018-5-8',
  "asset_8": 'admin',
  "asset_9": '2018-10-12',
}
];

function addPerambulate(req, res, u, b){
  const body = (b && b.body) || req.body;
  const { tags } = body;
  list.push(tags.data)
  res.send(list);
}

export default {
  // 支持值为 Object 和 Array
  'GET /api/assetData': assetData,
  'GET /api/perambulate': list,
  'POST /api/addPerambulate': addPerambulate,
}