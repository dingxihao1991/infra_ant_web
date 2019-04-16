import React, {Component} from 'react';
import PropTypes from 'prop-types'


const data= [
    {id: '6', name: '电灯开/关'},
    {id: '7', name: '风扇开/关'},
    {id: '8', name: '喷淋开/关'},
    {id:'11',name:'摄像头转动'},
    {id: '9', name: '人灯联动'},
    {id: '10', name: '人风联动'}

]
export default class BIMMonitor extends Component {


    static contextTypes = {
        dialog: PropTypes.object
    }

    constructor(props) {
        super(props);
    }

    state = {
        monitor: data,
    }

    renderSkillSection = () => {
        const {monitor} = this.state;
        return monitor.map(mon => (
            <li className="clearfix" key={mon.id}
                style={ModelLi}>
                <div className="selected_remind_input">
                    <label className="i-switch bg-dark-success pull-right">
                        <input type="checkbox" defaultChecked={false}
                               data-index={mon.name} name={mon.name}
                               onChange={this.onChangeCheck}/>
                        <i></i>
                    </label>
                    {mon.name}
                </div>
                <div className="line  b-b-dark-blue-color"></div>
            </li>
        ))
    }

    blubOpen = () => {
        CallUnity("DoTweenSystem","OpenLight","");
    }
    blubClose = () => {
        CallUnity("DoTweenSystem","CloseLight","");
    }

    fanOpen= ()=>{
        CallUnity("DoTweenSystem","OpenFan","");
    }
    fanClose=()=>{
        CallUnity("DoTweenSystem","CloseFan","");
    }

    camera =(flag)=>{

        if(flag == 0){
            CallUnity("DoTweenSystem", "BackRotateCCTV", "");
        }else{
            CallUnity("DoTweenSystem", "RotateCCTV", "");
        }


    }
    water = (flag)=>{
        if(flag == 0){
            CallUnity("DoTweenSystem", "CloseWaterDrops", "");
        }else{
            CallUnity("DoTweenSystem", "OpenWaterDrops", "");
        }

    }

    deviceConfig = ()=>{
        Ext.Ajax.request({
            url: ServerName + '/opera/deviceConfig',
            method: 'POST',
            success: function (result) {
                var resultData = Ext.util.JSON.decode(result.responseText);
                if(resultData.code == 200){
                    Ext.Msg.alert("提示","设置联动成功");
                }else if(resultData.code == 102){
                    Ext.Msg.alert("提示","该配置已存在，请勿重复配置");
                }else{
                    Ext.Msg.alert("提示","设置联动失败");
                }
            },
            error: function (data) {
                Ext.Msg.alert("提示","设置联动失败");
            }
        });
    }

    deviceConfigFan = ()=>{
        Ext.Ajax.request({
            url: ServerName + '/opera/deviceConfigFan',
            method: 'POST',
            success: function (result) {
                var resultData = Ext.util.JSON.decode(result.responseText);
                if(resultData.code == 200){
                    Ext.Msg.alert("提示","设置联动成功");
                }else if(resultData.code == 102){
                    Ext.Msg.alert("提示","该配置已存在，请勿重复配置");
                }else{
                    Ext.Msg.alert("提示","设置联动失败");
                }
            },
            error: function (data) {
                Ext.Msg.alert("提示","设置联动失败");
            }
        });
    }
    render() {
        return (
            <div style={MonitorPanel} className="monitor">
                <div style={{padding: '5px 15px', cursor: 'pointer'}}>
                    <h4>综合监控</h4>
                    <div className="line  m-n m-b  b-b-light-blue-color"></div>
                </div>
                <div className="sortable-list" style={PanelBorder}>
                    {this.renderSkillSection()}
                </div>
            </div>
        )
    }

    onChangeCheck = (e) => {
        let check = e.target.checked;
        let specialtyName = e.target.name;
        let name = specialtyName.substr(0, 2);
        if (name == "电灯") {
            if (check) {
                {this.blubOpen()}
            }else{
                {this.blubClose()}
            }
        } else if (name == "风扇") {
            if (check) {
                {this.fanOpen()}
            }else{
                {this.fanClose()}
            }
        } else if (name == "喷淋") {
            if (check) {
                {this.water(1)}
            }else{
                {this.water(0)}
            }
        }else if(name == '人灯'){
            { this.deviceConfig()}
        }else if(name == '人风'){
            { this.deviceConfigFan()}
        }else if(name=='摄像'){
            if (check) {
                {this.camera(1)}
            }else{
                {this.camera(0)}
            }
        }
    }

    isShowMonitorState(lx, isShowState) {
        let specialtyId = $(':checkbox[data-index="' + lx + '"]')[0].name;
        this.getOperationalRevitSpecialtyWork(specialtyId, isShowState);
    }

    getOperationalRevitSpecialtyWork(specialtyId, isShowState) {
        let workSet = [];
        let that = this;
        $.getJSON(ServerName + "/revit/getRevitSpecialtyWorkSet?specialtyId=" + specialtyId, function (result) {
            result.map(data => {
                workSet = [...workSet, data.name];
            });
            console.log(workSet);
            that.onShowOperationalLayerChange(true, workSet, isShowState);
        })
    }

    onShowOperationalLayerChange(flag, workSet, isShowState) {
        $.getJSON(ServerName + "/webgl/Switch_Layers_Operation?SwitchLayers=" + flag + "&LayerName=" + workSet + "&isShowMonitor=" + isShowState, function (data) {
            InteractiveUnity(data);
        });
    }


}

const MonitorPanel = {
    float: 'left',
    width: '100%',
    fontSize: '14px',
    background: '#171717',
    color: '#fff',
    borderRadius: '8px'
}

const PanelBorder = {
    height: '255px',
    margin: '10px',
    border: '2px solid #487373',
    borderRadius: '10px',
    overflowY: 'auto',
    color: '#fff'
}

const ModelLi={
    margin:'10px',
    border: 'none',
    fontSize: '14px',
    listStyle: 'none',
    height: '30px',
    cursor: 'pointer'
}