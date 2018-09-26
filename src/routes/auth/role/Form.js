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

            </Form>
        )
    }
}
export default createForm()(FormSub);