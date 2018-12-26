import React from "react";
import { Map, Polyline } from 'react-amap';


const a = [
  {longitude:121.447709,latitude:31.141687},
  {longitude:121.454361,latitude:31.143358},
  {longitude:121.46554,latitude:31.144588}
]
const b = [
  {longitude:121.490851,latitude:31.19793},
  {longitude:121.490819,latitude:31.194737},
  {longitude:121.491291,latitude:31.193369},
  {longitude:121.493298,latitude:31.191084},
  {longitude:121.494971,latitude:31.189946},
  {longitude:121.497847,latitude:31.188046},
]
export default class HomeMap extends React.Component{

  state={
    src:'http://localhost/static/homemap.html'
  }

  constructor(){
    super();
/*    this.state = {
      visible: true,
      draggable: false,
      path: [
          {longitude:121.493082,latitude:31.222005},
          {longitude:121.499047,latitude:31.220954},
          {longitude:121.504186,latitude:31.222528},
          {longitude:121.508907,latitude:31.223849},
          {longitude:121.515988,latitude:31.227069 }
        ],
    };*/
    this.lineEvents = {
      show: () => {console.log('line show')},
    }
  }

  render(){
    const {src} = this.state;
    return(
      <iframe id='map_iframe' src={src} width='100%' height='100%' style={{'borderWidth':'0px'}}></iframe>
        )
    {/*<Map plugins={['ToolBar']} center={{longitude:121.506566,latitude:31.223001}} zoom={15}>
          <Polyline
            path={ this.state.path }
            events={ this.lineEvents }
            visible={ this.state.visible }
            draggable={ this.state.draggable }
          />
          <Polyline
            path={a}
            events={ this.lineEvents }
            visible={ this.state.visible }
            draggable={ this.state.draggable }
          />
          <Polyline
            path={b}
            events={ this.lineEvents }
            visible={ this.state.visible }
            draggable={ this.state.draggable }
          />
        </Map>*/}
  }
}