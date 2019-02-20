import React,{PureComponent} from 'react';
import {
    Layout
} from "antd";

export default class AssetDocument extends PureComponent{

    render(){

        return(
            <Layout style={{height:'100%'}}>
                <img src='/images/bg2.png' width="100%" height="100%"/>
            </Layout>
        )
    }
}