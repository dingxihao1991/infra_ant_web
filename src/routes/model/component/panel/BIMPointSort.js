import React, {Component} from 'react';
import {Divider } from 'antd';
import {sortable} from 'react-sortable';


class BIMPoint extends Component {


    state = {
        PointsName: null
    }

    deleteInterestPoint = (id) => {

    }

    editInterestPoint = (id, name) => {

    }

    loadInterestPoint = (id) => {
    }

    Edit = (evt) => {
        this.setState({PointsName: evt.target.value});
    }

    render() {
        const {items, sortId, index} = this.props

        return (

            <li {...this.props}    key={index}
                style={{border: 'none', fontSize: '14px', listStyle: 'none', height: '30px'}}>
                <input defaultValue={this.props.children.name} onChange={this.Edit} className="m-l-sm m-t-sm"
                       style={PointInput}/>
                <svg className="icon" aria-hidden="true" onClick={this.loadInterestPoint.bind(this, this.props.children.id)}>
                    <use href='#icon-sanweimoxing2'></use>
                </svg>

                <svg className="icon" aria-hidden="true" onClick={this.editInterestPoint.bind(this, this.props.children.id)}>
                    <use href='#icon-edit1'></use>
                </svg>

                <svg className="icon" aria-hidden="true" onClick={this.deleteInterestPoint.bind(this, this.props.children.id)}>
                    <use href='#icon-delete'></use>
                </svg>
            </li>
        )
    }
}

export var SortableItem = sortable(BIMPoint)

const PointInput = {
    background: 'transparent',
    border: 'none',
    width: '150px',
    overflow: 'hidden',
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",

}