import React, { Component } from 'react';
import { Form, Button, Input, Select} from 'antd';
import {TreeCheck} from 'components/Tree';
import { POST,GET,PUT,DELETE } from '../../../services/api';

const FormItem = Form.Item;
const {TextArea } =Input;
const createForm = Form.create;

class FormSub extends Component {
    constructor(props){
        super(props);
        this.init();
    }

    state = {
        checkNick: false,
        treeData: []
    };

    init = () =>{
        const thiz = this;
        GET('/menu/findSelectData/0',function(result){
            if(result.success){
                thiz.setState({treeData:result.result})
            }
        },function(error){
            console.log(error)
        })
    }

    onCheck = (checkedKeys) =>{

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
            checkStrictly: true,
            treeData:treeData,//treeData,//
            onCheck: this.onCheck,
            expandedKeys:record?record['menuIds']:null,
        }

        return (
            <Form ref='form'>
                <FormItem
                    label="角色名称："
                    {...formItemLayout}>
                    {getFieldDecorator('name', {
                        initialValue:record?record['name']:null,
                        rules: [{
                            required: true,
                            message: '请角色名称',
                        }],
                    })(
                        <Input placeholder="请角色名称" />
                    )}
                </FormItem>
                <FormItem {...formItemLayout} label="角色权限">
                    {getFieldDecorator('menuIds', {
                        initialValue:record?record['menuIds']:null,

                    })(
                        <div style={{"border":'1px solid #D9D9D9','height':'250px',overflow: 'auto'}}>
                            {treeData && treeData.length ?  <TreeCheck {...tree}/> : null}

                        </div>
                    )}
                </FormItem>
            </Form>
        )
    }
}
export default createForm()(FormSub);