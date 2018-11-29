
const list = [
    {
        fileName:'车站原型图',
        fileId:'1',
        type:'rvt'
    },
    {
        fileName:'管廊原型图',
        fileId:'2',
        type:'rvt'
    },
    {
        fileName:'隧道原型图',
        fileId:'3',
        type:'rvt'
    }
]

export default {
    // 支持值为 Object 和 Array
    'GET /api/model/fileList': function(req, res){
        res.send(list);
    },
}