import React, { Component } from 'react';
import { Form, Button, Input, Select ,DatePicker} from 'antd';
import {TreeCheck} from 'components/Tree';
import { POST,GET,PUT,DELETE } from '../../services/api';
import moment from 'moment';

const FormItem = Form.Item;
const {TextArea } =Input;
const createForm = Form.create;

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
                    label="管廊："
                    {...formItemLayout}>
                    {getFieldDecorator('gallery_name', {
                        initialValue:record?record['gallery_name']:null,
                        rules: [{
                            required: true,
                            message: '请输入管廊名称',
                        }],
                    })(
                        <Input placeholder="请输入管廊名称" />
                    )}
                </FormItem>

                <FormItem {...formItemLayout} label="计划名称">
                    {getFieldDecorator('work_name', {
                        initialValue:record?record['work_name']:null,
                      rules: [{
                        required: true,
                        message: '请输入计划名称',
                      }],

                    })(
                         <Input placeholder="请输入计划名称" />
                    )}
                </FormItem>

              <FormItem {...formItemLayout} label="计划详细">
                {getFieldDecorator('work_detailed', {
                  initialValue:record?record['work_detailed']:null,
                  rules: [{
                    required: true,
                    message: '请输入计划详细',
                  }],

                })(
                  <Input placeholder="请输入计划详细" />
                )}
              </FormItem>

              <FormItem {...formItemLayout} label="计划类型">
                {getFieldDecorator('work_type', {
                  initialValue:record?record['work_type']:undefined ,
                  rules: [{
                    required: true,
                    message: '请输入计划类型',
                  }],

                })(
                  <Select  placeholder="请选择计划类型">
                    <Option value="巡检">巡检</Option>
                    <Option value="养护">养护</Option>
                    <Option value="其他">其他</Option>
                  </Select>
                )}
              </FormItem>

              <FormItem {...formItemLayout} label="计划路线">
                {getFieldDecorator('work_line', {
                  initialValue:record?record['work_line']:null,
                })(
                  <Input placeholder="请输入计划路线" />
                )}
              </FormItem>

              <FormItem {...formItemLayout} label="计划周期">
                {getFieldDecorator('work_time', {
                  initialValue:record?record['work_time']:null,
                  rules: [{
                    required: true,
                    message: '请输入计划周期',
                  }],
                })(
                  <Input placeholder="请输入计划周期" />
                )}
              </FormItem>

              <FormItem {...formItemLayout} label="执行时间">
                {getFieldDecorator('startDate', {
                  initialValue:record?moment(record['startDate'],'YYYY/MM/DD'):null,
                  rules: [{
                    required: true,
                    message: '请输入执行时间',
                  }],
                })(
                  <DatePicker style={{width:'33em'}}/>
                )}
              </FormItem>

            </Form>
        )
    }
}
export default createForm()(FormSub);