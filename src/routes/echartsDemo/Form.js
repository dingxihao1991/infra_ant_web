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
    this.mapPlugins = ['ToolBar'];
    //this.mapCenter = {longitude: 121.2936837, latitude: 31.1937723};
    this.markerPosition = {longitude: 121.2936837, latitude: 31.1937723};
    this.mapCenter = {longitude: 121.4566333, latitude: 31.1654148};
  }

  render(){
    return <div>
      <div style={{width: '100%', height: 400}}>
        <Map
          plugins={this.mapPlugins}
          center={this.mapCenter}
          zoom={6}
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
