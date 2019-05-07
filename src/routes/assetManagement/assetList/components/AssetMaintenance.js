import React, { Component } from 'react';
import { Form, Input,Select} from 'antd';


const FormItem = Form.Item;
const {TextArea } =Input;
const createForm = Form.create;

class AssetMaintenance extends Component {

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
                <FormItem {...formItemLayout} label="设备名称">
                    {getFieldDecorator('asset_description', {
                        initialValue:record?record['asset_description']:null,
                        rules: [{

                        }],
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem
                    label="维保类型："
                    {...formItemLayout}>
                    {getFieldDecorator('applicationName', {
                        initialValue:record?record['applicationName']:null,
                        rules: [{
                            required: true,
                            message: '请选择维保类型',
                        }],
                    })(
                        <Select placeholder="请选择维保类型" >
                            <Option value="保养">保养</Option>
                            <Option value="维修">维修</Option>
                            <Option value="更换" >更换</Option>
                        </Select>
                    )}
                </FormItem>
                <FormItem {...formItemLayout} label="备注">
                    {getFieldDecorator('describe', {
                        initialValue:record?record['describe']:null,
                        rules: [{

                        }],
                    })(
                        <TextArea  rows={4} />
                    )}
                </FormItem>


            </Form>
        )
    }
}
export default createForm()(AssetMaintenance);