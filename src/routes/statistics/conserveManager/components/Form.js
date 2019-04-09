import React, { Component } from 'react';
import { Form, Button, Input, Select ,DatePicker} from 'antd';
import {TreeCheck} from 'components/Tree';
import { POST,GET,PUT,DELETE } from '../../../../services/api';
import moment from 'moment';

const FormItem = Form.Item;
const {TextArea } =Input;
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
        /*const thiz = this;
        GET('/menu/getLoginUserMenuInfo',function(result){
            if(result.success){
                thiz.setState({treeData:result.result})
            }
        },function(error){
            console.log(error)
        })*/
    }

    onCheck = (checkedKeys) =>{
        this.props.form.setFieldsValue({'menuIds':checkedKeys});
    }

    render(){
        const { getFieldDecorator } = this.props.form;
        const {record} =this.props;
        const {treeData} = this.state;

        const formItemLayout = {
            labelCol: { span: 6 },
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
                    {getFieldDecorator('gallery_name', {
                        initialValue:record?record['gallery_name']:null,
                        rules: [{
                            required: true,
                            message: '请输入隧道名称',
                        }],
                    })(
                        <Input placeholder="请输入隧道名称" />
                    )}
                </FormItem>

                <FormItem {...formItemLayout} label="任务名称">
                    {getFieldDecorator('work_name', {
                        initialValue:record?record['work_name']:null,
                      rules: [{
                        required: true,
                        message: '请输入任务名称',
                      }],

                    })(
                         <Input placeholder="请输入任务名称" />
                    )}
                </FormItem>

              <FormItem {...formItemLayout} label="任务详细">
                {getFieldDecorator('work_detailed', {
                  initialValue:record?record['work_detailed']:null,
                  rules: [{
                    required: true,
                    message: '请输入任务详细',
                  }],

                })(
                  <Input placeholder="请输入任务详细" />
                )}
              </FormItem>

              <FormItem {...formItemLayout} label="计划类型">
                {getFieldDecorator('plan_type', {
                  initialValue:record?record['plan_type']:undefined ,
                  rules: [{
                    required: true,
                    message: '请输入计划类型',
                  }],

                })(
                  <Select  placeholder="请选择计划类型">
                    <Option value="计划">计划</Option>
                  </Select>
                )}
              </FormItem>

              <FormItem {...formItemLayout} label="任务类型">
                {getFieldDecorator('work_type', {
                  initialValue:record?record['work_type']:null,
                })(
                  <Input placeholder="请输入任务类型" />
                )}
              </FormItem>

              <FormItem {...formItemLayout} label="任务执行人">
                {getFieldDecorator('worker', {
                  initialValue:record?record['worker']:null,
                  rules: [{
                    required: true,
                    message: '请输入任务执行人',
                  }],
                })(
                  <Input placeholder="请输入任务执行人" />
                )}
              </FormItem>

              <FormItem {...formItemLayout} label="预计开始时间">
                {getFieldDecorator('start_date', {
                  initialValue:record?moment(record['start_date'],'YYYY-MM-DD'):null,
                  rules: [{
                    required: true,
                    message: '请输入预计开始时间',
                  }],
                })(
                  <DatePicker style={{width:'100%'}}/>
                )}
              </FormItem>

              <FormItem {...formItemLayout} label="预计结束时间">
                {getFieldDecorator('end_date', {
                  initialValue:record?moment(record['end_date'],'YYYY/MM/DD'):null,
                  rules: [{
                    required: true,
                    message: '请输入结束时间',
                  }],
                })(
                  <DatePicker style={{width:'100%'}}/>
                )}
              </FormItem>

            </Form>
        )
    }
}
export default createForm()(FormSub);