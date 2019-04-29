import React, {PureComponent} from 'react';
import { Layout,Button} from 'antd';
import Model from  '../model/component/index';
import Home from  './Home';
import {connect} from 'dva';
import HomeMap from './HomeMap';
import { push } from 'react-router-redux'
import cx from 'classnames';

import styles from './home.less';

@connect(({user, global = {}, loading}) => ({
    collapsed: global.collapsed
}))
export default class HomeIndex extends PureComponent{

    state= {
        activeTab: "monitorGIS",
        tabsPanel:[
            {id:'monitorGIS',component:HomeMap},
            {id: 'BIMPage', component: Model},
            {id: 'monitorCockpit', component: Home}
        ],
        monitorButton:[
            {id: 'monitorGIS', name: '概览', icon: '#icon-map', bottom: '100'},
            {id: 'BIMPage', name: '模型', icon: '#icon-sanweimoxing', bottom: '50'},
            {id: 'monitorCockpit', name: '驾驶舱', icon: '#icon-shouye', bottom: '0'},

        ]
    }

    switchover =(page)=>{

        this.setState({
            activeTab: page.id
        });
    }
    render(){
        const {tabsPanel,activeTab,monitorButton} = this.state
        const {location} = this.props

        const className = cx(styles.home,location!=undefined?(location.pathname == '/index' ? 'show-active' : 'hide-active'):'hide-active');

        return (
            <div style={{height:'100%'}} className={className}>
                <div style={PageMenu} >
                    {monitorButton.map(monitor => (
                        <p key={monitor.id} className="svg" onClick={this.switchover.bind(this, monitor)}>
                            <svg className="icon" aria-hidden="true">
                                <use href={monitor.icon}></use>
                            </svg>
                        </p>

                    ))}
                </div>

                {tabsPanel.map(panel => (
                    <div id={panel.id} key={panel.id} className={activeTab == panel.id ? 'show-active' : 'hide-active'} style={{height: '100%',minHeight:400}}>
                        <panel.component/>
                    </div>
                ))}
            </div>
        )
    }
}


const PageMenu = {
    zIndex: '999',
    bottom: '10px',
    position: 'fixed',
    width:'50px',
    marginLeft:'10px'
}