import React, { Component } from 'react';
import { Form, Button, Input, Select ,DatePicker} from 'antd';
import {TreeCheck} from 'components/Tree';
import { POST,GET,PUT,DELETE } from '../../../services/api';
import moment from 'moment';

const FormItem = Form.Item;
const {TextArea } =Input;
const createForm = Form.create;
const Option = Select.Option;
const children = [];

class FormSub extends Component {
    constructor(props){
        super(props);
        this.init();
    }

    state = {
        checkNick: false,
    };

    componentDidMount(){
      children.splice(0 , children.length);
      const {record} = this.props;
      for (let i = 0 , size = record.assetData.length ; i <  size; i++) {
         children.push(<Option key={record.assetData[i].asset_2} >{record.assetData[i].asset_2}</Option>);
      }
    }

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

    render(){
        const { getFieldDecorator } = this.props.form;
        const {record} =this.props;
        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 17 }
        }

        return (
            <Form ref='form'>
                <FormItem
                    label="模板名称："
                    {...formItemLayout}>
                    {getFieldDecorator('template_name', {
                        initialValue:record?record['template_name']:null,
                        rules: [{
                            required: true,
                            message: '请输入模板名称',
                        }],
                    })(
                        <Input placeholder="请输入模板名称" />
                    )}
                </FormItem>

              <FormItem
                label="计划类型："
                {...formItemLayout}>
                {getFieldDecorator('template_type', {
                  initialValue:"巡视",
                  rules: [{
                    required: true,
                    message: '请输入巡视',
                  }],
                })(
                  <Input placeholder="请输入巡视" disabled/>
                )}
              </FormItem>

              <FormItem {...formItemLayout} label="设备名称">
                {getFieldDecorator('work_type', {
                  initialValue:record?record['work_type']:undefined ,
                  rules: [{
                    required: true,
                    message: '请输入设备名称',
                  }],

                })(
                  <Select  placeholder="请选择设备名称" mode="multiple">
                    {children}
                  </Select>
                )}
              </FormItem>

                <FormItem {...formItemLayout} label="模板描述">
                    {getFieldDecorator('template_description', {
                        initialValue:record?record['template_description']:null,
                      rules: [{
                        required: true,
                        message: '请输入模板描述',
                      }],

                    })(
                         <Input placeholder="请输入模板描述" />
                    )}
                </FormItem>

              <FormItem {...formItemLayout} label="任务名称">
                {getFieldDecorator('work_name', {
                  initialValue:record?record['work_name']:null,
                })(
                  <Input placeholder="请输入任务名称" />
                )}
              </FormItem>

              <FormItem {...formItemLayout} label="任务描述">
                {getFieldDecorator('work_description', {
                  initialValue:record?record['work_description']:null,
                })(
                  <Input placeholder="请输入任务描述" />
                )}
              </FormItem>

 {/*             <FormItem {...formItemLayout} label="预计完成时间">
                {getFieldDecorator('startDate', {
                  initialValue:record?moment(record['startDate'],'YYYY/MM/DD'):null,
                  rules: [{
                    required: true,
                    message: '请输入预计完成时间',
                  }],
                })(
                  <DatePicker style={{width:'100%'}}/>
                )}
              </FormItem>*/}

            </Form>
        )
    }
}
export default createForm()(FormSub);