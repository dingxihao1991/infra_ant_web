import React, { Component } from 'react';
import { Form, InputNumber, Input} from 'antd';
import styles from '../style/style.less';
import {TreeCheck} from 'components/Tree';
const FormItem = Form.Item;
const {TextArea } =Input;
const createForm = Form.create;


class InventoryRegisterFrom extends Component {
    constructor(props){
        super(props)
    }

    onCheck = (checkedKeys) =>{
        this.props.form.setFieldsValue({'menuIds':checkedKeys});
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
                <FormItem {...formItemLayout} label="申领数量">
                    {getFieldDecorator('num', {
                        initialValue:record?record['num']:1,
                        rules: [{
                            required: true,
                            message: '请输入申领数量',
                        }],
                    })(
                        <InputNumber placeholder="请输入申领数量" min={1} {...formItemLayout}/>
                    )}
                </FormItem>
                <FormItem
                    label="设备名称："
                    {...formItemLayout}>
                    {getFieldDecorator('deviceName', {
                        initialValue:record?record['deviceName']:null,
                        rules: [{
                            required: true,
                            message: '请输入设备名称',
                        }],
                    })(
                        <Input placeholder="请输入应用名称" />
                    )}
                </FormItem>
                <FormItem {...formItemLayout} label="申领人">
                    {getFieldDecorator('registerUser', {
                        initialValue:record?record['registerUser']:null,
                        rules: [{
                            required: true,
                            message: '请输入申领人',
                        }],
                    })(
                        <Input placeholder="请输入申领人" />
                    )}
                </FormItem>
                <FormItem {...formItemLayout} label="描述">
                    {getFieldDecorator('describe', {
                        initialValue:record?record['describe']:null,
                        rules: [{
                            message: '请输入描述',
                        }],
                    })(
                        <TextArea placeholder="请输入描述" rows={4} />
                    )}
                </FormItem>

            </Form>
        )
    }
}
export default createForm()(InventoryRegisterFrom);