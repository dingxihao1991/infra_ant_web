import React, {PureComponent,Component} from 'react';
import { connect } from 'dva';
import PropTypes from 'prop-types';
import { Table ,Button ,Layout,List} from 'antd';
import {ModalForm,showConfirm}  from 'components/Modal';
import SideLayout from 'components/SideLayout';
import styles from './index.less';
const { Content} = Layout;


//
// @connect(({modelData,loading})=>({
//     loading:loading.effects['modelData/fetch'],
//     list:modelData.list
// }))
@connect(({user, global = {}, loading}) => ({
    collapsed: global.collapsed
}))

 class model extends Component {

    state={
      src: ''//'http://localhost/static/webgl/index.html'//'http://139.196.195.214/DEV_sg/webgl/iframe-page' http://192.168.200.29/static/webgl/index.html

    }

    constructor(props,context) {
        super(props,context);
    }

    componentDidMount(){
        const {dispatch } = this.props;
        // dispatch({
        //     type: 'modelData/fetch',
        //     payload: {
        //     },
        // });
    }

    onClick = item=>{
        console.log("--",item,document.domain )
        let iframe = document.getElementById("webgl_iframe");
        if(iframe!=undefined){
            console.log(iframe.test());
            //console.log(iframe.contentWindow.gameInstance);
        }
    }

    getRenderItem = item =>{
        return  (
            <List.Item
                key={item.fileId}
                className={styles.item}
                onClick={this.onClick.bind(this,item)}
            >
                <div >
                    <p>{item.fileName+'.'+item.type}</p>
                </div>
            </List.Item>
        )
    }

    render() {
        const {location} =this.props;

        return(
<<<<<<< HEAD
          <div style={{height:'400px'}}></div>
          //<iframe id='webgl_iframe' src={src} width='100%' style={{'borderWidth':'0px',minHeight:'100%'}}></iframe>
=======
            //<div style={{height:'400px'}} className={location!=undefined?(location.pathname == '/model/index' ? 'show-active' : 'hide-active'):'hide-active'} ></div>
            <iframe id='webgl_iframe'className={location!=undefined?(location.pathname == '/model/index' ? 'show-active' : 'hide-active'):'hide-active'}   src='http://192.168.200.29/static/webgl_suidao/iframe_page.html' width='100%' style={{'borderWidth':'0px',minHeight:'100%'}}></iframe>
>>>>>>> 591a15e2e205d03a14b6511f14744fa771c8e730
        )

    }
}
export default model
