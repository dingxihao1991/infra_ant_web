const list = [
    {
        id: 'y100001',
        mold: "消防",
        daycount: 10,
        sysdate: new Date(),
        tid: "1",
        templateName: "火灾应急预案",
        tdescription: "火灾应急",
        grade: "严重（级）",
        putOnRecords:'是'
    },
    {
        id: 'y100002',
        mold: "暴雨",
        daycount: 1,
        sysdate: new Date(),
        tid: "402881fe62dc64c50162dce1e42a0001",
        templateName: "暴雨灾害预警（1）",
        tdescription: "12小时降雨量将达50毫米以上，或者已达50毫米以上且降雨可能持续。",
        grade: "一般（级）",
        putOnRecords:'是'
    },
    {
        id: 'y100003',
        mold: "电力",
        daycount: 6,
        sysdate: new Date(),
        tid: "4028e4f6630ab2c601630ab7a8180001",
        templateName: "测试预案",
        tdescription: "测试预案",
        grade: "较重（级）",
        putOnRecords:'是'
    },
    {
        id: 'y100004',
        mold: "暴雨",
        daycount: 2,
        sysdate: new Date(),
        tid: "402881fe62d77b580162d77f4bf50000",
        templateName: "暴雨灾害预警（2）",
        tdescription: "6小时降雨量将达50毫米以上，或者已达50毫米以上且降雨可能持续",
        grade: "较重（级）",
        putOnRecords:'是'
    },
    {
        id: 'y100005',
        mold: "其它",
        daycount: 3,
        sysdate: new Date(),
        tid: "402881fe62dd077e0162dd194fc20001",
        templateName: "水管爆裂",
        tdescription: "水管爆裂应急预案",
        grade: "较重（级）",
        putOnRecords:'是'
    },
    {
        id: 'y100006',
        mold: "电力",
        daycount: 2,
        sysdate: new Date(),
        tid: "402881fe631f663601631f8969960004",
        templateName: "测试一",
        tdescription: "灰化肥会发挥",
        grade: "一般（级）",
        putOnRecords:'是'
    }
]

export default {
  // 支持值为 Object 和 Array
  'GET /api/emergencyPlanRecord': list,
}