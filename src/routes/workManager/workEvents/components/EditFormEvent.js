import React, { Component } from 'react';
import { Form, Button, Input, Select ,DatePicker} from 'antd';
import {TreeCheck} from 'components/Tree';
import { POST,GET,PUT,DELETE } from '../../../../services/api';
import moment from 'moment';

const FormItem = Form.Item;
const {TextArea } =Input;
const createForm = Form.create;
const Option = Select.Option;

class EditFormEvent extends Component {
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

        return (
            <Form ref='form'>
                <FormItem
                    label="标题："
                    {...formItemLayout}>
                    {getFieldDecorator('title', {
                        initialValue:record?record['title']:null,
                        rules: [{
                            required: true,
                            message: '请输入标题',
                        }],
                    })(
                        <Input placeholder="请输入标题" />
                    )}
                </FormItem>

                <FormItem {...formItemLayout} label="内容">
                    {getFieldDecorator('eventContent', {
                        initialValue:record?record['eventContent']:null,
                      rules: [{
                        required: true,
                        message: '请输入内容',
                      }],

                    })(
                         <Input placeholder="请输入内容" />
                    )}
                </FormItem>

              <FormItem {...formItemLayout} label="任务等级">
                {getFieldDecorator('workLevel', {
                  initialValue:record?record['workLevel']:undefined ,
                  rules: [{
                    required: true,
                    message: '请输入任务等级',
                  }],

                })(
                  <Select  placeholder="请选择任务等级">
                    <Option value="一级">一级</Option>
                    <Option value="二级">二级</Option>
                    <Option value="三级">三级</Option>
                  </Select>
                )}
              </FormItem>

              <FormItem {...formItemLayout} label="隧道">
                {getFieldDecorator('gallery_name', {
                  initialValue:record?record['gallery_name']:null,
                  rules: [{
                    required: true,
                    message: '请输入隧道',
                  }],
                })(
                  <Input placeholder="请输入隧道" />
                )}
              </FormItem>

              <FormItem {...formItemLayout} label="任务类型">
                {getFieldDecorator('workType', {
                  initialValue:record?record['workType']:undefined ,
                  rules: [{
                    required: true,
                    message: '请输入任务类型',
                  }],

                })(
                  <Select  placeholder="请选择任务类型">
                    <Option value="突发事件">突发事件</Option>
                    <Option value="设备故障">设备故障</Option>
                    <Option value="其他">其他</Option>
                  </Select>
                )}
              </FormItem>

              <FormItem {...formItemLayout} label="执行人">
                {getFieldDecorator('work_user', {
                  initialValue:record?record['work_user']:null,
                })(
                  <Input placeholder="请输入执行人" />
                )}
              </FormItem>
            </Form>
        )
    }
}
export default createForm()(EditFormEvent);