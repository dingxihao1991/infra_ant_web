import React, { Component } from 'react';
import { Form, Button, Input, Select ,DatePicker} from 'antd';
import {TreeCheck} from 'components/Tree';
import { POST,GET,PUT,DELETE } from '../../../services/api';
import moment from 'moment';

const FormItem = Form.Item;
const {TextArea } =Input;
const createForm = Form.create;
const Option = Select.Option;

class FormEvent extends Component {
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
                    label="标题："
                    {...formItemLayout}>
                    {getFieldDecorator('eventName', {
                        initialValue:record?record['eventName']:null,
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

              <FormItem {...formItemLayout} label="管廊">
                {getFieldDecorator('gallery_name', {
                  initialValue:record?record['gallery_name']:null,
                  rules: [{
                    required: true,
                    message: '请输入管廊',
                  }],
                })(
                  <Input placeholder="请输入管廊" />
                )}
              </FormItem>

              <FormItem {...formItemLayout} label="开始时间">
                {getFieldDecorator('startDate', {
                  initialValue:record?moment(record['startDate'],'YYYY/MM/DD'):null,
                  rules: [{
                    required: true,
                    message: '请输入开始时间',
                  }],
                })(
                  <DatePicker style={{width:'33em'}}/>
                )}
              </FormItem>

              <FormItem {...formItemLayout} label="结束时间">
                {getFieldDecorator('endDate', {
                  initialValue:record?moment(record['endDate'],'YYYY/MM/DD'):null,
                  rules: [{
                    required: true,
                    message: '请输入结束时间',
                  }],
                })(
                  <DatePicker style={{width:'33em'}}/>
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
export default createForm()(FormEvent);