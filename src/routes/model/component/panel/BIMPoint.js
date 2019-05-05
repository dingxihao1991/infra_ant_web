import React, {PureComponent,Component} from 'react';
import { Icon,List,Input } from 'antd';
import {SortableItem} from './BIMPointSort';
import { connect } from 'dva';

const data = [
    {
        id:1,
        name: '初始视角',
    },
    {
        id:2,
        name: '摄像机',
    },
    {
        id:3,
        name: '风机',
    },
    {
        id:4,
        name: '风机1',
    }
];


@connect(({interestPoint,loading})=>({
    interestPoint
}))
class BIMPoint extends Component {

    state={
        AutoPlay: false,
        points:data
    }

    componentDidMount(){
        alert("====");
        const {dispatch } = this.props;
        dispatch({
            type: 'interestPoint/fetch',
            payload: {
            },
        });

    }

    save = () => {
        var that = this;
        let array = [];
        this.state.points.map((point, index) => {
            array.push(point.id);

        });

    }
    Refresh = () => {
        this.GetPointDataUpdate();
    }

    GetPointDataUpdate = () => {


    }

    playOrStop = () => {

        this.setState({AutoPlay: !this.state.AutoPlay});
        Autotransfer = !Autotransfer;
        if(Autotransfer){
            CallUnity("DoTweenSystem", "StartAutoTransform",3);
        }else{
            CallUnity("DoTweenSystem", "PauseAutoTransform");
        }

    }


    //拖拽排序
    onSortItems = (items) => {
        this.setState({
            points: items
        });
    }

    renderSkillSection = () => {
        const {interestPoint} = this.props;

        if(interestPoint!=undefined){
            const {points} = interestPoint;

            if (points != null) {
                //const {points} = this.state;
                return points.map((point, index) => (
                    <SortableItem
                        key={point.id}
                        onSortItems={this.onSortItems}
                        index={index}
                        items={points}
                        sortId={index}>
                        {point}
                    </SortableItem>
                ))
            }
        }
        return <div></div>

    }

    render(){
        const {AutoPlay} = this.state;
        return(
            <div style={panel} className="point">
                <div style={{padding: '5px 15px', cursor: 'pointer', color: '#fff'}}>
                    <span  style={{float:'right',margin: '10px 10px'}}>
                        <div className="btn-group" title="编辑" onClick={this.playOrStop.bind(this)}>
                            <svg className="icon" aria-hidden="true">
                                <use href={AutoPlay?'#icon-pause':'#icon-play'} ></use>
                            </svg>
                        </div>
                        <div className="btn-group" title="编辑" onClick={this.save.bind(this)}>
                            <svg className="icon" aria-hidden="true">
                                <use href='#icon-add'></use>
                            </svg>
                        </div>
                        <div className="btn-group" title="编辑" onClick={this.Refresh.bind(this)}>
                            <svg className="icon" aria-hidden="true">
                                <use href='#icon-refresh'></use>
                            </svg>
                        </div>
                    </span>
                    <h4 style={{color: '#fff'}}>巡检位置列表</h4>
                </div>
                <div  style={PanelBorder}>
                    {this.renderSkillSection()}
                </div>
            </div>
        )
    }
}

export default BIMPoint

const panel = {
    float: 'left',
    width: '100%',
    fontSize: '14px',
    background: '#171717',
    color: '#fff',
    borderRadius: '8px'

}
const PanelBorder = {
    margin: '10px',
    border: '2px solid #487373',
    borderRadius: '10px',
    height: '240px',
    overflowY: 'auto',
    color: '#fff'
}