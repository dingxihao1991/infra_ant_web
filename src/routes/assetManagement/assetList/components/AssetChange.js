import React, { Component } from 'react';
import { Form, Input,Select} from 'antd';


/**
 * 资产变更页面
 *
 */


const FormItem = Form.Item;
const {TextArea } =Input;
const createForm = Form.create;

class AssetChange extends Component {


    constructor(props){
        super(props);
    }

    render(){
        const { getFieldDecorator  } = this.props.form;
        const {record} =this.props;

        const formItemLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 17 }
        }
        return (

            <Form ref='form'>
                <FormItem
                    label="变更状态："
                    {...formItemLayout}>
                    {getFieldDecorator('applicationName', {
                        initialValue:record?record['applicationName']:null,
                        rules: [{
                            required: true,
                            message: '请选中变更状态',
                        }],
                    })(
                        <Select placeholder="请选择变更状态" >
                            <Option value="使用">使用</Option>
                            <Option value="停用">停用</Option>
                            <Option value="报废" >报废</Option>
                            <Option value="封存" >封存</Option>
                        </Select>
                    )}
                </FormItem>
                <FormItem {...formItemLayout} label="变更原因">
                    {getFieldDecorator('describe', {
                        initialValue:record?record['describe']:null,
                        rules: [{
                            message: '请输入变更原因',
                        }],
                    })(
                        <TextArea placeholder="请输入变更原因" rows={4} />
                    )}
                </FormItem>


            </Form>
        )
    }
}
export default createForm()(AssetChange);