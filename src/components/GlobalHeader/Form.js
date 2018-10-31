import React, { Component } from 'react';
import { Form, Button, Input} from 'antd';

const FormItem = Form.Item;
const createForm = Form.create;

class FormSub extends Component {
    constructor(props){
        super(props)
    }

    state = {
        checkNick: false,
        treeData:[]
    };

    validator= (rule, value, callback,source,options) =>{
        var newPassword = this.props.form.getFieldValue('newPassword');
        if(newPassword!=value){

            callback("两次密码不一致！");
        }else{
            callback()
        }

    }


    render(){
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 17 }
        }

        return (
            <Form ref='form'>
                <FormItem
                    label="旧密码:"
                    {...formItemLayout}>
                    {getFieldDecorator('formerPassword', {
                        rules: [{
                            required: true,
                            message: '请输入旧密码',
                        }],
                    })(
                        <Input type="password" placeholder="请输入旧密码" />
                    )}
                </FormItem>
                <FormItem {...formItemLayout} label="新密码:">
                    {getFieldDecorator('newPassword', {
                        rules: [{
                            required: true,
                            message: '请输入新密码',
                        }],
                    })(
                        <Input type="password" placeholder="请输入新密码" />
                    )}
                </FormItem>
                <FormItem {...formItemLayout} label="确认密码:">
                    {getFieldDecorator('verifyPassword', {
                        rules: [{
                            required: true,
                        //    message: '请确认密码',
                            validator:this.validator
                        }],
                    })(
                        <Input type="password" placeholder="请确认新密码" />
                    )}
                </FormItem>


            </Form>
        )
    }
}
export default createForm()(FormSub);