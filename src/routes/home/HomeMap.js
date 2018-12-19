import React from "react";
import { Map, Polyline } from 'react-amap';

const randomPath = () => ({
/*  longitude: 60 + Math.random() * 10 ,
  latitude: 10 + Math.random() * 10  ,*/
  longitude: Math.random()*121.493061 ,
  latitude: Math.random()*31.221953  ,
})

export default class HomeMap extends React.Component{

  constructor(){
    super();
    this.state = {
      visible: true,
      draggable: true,
      path: [
          {longitude:121.493082,latitude:31.222005},
          {longitude:121.499047,latitude:31.220954},
          {longitude:121.504186,latitude:31.222528},
          {longitude:121.508907,latitude:31.223849},
          {longitude:121.515988,latitude:31.227069 }
        ],
    };
    this.lineEvents = {
      show: () => {console.log('line show')},
    }
  }

  render(){
    return(
        <Map plugins={['ToolBar']} center={{longitude:121.506566,latitude:31.223001}} zoom={15}>
          <Polyline
            path={ this.state.path }
            events={ this.lineEvents }
            visible={ this.state.visible }
            draggable={ this.state.draggable }
          />
        </Map>)

  }
}