/**
 * Created by cheng on 2017/9/1.
 */
import React, {Component} from 'react';
const  data= [
    {
        key: '1',
        name:'摄像机MPIR',
        area:'电力舱防火分区01',
        uuid:'b1824933-99f0-4f5d-9a0a-286476a8611c-000415af',
        src:'../static/video/222.mp4'

    },
    {
        key: '2',
        name:'摄像机MPIR',
        area:'电力舱防火分区02',
        uuid:'b1824933-99f0-4f5d-9a0a-286476a8611c-000415c5',
        src:'../static/video/2号口进站检票机.mp4'
    },
    {
        key: '3',
        name:'摄像机MPIR',
        area:'电力舱防火分区03',
        uuid:'b1824933-99f0-4f5d-9a0a-286476a8611c-00042e5e',
        src:'../static/video/诸光路上行3.mp4'
    },
    {
        key: '4',
        name:'摄像机MPIR',
        area:'电力舱防火分区04',
        uuid:'b1824933-99f0-4f5d-9a0a-286476a8611c-00041588',
        src:'../static/video/诸光路4厅楼梯2.mp4'
    },
    {
        key: '5',
        name:'摄像机MPIR',
        area:'燃气舱防火分区01',
        uuid:'28540a8b-3e67-44a8-9653-5889a444488d-0098497d'
    },
    {
        key: '6',
        name:'摄像机MPIR',
        area:'燃气舱防火分区02',
        uuid:'5a3ef294-8a2a-4653-a203-d35fe287dafe-0097f471'
    },
    {
        key: '7',
        name:'摄像机MPIR',
        area:'燃气舱防火分区03',
        uuid:'5a3ef294-8a2a-4653-a203-d35fe287dafe-0097f5b6'
    },
    {
        key: '8',
        name:'摄像机MPIR',
        area:'燃气舱防火分区04',
        uuid:'289d0e75-b713-4077-9efb-819ed6c58f2b-0097fc30'
    }
    ]

export default class MonitorCCTV extends Component {

    state = {
        show: false,
        cctv: data,
        cctvId: ''

    }

    clickCCTV = (cctv) => {
        this.setState({show: true, cctvId: cctv.key});
    }

    closeCCTV = () => {
        this.setState({show: false});
    }

    render() {
        const {cctv, show, cctvId} = this.state;

        return (
            <div className="m-t-sm" style={{fontSize: '11pt', display: 'flex', color: '#cecece'}}>
                <span className="m-l m-r">视频监控 {cctv.length} / {cctv.length} </span>
                {cctv.map((cctv, index) => (
                    <div key={index} style={{width: '20px', cursor: 'pointer'}}>
                        <i className="fa fa-video-camera"
                           style={{color: show == true && cctvId == cctv.key ? '#FA6842' : '#fff'}}
                           onClick={this.clickCCTV.bind(this, cctv)}></i>
                    </div>
                ))}
                {cctv.map((cctv =>
                        <div key={cctv.key} style={CCTVStyle}
                             className={show == true && cctvId == cctv.key ? 'show-active' : 'hide-active'}>
                            <div style={{width: '180px', padding: '10px'}}>
                                <div style={{marginLeft: '150px', cursor: 'pointer'}} onClick={this.closeCCTV}>x</div>
                                <div className="row-row">
                                    <div className="m-t-sm" width="40" style={{float: 'right'}}>
                                        <img src="../static/images/other/CCTVicon.png" width="40"/>
                                    </div>
                                    <div style={{float: 'left', marginLeft: '10px', width: '100px'}}>
                                        <div className="col v-middle font-thin" style={{fontSize: '12px'}}>
                                            <div>{cctv.name}</div>
                                            <div>{cctv.area}</div>
                                            <div style={{width: '170px'}}>
                                                <div className="text-muted m-t m-r pull-left"
                                                     style={{fontSize: '11px'}}
                                                     onClick={this.playVideo.bind(this, cctv)}>查看影像
                                                </div>
                                                <div className="text-muted m-t pull-left"
                                                     style={{fontSize: '11px'}}
                                                     onClick={this.markCCTV.bind(this, cctv)}>定位
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                ))}
            </div>
        )
    }


    markCCTV = (cctv) => {

    }

    playVideo = (cctv) => {
        var video = $('#divVideo video')[0];
        video.src = cctv.src;
        video.load();
        video.play();
        $('#cctv_window').modal({show: true});

    }

}

const CCTVStyle = {
    position: 'fixed',
    width: '180px',
    marginLeft: '120px',
    height: '100px',
    background: '#151412',
    bottom: '105px',
    zIndex: '10 !important',
    borderRadius: '10px',
    backgroundImage: 'url(../static/images/other/CCTVback.png)'
}