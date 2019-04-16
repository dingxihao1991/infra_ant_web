const list = [
    {
        _id: {
            date: 1547100820000,
            time: 1547100820000,
            timestamp: 1547100820,
            new: false,
            machine: 592928417,
            timeSecond: 1547100820,
            inc: 205583854
        },
        rotationZ: 0,
        rotationX: 12.222846984863281,
        positionX: 43.32781219482422,
        rotationY: 57.87398147583008,
        id: "a698b6dd-80a4-447f-934d-832b4aef3dce",
        positionZ: -122.68089294433594,
        name: "灭火器",
        userId: "4028b2dd611e881c01611e89df840000",
        positionY: -2.4546148777008057
    },
    {
        positionX: 43.839599609375,
        positionZ: -159.44540405273438,
        id: "08259de6-ecc8-4a3c-a8b4-f6b5be71ee7c",
        name: "初始视角",
        userId: "4028b2dd611e881c01611e89df840000",
        _id: {
            date: 1547103628000,
            time: 1547103628000,
            timestamp: 1547103628,
            new: false,
            machine: 592917353,
            timeSecond: 1547103628,
            inc: 1092947802
        },
        rotationZ: -1.6789003520756296e-9,
        positionY: 2.0845401287078857,
        rotationY: 359.7489929199219,
        rotationX: 6.673000335693359
    },
    {
        positionX: 42.69560241699219,
        userId: "4028b2dd611e881c01611e89df840000",
        positionZ: -159.04888916015625,
        rotationX: 270.0948791503906,
        rotationZ: 0,
        id: "ab704067-6eee-426e-927e-fec9310a2a36",
        _id: {
            date: 1547104037000,
            time: 1547104037000,
            timestamp: 1547104037,
            new: false,
            machine: 592917353,
            timeSecond: 1547104037,
            inc: 1092947803
        },
        positionY: 2.037567138671875,
        name: "风机",
        rotationY: 10.623985290527344
    },
    {
        id: "3f7ed0a9-a2e7-4d0e-82dd-311b5d91f1ef",
        _id: {
            date: 1548230240000,
            time: 1548230240000,
            timestamp: 1548230240,
            new: false,
            machine: -2047638439,
            timeSecond: 1548230240,
            inc: 1600653775
        },
        positionY: 1.8355978727340698,
        positionZ: -155.40252685546875,
        name: "摄像机",
        positionX: 43.58572769165039,
        rotationX: 353.00634765625,
        rotationY: 357.6864929199219,
        userId: "4028b2dd611e881c01611e89df840000",
        rotationZ: 0
    },
    {
        positionX: 43.839599609375,
        positionY: 2.084540367126465,
        rotationY: 354.4989929199219,
        rotationZ: -0.00000516752425028244,
        id: "cfd55e82-8072-472d-8b6c-eb8d00024ddd",
        positionZ: -159.44540405273438,
        _id: {
            date: 1554278182000,
            time: 1554278182000,
            timestamp: 1554278182,
            new: false,
            machine: -2047666417,
            timeSecond: 1554278182,
            inc: -481003042
        },
        userId: "4028b2dd611e881c01611e89df840000",
        rotationX: 24.673006057739258,
        name: "自定义兴趣点hLCRXNxL"
    }
]

export default {
    // 支持值为 Object 和 Array
    'GET /api/interestPoint': list,
}