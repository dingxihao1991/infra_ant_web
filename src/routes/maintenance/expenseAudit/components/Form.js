import React, { Component } from 'react';
import { Form, Button, Input, Select ,DatePicker} from 'antd';
import { POST,GET,PUT,DELETE } from '../../../../services/api';
import moment from 'moment';

const FormItem = Form.Item;
const createForm = Form.create;
const Option = Select.Option;

class FormSub extends Component {

    constructor(props){
        super(props);
        this.init();
    }

    state = {
        checkNick: false,
        treeData: []
    };

    init = () =>{
    }

    onCheck = (checkedKeys) =>{
        this.props.form.setFieldsValue({'menuIds':checkedKeys});
    }

    render(){
        const { getFieldDecorator } = this.props.form;
        const {record} =this.props;
        const {treeData} = this.state;

        const formItemLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 17 }
        }

        const tree ={
            //checkStrictly:true,
            treeData:treeData,//treeData,////
            onCheck: this.onCheck,
            expandedKeys:record?record['menuIds']:null,
        }

        return (
            <Form ref='form'>
                <FormItem
                    label="费用项："
                    {...formItemLayout}>
                    {getFieldDecorator('cost_x', {
                        initialValue:record?record['cost_x']:null,
                        rules: [{
                            required: true,
                            message: '请输入费用项',
                        }],
                    })(
                        <Input placeholder="请输入费用项" />
                    )}
                </FormItem>

                <FormItem {...formItemLayout} label="收费标准">
                    {getFieldDecorator('cost_b', {
                        initialValue:record?record['cost_b']:null,
                      rules: [{
                        required: true,
                        message: '请输入收费标准',
                      }],

                    })(
                         <Input placeholder="请输入收费标准" />
                    )}
                </FormItem>

              <FormItem {...formItemLayout} label="单位">
                {getFieldDecorator('cost_d', {
                  initialValue:record?record['cost_d']:null,
                  rules: [{
                    required: true,
                    message: '请输入单位',
                  }],

                })(
                  <Input placeholder="请输入单位" />
                )}
              </FormItem>
            </Form>
        )
    }
}
export default createForm()(FormSub);