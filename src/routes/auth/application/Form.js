import React, { Component } from 'react';
import { Form, Button, Input} from 'antd';
import { POST,GET,PUT,DELETE } from '../../../services/api';

import {TreeCheck} from 'components/Tree';
const FormItem = Form.Item;
const {TextArea } =Input;
const createForm = Form.create;


class FormSub extends Component {
    constructor(props){
        super(props)
        this.init();
    }

    state = {
        checkNick: false,
        treeData:[]
    };

    componentDidMount(){

    }

    init = () =>{
        const thiz = this;
        GET('/menu/findSelectData/4',function(result){
            if(result.success){
                thiz.setState({treeData:result.result})
            }
        },function(error){
            console.log(error)
        })
    }
    onCheck = (checkedKeys) =>{
        console.log("选中的节点："+checkedKeys);
        this.props.form.setFieldsValue({'menuIds':checkedKeys});
    }

    render(){
        const { getFieldDecorator } = this.props.form;
        const {record} =this.props;
        const {treeData} = this.state;
        const formItemLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 17 }
        }

        const tree ={
            treeData:treeData,//treeData,//
            onCheck: this.onCheck,
            expandedKeys:record?record['menuIds']:null,
        }
        return (
            <Form ref='form'>
                <FormItem
                    label="应用名称："
                    {...formItemLayout}>
                    {getFieldDecorator('applicationName', {
                        initialValue:record?record['applicationName']:null,
                        rules: [{
                            required: true,
                            message: '请输入应用名称',
                        }],
                    })(
                        <Input placeholder="请输入应用名称" />
                    )}
                </FormItem>
                <FormItem {...formItemLayout} label="应用标识">
                    {getFieldDecorator('code', {
                        initialValue:record?record['code']:null,
                        rules: [{
                            required: true,
                            message: '请输入应用标识',
                        }],
                    })(
                        <Input placeholder="请输入应用标识" />
                    )}
                </FormItem>
                <FormItem {...formItemLayout} label="应用描述">
                    {getFieldDecorator('describe', {
                        initialValue:record?record['describe']:null,
                        rules: [{
                            message: '请输入应用描述',
                        }],
                    })(
                        <TextArea placeholder="请输入描述" rows={4} />
                    )}
                </FormItem>
                <FormItem {...formItemLayout} label="应用菜单">
                    {getFieldDecorator('menuIds', {
                        initialValue:record?record['menuIds']:null,

                    })(
                        <div style={{"border":'1px solid #D9D9D9','height':'200px',overflow: 'auto'}}>
                            {treeData && treeData.length ?  <TreeCheck {...tree}/> : null}
                        </div>
                    )}
                </FormItem>

            </Form>
        )
    }
}
export default createForm()(FormSub);