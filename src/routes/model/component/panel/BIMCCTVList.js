
import React, {Component} from 'react';
import {Button} from 'antd';



const  data = [
    {
        district:'电力舱防火分区01',
        cctvs:[
            {
                key: '101',
                name:'摄像机MPIR_1',
                area:'电力舱防火分区01',
                uuid:'b1824933-99f0-4f5d-9a0a-286476a8611c-000415af',
                src:'../static/video/2号口进站检票机.mp4'
            },
            {
                key: '102',
                name:'摄像机MPIR_2',
                area:'电力舱防火分区01',
                uuid:'b1824933-99f0-4f5d-9a0a-286476a8611c-000415c5',
                src:'../static/video/诸光路4厅公共区.mp4'
            },
        ],
    },{
        district:'电力舱防火分区02',
        cctvs:[
            {
                key: '201',
                name:'摄像机MPIR_201',
                area:'电力舱防火分区02',
                uuid:'b1824933-99f0-4f5d-9a0a-286476a8611c-000415c1',
                src:'../static/video/诸光路4厅公共区.mp4'
            },{
                key: '202',
                name:'摄像机MPIR_202',
                area:'电力舱防火分区02',
                uuid:'b1824933-99f0-4f5d-9a0a-286476a8611c-000415c2',
                src:'../static/video/诸光路4厅公共区.mp4'
            },{
                key: '203',
                name:'摄像机MPIR_203',
                area:'电力舱防火分区02',
                uuid:'b1824933-99f0-4f5d-9a0a-286476a8611c-000415c3',
                src:'../static/video/诸光路4厅公共区.mp4'
            },
            {
                key: '102',
                name:'摄像机MPIR_2',
                area:'电力舱防火分区02',
                uuid:'b1824933-99f0-4f5d-9a0a-286476a8611c-000415c4',
                src:'../static/video/诸光路4厅公共区.mp4'
            }
        ],
    }
]

export default class BIMCCTVList extends Component {

    constructor(props) {
        super(props);
    }

    state = {
        cctv: data,
        height: '400px'
    }


    renderSkillSection = () => {
        if (this.state.cctv != null) {
            return this.state.cctv.map(video => (
                <div className="col-md-12 no-padder" key={video.district}>
                    <h5 style={{fontSize:'13px'}}>{video.district}</h5>
                    <div style={{
                        border: '2px solid #487373',
                        borderRadius: '10px',
                        overflowY: 'auto',
                        overflowX: 'hidden',
                        height: '250px',
                        marginRight: '5px',
                        marginLeft: '5px'
                    }}>
                        {video.cctvs.map((detail, index) =>
                            <li key={detail.uuid}
                                style={{
                                    margin: '10px',
                                    border: 'none',
                                    fontSize: '14px',
                                    listStyle: 'none',
                                    height: '30px'
                                }}>
                                <span className="pull-right  inline m-r">
                                    <svg className="icon" aria-hidden="true" >
                                        <use href='#icon-sanweimoxing2'></use>
                                    </svg>
                               </span>
                                <span style={CCTVList}>{detail.name}</span>
                                <div className="line b-b-dark-blue-color"></div>
                            </li>
                        )}
                    </div>
                </div>
            ))
        }
    }


    render() {

        return (
            <div style={CCTVPanel}>
                <div style={{padding: '5px 15px', cursor: 'pointer'}}>
                    <h4>视频监控列表</h4>
                    <div className="line line-dashed m-n m-b  b-b-light-blue-color"></div>
                </div>
                <div className="m-b-none" style={{height: '600px', color: '#fff',overflow: 'auto'}}>
                    <div className="col-md-12">
                        {this.renderSkillSection()}
                    </div>
                </div>
            </div>
        )
    }


    LoadBIMtoCCTV = (uuid) => {
        console.log(uuid);
        $.getJSON(ServerName + "/webgl/CameraMove_CCTV?uuid=" + uuid, function (data) {
            InteractiveUnity(data);
        });
    }

}


const CCTVList = {
    overflow: 'hidden',
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    float: 'left',
}

const CCTVPanel = {
    height: 'auto',
    background: '#171717',
    color: '#fff',
    borderRadius: '8px'
}