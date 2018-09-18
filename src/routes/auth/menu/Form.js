import React, { Component } from 'react';
import { Form, Button, Input, Select} from 'antd';
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
            <Form ref='form'>
                <FormItem
                    label="菜单名称："
                    {...formItemLayout}>
                    {getFieldDecorator('name', {
                        initialValue:record?record['name']:null,
                        rules: [{
                            required: true,
                            message: '请输入菜单名称',
                        }],
                    })(
                        <Input placeholder="请输入菜单名称" />
                    )}
                </FormItem>
                <FormItem {...formItemLayout} label="菜单类型">
                    {getFieldDecorator('type', {
                        initialValue:record?record['type']:null,
                        rules: [{
                            required: true,
                            message: '请选择菜单类型',
                        }],
                    })(
                        <Select  placeholder="请选择菜单类型">
                            <Option value="菜单">菜单</Option>
                            <Option value="按钮">按钮</Option>
                            <Option value="URL资源">URL资源</Option>
                        </Select>,
                    )}
                </FormItem>
                <FormItem label="菜单图标："{...formItemLayout}>
                    {getFieldDecorator('icon', {
                        initialValue:record?record['icon']:null,
                    })(
                        <Input placeholder="请输入菜单名称" />
                    )}
                </FormItem>
                <FormItem {...formItemLayout} label="URL资源">
                    {getFieldDecorator('menu_path', {
                        initialValue:record?record['menu_path']:null,
                    })(
                        <Input placeholder="请输入URL资源" />
                    )}
                </FormItem>

                <FormItem {...formItemLayout} label="描述">
                    {getFieldDecorator('describe', {
                        initialValue:record?record['describe']:null,
                    })(
                        <TextArea  rows={4} />
                    )}
                </FormItem>
            </Form>
        )
    }
}
export default createForm()(FormSub);