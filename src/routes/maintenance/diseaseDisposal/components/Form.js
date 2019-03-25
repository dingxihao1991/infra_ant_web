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
                    label="隧道名称"
                    {...formItemLayout}>
                    {getFieldDecorator('pro_name', {
                        initialValue:record?record['pro_name']:null,
                        rules: [{
                            required: true,
                            message: '请输入隧道名称',
                        }],
                    })(
                        <Input placeholder="请输入隧道名称" />
                    )}
                </FormItem>

              <FormItem {...formItemLayout} label="负责人">
                {getFieldDecorator('pro_user', {
                  initialValue:record?record['pro_user']:null,
                  rules: [{
                    required: true,
                    message: '请输入负责人',
                  }],

                })(
                  <Input placeholder="请输入负责人" />
                )}
              </FormItem>

              <FormItem {...formItemLayout} label="是否沉降">
                {getFieldDecorator('menuType', {
                  initialValue:record?record['menuType']:null,
                  rules: [{
                    required: true,
                    message: '请选择是或否',
                  }],
                })(
                  <Select  placeholder="是否沉降">
                    <Option value="yes">发生沉降</Option>
                    <Option value="no">未发生沉降</Option>
                  </Select>,
                )}
              </FormItem>

              <FormItem {...formItemLayout} label="是否渗漏">
                {getFieldDecorator('menuType', {
                  initialValue:record?record['menuType']:null,
                  rules: [{
                    required: true,
                    message: '请选择是或否',
                  }],
                })(
                  <Select  placeholder="是否渗漏">
                    <Option value="yes">发生渗漏</Option>
                    <Option value="no">未发生渗漏</Option>
                  </Select>,
                )}
              </FormItem>

              <FormItem {...formItemLayout} label="是否环片收敛">
                {getFieldDecorator('menuType', {
                  initialValue:record?record['menuType']:null,
                  rules: [{
                    required: true,
                    message: '请选择是或否',
                  }],
                })(
                  <Select  placeholder="是否环片收敛">
                    <Option value="yes">发生环片收敛</Option>
                    <Option value="no">未发生环片收敛</Option>
                  </Select>,
                )}
              </FormItem>

              <FormItem {...formItemLayout} label="备注">
                {getFieldDecorator('pro_result', {
                  initialValue:record?record['pro_result']:null,
                  rules: [{
                    required: true,
                    message: '请输入备注',
                  }],

                })(
                  <Input placeholder="请输入备注" />
                )}
              </FormItem>
            </Form>
        )
    }
}
export default createForm()(FormSub);