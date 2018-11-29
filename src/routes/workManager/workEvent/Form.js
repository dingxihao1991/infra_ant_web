import React, { Component } from 'react';
import { Form, Button, Input, Select ,DatePicker} from 'antd';
import {TreeCheck} from 'components/Tree';
import { POST,GET,PUT,DELETE } from '../../../services/api';
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
                    label="单位名称："
                    {...formItemLayout}>
                    {getFieldDecorator('unitName', {
                        initialValue:record?record['unitName']:null,
                        rules: [{
                            required: true,
                            message: '请输入单位名称',
                        }],
                    })(
                        <Input placeholder="请输入单位名称" />
                    )}
                </FormItem>

                <FormItem {...formItemLayout} label="人员">
                    {getFieldDecorator('name', {
                        initialValue:record?record['name']:null,
                      rules: [{
                        required: true,
                        message: '请输入人员',
                      }],

                    })(
                         <Input placeholder="请输入人员" />
                    )}
                </FormItem>

              <FormItem {...formItemLayout} label="事由">
                {getFieldDecorator('reasons', {
                  initialValue:record?record['reasons']:null,
                })(
                  <Input placeholder="请输入事由" />
                )}
              </FormItem>

              <FormItem {...formItemLayout} label="作业类型">
                {getFieldDecorator('workType', {
                  initialValue:record?record['workType']:undefined ,
                  rules: [{
                    required: true,
                    message: '请输入作业类型',
                  }],

                })(
                  <Select  placeholder="请选择作业类型">
                    <Option value="日常巡检">日常巡检</Option>
                    <Option value="紧急巡视">紧急巡视</Option>
                    <Option value="其他">其他</Option>
                  </Select>
                )}
              </FormItem>

              <FormItem {...formItemLayout} label="进入时间">
                {getFieldDecorator('startDate', {
                  initialValue:record?moment(record['startDate'],'YYYY/MM/DD'):null,
                  rules: [{
                    required: true,
                    message: '请输入进入时间',
                  }],
                })(
                  <DatePicker style={{width:'33em'}}/>
                )}
              </FormItem>

              <FormItem {...formItemLayout} label="离开时间">
                {getFieldDecorator('endDate', {
                  initialValue:record?moment(record['endDate'],'YYYY/MM/DD'):null,
                  rules: [{
                    required: true,
                    message: '请输入离开时间',
                  }],
                })(
                  <DatePicker style={{width:'33em'}}/>
                )}
              </FormItem>

              <FormItem {...formItemLayout} label="所属管廊">
                {getFieldDecorator('gallery_name', {
                  initialValue:record?record['gallery_name']:null,
                  rules: [{
                    required: true,
                    message: '请输入所属管廊',
                  }],
                })(
                  <Input placeholder="请输入所属管廊" />
                )}
              </FormItem>

            </Form>
        )
    }
}
export default createForm()(FormSub);