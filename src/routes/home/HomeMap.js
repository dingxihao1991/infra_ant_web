import React from "react";
import { Map, Polyline } from 'react-amap';

import styles from './home.less';

export default class HomeMap extends React.Component{

  //南京：/static/webgis3D/index.html
  //保山：/static/webgis3D_baoshan/index.html
  state={
    src:'/static/webgis3D_baoshan/index.html'
  }

  render(){
    const {src} = this.state;
    return(
      <iframe id='map_iframe' src={src} width='100%' height='100%' className={styles.homeMap} ></iframe>
        )
  }
}