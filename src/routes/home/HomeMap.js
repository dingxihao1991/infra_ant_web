import React from "react";
import { Map, Polyline } from 'react-amap';

import styles from './home.less';

export default class HomeMap extends React.Component{

  state={
    src:'http://localhost/static/webgis3D/index.html'
  }

  constructor(){
    super();
  }

  render(){
    const {src} = this.state;
    return(
      <iframe id='map_iframe' src={src} width='100%' height='100%' className={styles.homeMap} ></iframe>
        )
  }
}