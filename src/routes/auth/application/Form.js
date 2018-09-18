import React, { Component } from 'react';
import { Form, Button, Input} from 'antd';
const FormItem = Form.Item;
const {TextArea } =Input;
const createForm = Form.create;

class FormSub extends Component {
    constructor(props){
        super(props)
    }

    state = {
        checkNick: false,
    };


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
                    label="应用名称："
                    {...formItemLayout}>
                    {getFieldDecorator('applicationName', {
                        initialValue:record?record['applicationName']:null,
                        rules: [{
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
            </Form>
        )
    }
}
export default createForm()(FormSub);