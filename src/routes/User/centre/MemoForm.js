import React, { Component } from 'react';
import { Form, Button, Input,DatePicker } from 'antd';
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
    };

    componentDidMount(){

    }

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
                    label="日期："
                    {...formItemLayout}>
                    {getFieldDecorator('applicationName', {
                        initialValue:record?record['applicationName']:null,
                        rules: [{
                            required: true,
                            message: '请选择日期',
                        }],
                    })(
                        <DatePicker  placeholder="请选择日期" size="large" width="100%" />
                    )}
                </FormItem>
                <FormItem {...formItemLayout} label="描述">
                    {getFieldDecorator('describe', {
                        initialValue:record?record['describe']:null,
                        rules: [{
                            message: '请输入描述',
                        }],
                    })(
                        <TextArea placeholder="请输入描述" rows={6} />
                    )}
                </FormItem>

            </Form>
        )
    }
}
export default createForm()(FormSub);