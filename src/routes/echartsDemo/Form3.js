import React, { Component } from 'react';
import { Form, Button, Input, Select,TreeSelect,InputNumber} from 'antd';
import { Map ,Markers} from 'react-amap';//引入高德地图
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




const randomMarker1 =() =>{
  const columns = [{
    draggable: true,
    position:
      {
        latitude: "latitude: 40.04454622428974",
        longitude: "109.81919053061836",
      },
    someProperty: "57"
  }];
  this.setState({columns:columns})
}


const columns = [{
  draggable: true,
  position:
    {
      longitude: 121.2932245,
      latitude: 31.1925968,
    },
  someProperty: 57
},
  {
    draggable: true,
    position:
      {
        longitude: 121.5195704,
        latitude: 31.2460267,
      },
    someProperty: 57
  },
  {
    draggable: true,
    position:
      {
        longitude: 117.090391,
        latitude: 31.812578,
      },
    someProperty: 57
  },
  {
    draggable: true,
    position:
      {//新站区管廊
        longitude: 117.413797,
        latitude: 31.954947,
      },
    someProperty: 57
  },
  {
    draggable: true,
    position:
      {//松江南  30.983012,121.2293614,
        longitude: 121.2293614,
        latitude: 30.983012,
      },
    someProperty: 57
  },
  {
    draggable: true,
    position:
      {//长江隧道  31.3727025,121.6438394,12z
        longitude: 121.687247,
        latitude: 31.317757,
      },
    someProperty: 57
  }

];

const randomMarker = (len) => (
  Array(len).fill(true).map((e, idx) => ({
    position: {
      longitude: 100 + Math.random() * 30,
      latitude: 30 + Math.random() * 20,
    },
    draggable: true,
    someProperty: parseInt(Math.random() * 100),
  }))
);






class App extends React.Component{
  constructor(){
    super();
    this.markers = columns;//30.859224，119.782202
    console.log("开始打印markers");
    console.log(this.markers);
    console.log(columns);

    let data  = this.markers;
    console.log(data);
    console.log(data.toString());

    this.mapCenter = {longitude: 120, latitude: 31};
  }


  randomAngle(extData, index){
    if (extData.someProperty % 3 === 0){
      return 45;
    }
    return 0;
  }

  render(){
    return <div>
      <div style={{width: '100%', height: 400}}>
        <Map plugins={['ToolBar']} center={this.mapCenter} zoom={7}>
          <Markers
            markers={this.markers}
            bubble={false}
            angle={(extData, index) => { return this.randomAngle(extData, index)}}
            useCluster={false}

          />

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
