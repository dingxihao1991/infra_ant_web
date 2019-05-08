import React, {PureComponent,Component} from 'react';
import { connect } from 'dva';
import PropTypes from 'prop-types';
import { Table ,Button ,Layout,List} from 'antd';
import {ModalForm,showConfirm}  from 'components/Modal';
import cx from 'classnames';
import Styles from '../index.less';
import HomeChartPanel from './HomeChartPanel';

import {BIMCCTVList,BIMPoint,BIMMonitor} from './panel';

const { Content} = Layout;

const data = [
    {
        name: '虚拟巡检',
        keyId: 'eye',
        icon: '#icon-male',
        bottom: '150px',
        component: BIMPoint,
        width: '300px',
        isCheck: false
    },
    {
        name: '综合监控',
        keyId: 'monitor',
        icon: '#icon-185036remotecontrolstreamline',
        bottom: '100px',
        component: BIMMonitor,
        width: '250px',
        isCheck: false
    },
    {
        name: 'CCTV',
        keyId: 'cctv',
        icon: '#icon-shexiangji',
        bottom: '50px',
        component: BIMCCTVList,
        width: '350px',
        isCheck: false
    }
]

//
// @connect(({modelData,loading})=>({
//     loading:loading.effects['modelData/fetch'],
//     list:modelData.list
// }))
 class model extends Component {

    state={
        src: 'http://localhost/static/webgl/index.html',//'http://192.168.200.29/static/webgl_suidao/iframe_page.html'//'http://139.196.195.214/DEV_sg/webgl/iframe-page' http://192.168.200.29/static/webgl/index.html
        showMenu:false,
        menu:'',
        isShowChart: true
    }

    constructor(props,context) {
        super(props,context);
    }

    onClick = item=>{
        let iframe = document.getElementById("webgl_iframe");
        if(iframe!=undefined){
            console.log(iframe.test());
            //console.log(iframe.contentWindow.gameInstance);
        }
    }
     changeMenu = (item) => {
         this.setState({
             showMenu: !this.state.showMenu,
             menu: item.keyId,
             contents: item
         });
     }

     ShowChart = () => {
         this.setState({isShowChart: !this.state.isShowChart, showMenu: false});
     }


     home= () =>{
         CallUnity("DoTweenSystem", "ResetMainCamera", "");
     }

    render() {
        const {location} = this.props
        const {src,showMenu,menu} = this.state;

        const proper = {
          showChart:true
        }
        const className = cx(location!=undefined?(location.pathname == '/index' ? 'show-active' : 'hide-active'):'hide-active');
        return(
             <div style={{width:'100%',height:'100%'}} className={Styles.model}>
                 <Button type="primary"
                         shape="circle"
                         icon="home"
                         title="初始视角"
                         style={{width: '40px',height: '40px',right: '15px',background: '#2196F3',
                             position: 'absolute',zIndex:'2',bottom:'214px'}}
                         onClick={this.home}
                 />

                 {data.map(item=> (
                     <p key={item.keyId} className="svg"  onClick={this.changeMenu.bind(this, item)}
                        title={item.name}
                        style={{width: '40px',height: '40px',right: '15px',backGround: '#2196F3',
                                position: 'absolute',zIndex:'2',bottom:item.bottom,
                                background:showMenu == true && menu == item.keyId ? "#FFA726" : '#2196F3'}}
                         >
                         <svg className="icon" aria-hidden="true">
                            <use href={item.icon}></use>
                         </svg>
                     </p>

                     )
                 )}
                 {data.map(panel => (
                     <div  key={panel.keyId}
                              className={showMenu == true && menu == panel.keyId ? 'show-active' : 'hide-active'}
                            style={{position: 'absolute',width:panel.width,right:'115px',bottom:panel.bottom}}>
                         <div>
                             <panel.component/>
                         </div>
                     </div>
                 ))}

                 <HomeChartPanel {...proper}/>
                 <Content style={{height: '100%', width: '100%', position: 'fixed'}}>
                     <iframe id='webgl_iframe'  sandbox="allow-scripts allow-forms allow-same-origin"  src={src} width='100%' height='100%' style={{'borderWidth':'0px',minHeight:'100%'}}/>
                 </Content>

             </div>
       )
    }
}
export default model
