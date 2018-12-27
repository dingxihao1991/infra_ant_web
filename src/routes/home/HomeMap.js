import React from "react";
import { Map, Polyline } from 'react-amap';

export default class HomeMap extends React.Component{

  state={
    src:'http://192.168.200.29/static/homemap.html'
  }

  constructor(){
    super();
  }

  render(){
    const {src} = this.state;
    return(
      <iframe id='map_iframe' src={src} width='100%' height='100%' style={{'borderWidth':'0px'}}></iframe>
        )
  }
}