import React from "react";
import { Form } from "antd";
import { Map, Marker } from "react-amap"; //引入高德地图

/**
 * 资产设备单个定位页面
 *
 * @type {<TOwnProps>(options?: FormCreateOption<TOwnProps>) => ComponentDecorator}
 */

const createForm = Form.create;

class App extends React.Component{
  constructor(){
    super();
    this.toolEvents = {
      created: (tool) => {
        this.tool = tool;
      }
    }

  }

  render(){
    this.markerPosition = {longitude: 121.507077, latitude: 31.223281};
    this.mapCenter = {longitude: 121.507077, latitude: 31.223281};
    return <div>
      <div style={{width: '100%', height: 400}}>
        <Map
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


export default createForm()(App);
