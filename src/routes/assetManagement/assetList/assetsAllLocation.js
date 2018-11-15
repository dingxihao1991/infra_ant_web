import React from "react";
import { Form } from "antd";
import { Map, Markers } from "react-amap"; //引入高德地图

/**
 * 资产所有位置页面
 *
 * @type {<TOwnProps>(options?: FormCreateOption<TOwnProps>) => ComponentDecorator}
 */

const createForm = Form.create;

//定义地图坐标
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
      {//松江南
        longitude: 121.2293614,
        latitude: 30.983012,
      },
    someProperty: 57
  },
  {
    draggable: true,
    position:
      {//长江隧道
        longitude: 121.687247,
        latitude: 31.317757,
      },
    someProperty: 57
  }

];

class App extends React.Component{
  constructor(){
    super();
    this.markers = columns;
    this.mapCenter = {longitude: 120, latitude: 31};
  }

  randomAngle(extData){
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

export default createForm()(App);
