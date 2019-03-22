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
                    label="工程名称"
                    {...formItemLayout}>
                    {getFieldDecorator('pro_name', {
                        initialValue:record?record['pro_name']:null,
                        rules: [{
                            required: true,
                            message: '请输入工程名称',
                        }],
                    })(
                        <Input placeholder="请输入工程名称" />
                    )}
                </FormItem>

              <FormItem {...formItemLayout} label="竣工时间">
                {getFieldDecorator('pro_date', {
                  initialValue:record?moment(record['pro_date'],'YYYY-MM-DD'):null,
                  rules: [{
                    required: true,
                    message: '请输入竣工时间',
                  }],
                })(
                  <DatePicker style={{width:'33em'}}/>
                )}
              </FormItem>

              <FormItem
                label="合同编码"
                {...formItemLayout}>
                {getFieldDecorator('pro_h', {
                  initialValue:record?record['pro_h']:null,
                  rules: [{
                    required: true,
                    message: '请输入合同编码',
                  }],
                })(
                  <Input placeholder="请输入合同编码" />
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

              <FormItem {...formItemLayout} label="过程记录">
                {getFieldDecorator('pro_g', {
                  initialValue:record?record['pro_g']:null,
                  rules: [{
                    required: true,
                    message: '请输入过程记录',
                  }],

                })(
                  <Input placeholder="请输入过程记录" />
                )}
              </FormItem>

              <FormItem {...formItemLayout} label="结果评估">
                {getFieldDecorator('pro_result', {
                  initialValue:record?record['pro_result']:null,
                  rules: [{
                    required: true,
                    message: '请输入结果评估',
                  }],

                })(
                  <Input placeholder="请输入结果评估" />
                )}
              </FormItem>
            </Form>
        )
    }
}
export default createForm()(FormSub);