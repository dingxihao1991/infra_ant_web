import React, { Component } from 'react';
import { Form, Button, Input, Select ,Layout } from 'antd';
import UserUpload from './UserUpload';

const { Sider , Content} = Layout;

const Option = Select.Option;
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
            <Layout style={{"min-height":"auto"}}>
                <Content>
                    <Form ref='form'>
                        <FormItem
                            label="帐号："
                            {...formItemLayout}>
                            {getFieldDecorator('loginName', {
                                initialValue:record?record['loginName']:null,
                                rules: [{
                                    required: true,
                                    message: '请输入帐号',
                                }],
                            })(
                                <Input placeholder="请输入帐号" />
                            )}
                        </FormItem>
                        <FormItem {...formItemLayout} label="密码">
                            {getFieldDecorator('password', {
                                initialValue:record?record['password']:null,
                                rules: [{
                                    required: true,
                                    message: '请输入密码',
                                }],
                            })(
                                <Input placeholder="请输入密码" />
                            )}
                        </FormItem>
                        <FormItem {...formItemLayout} label="姓名">
                            {getFieldDecorator('userName', {
                                initialValue:record?record['userName']:null,
                                rules: [{
                                    required: true,
                                    message: '请输入姓名',
                                }],
                            })(
                                <Input placeholder="请输入姓名" />
                            )}
                        </FormItem>
                        <FormItem {...formItemLayout} label="手机号码">
                            {getFieldDecorator('mobilePhone', {
                                initialValue:record?record['mobilePhone']:null,
                                rules: [{
                                    required: true,
                                    message: '请输入手机号码',
                                }],
                            })(
                                <Input placeholder="请输入手机号码" />
                            )}
                        </FormItem>
                        <FormItem {...formItemLayout} label="邮箱">
                            {getFieldDecorator('email', {
                                initialValue:record?record['email']:null,
                            })(
                                <Input placeholder="请输入邮箱" />
                            )}
                        </FormItem>
                    </Form>
                </Content>
                <Sider>
                    <UserUpload/>
                </Sider>
            </Layout>

        )
    }
}
export default createForm()(FormSub);