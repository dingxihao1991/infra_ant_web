import React, { Component } from 'react';
import { Form, Button, Input, Select,TreeSelect,InputNumber} from 'antd';
import { Map ,Marker} from 'react-amap';//引入高德地图
//import { POST,GET,PUT,DELETE } from '../../../services/api';
import styles from './test.less';//样式引入


const createForm = Form.create;
/*class App extends Component{
  render(){
    return <div style={{width: '100%', height: '400px'}}>
      <Map  amapkey={'3f226058c3cd00f6fe9dfb6420904268'}/>
    </div>
  }
}*/

class App extends React.Component{
  constructor(){
    super();
    this.toolEvents = {
      created: (tool) => {
        this.tool = tool;
      }
    }
    //this.mapPlugins = {longitude: 121.2932245, latitude: 31.1925968};
    //this.zooms = [3-18];   121.2936837, latitude: 31.1937723};
    //this.mapCenter = {longitude: 121.2936837, latitude: 31.1937723};  31.1925968,121.2932245,17.13z

  }

  render(){
    const {record} =this.props;
    let  assetNumber =  record['1'];
    if(assetNumber==="NV-TB9716"){
      this.markerPosition = {longitude: 121.2932245, latitude: 31.1925968};
      this.mapCenter = {longitude: 121.2932245, latitude: 31.1925968};
    }else if(assetNumber==="AD-359916"){//121.5175704, latitude: 31.2460267};
      this.markerPosition = {longitude: 121.5195704, latitude: 31.2460267};
      this.mapCenter = {longitude: 121.5195704, latitude: 31.2460267};
    }else if(assetNumber==="ARCM300T-Z-2G"){//121.5175704, latitude: 31.2460267};  去
      this.markerPosition = {longitude: 117.413797, latitude: 31.954947};
      this.mapCenter = {longitude: 117.413797, latitude: 31.954947};
    }else if(assetNumber==="ASD862O-GB"){//121.5175704, latitude: 31.2460267};
      this.markerPosition = {longitude: 121.2293614, latitude: 30.983012};
      this.mapCenter = {longitude: 121.2293614, latitude: 30.983012};
    }else if(assetNumber==="BG-569ASD"){//121.5175704, latitude: 31.2460267};
      // TODO
      this.markerPosition = {longitude: 121.687247, latitude: 31.317757};
      this.mapCenter = {longitude: 121.687247, latitude: 31.317757};
    }else{//31.812578, 117.088391
      this.markerPosition = {longitude: 117.090391, latitude: 31.812578};
      this.mapCenter = {longitude: 117.090391, latitude: 31.812578};

    }
    return <div>
      <div style={{width: '100%', height: 400}}>
        <Map
         // plugins={this.mapPlugins}
          center={this.mapCenter}
          zoom={14}
          title={"test"}
        >
          <Marker position={this.markerPosition} />
        </Map>
      </div>
    </div>
  }
}

/*ReactDOM.render(
  <App/>, mountNode
)*/


/*class FormSub extends Component {

    state = {
        checkNick: false,
        value: undefined,
        treeData:[],
        treeData2:[]
    };*/


    /*constructor(props){
        super(props);
        this.init();
    }*/

   /* init= () =>{
        const thiz = this;
        GET('/organization/findSelectData',function(result){
            if(result.success){

                thiz.setState({treeData:result.result})
            }
        },function(error){
            console.log(error)
        })

      //获取应用标识
      GET('/application/findApplicationData',function(result){
        if(result.success){

          thiz.setState({treeData2:result.result})
        }
      },function(error){
        console.log(error)
      })
    }*/



    /*onChange = (value) => {
        console.log(value);
        this.setState({ value });
    }*/

    /*render(){




        return (
          <div> <Map amapkey="3f226058c3cd00f6fe9dfb6420904268"  version="1.4.0" /></div>


        )
    }*/
/*}*/
/*
export default createForm()(FormSub);*/

export default createForm()(App);
