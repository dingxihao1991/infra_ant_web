import React, { Component } from 'react';
import { Form, Button, Input} from 'antd';

import {TreeCheck} from 'components/Tree';
const FormItem = Form.Item;
const createForm = Form.create;


class AddFloder extends Component {
    constructor(props){
        super(props)
    }

    state = {
        checkNick: false,
    };


    init = () =>{
    }
    render(){
        const { getFieldDecorator } = this.props.form;
        const {record} =this.props;

        const formItemLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 17 }
        }

        return (
            <Form ref='form'>
                <FormItem
                    label="文件名："
                    {...formItemLayout}>
                    {getFieldDecorator('fileName', {
                        initialValue:record?record['fileName']:null,
                        rules: [{
                            required: true,
                            message: '请输入文件名称',
                        }],
                    })(
                        <Input placeholder="请输入文件夹名称" />
                    )}
                </FormItem>
            </Form>
        )
    }
}
export default createForm()(AddFloder);