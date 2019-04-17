import React, {Component} from 'react';
import {Icon} from 'antd';

const data = [
  {
    name: '1',
    iconCls: 'fa fa-female',
  },
  {
    name: '2',
    iconCls: 'fa fa-female',
  },
  {
    name: '3',
    iconCls: 'fa fa-female',
  },
  {
    name: '4',
    iconCls: 'fa fa-male',
  },
  {
    name: '5',
    iconCls: 'fa fa-male',
  },
  {
    name: '6',
    iconCls: 'fa fa-male',
  },
  {
    name: '7',
    iconCls: 'fa fa-male',
  },
  {
    name: '8',
    iconCls: 'fa fa-male',
  },
  {
    name: '9',
    iconCls: 'fa fa-male',
  },
  {
    name: '10',
    iconCls: 'fa fa-male',
  },
  {
    name: '11',
    iconCls: 'fa fa-male',
  }
  ]

export default class MonitorPerson extends Component {


    state = {
        person: data
    }

    render() {
        const {person} = this.state;

        return (
            <div style={{fontSize: '11pt', display: 'flex', color: '#cecece',marginTop: 10}}>
                <span style={{marginRight: 18,marginLeft: 32}}>值班人员 {person.length} / {person.length} </span>
                {person.map((person, index) => (
                    <div key={index} style={{width: '20px',cursor: 'pointer'}}>
                        <Icon type="user" />
                    </div>
                ))}
            </div>
        )
    }

}