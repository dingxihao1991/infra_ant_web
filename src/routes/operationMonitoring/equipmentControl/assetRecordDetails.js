import React, { Component } from 'react';
import { Form, Input} from 'antd';


/**
 * 资产维保记录详情页面
 *
 * @type {FormItem}
 */

const FormItem = Form.Item;
const createForm = Form.create;
const {TextArea } =Input;

class FormSub extends Component {

  state = {
    checkNick: false,
    value: undefined,
    treeData:[],
    treeData2:[]
  };


  constructor(props){
    super(props);
  }

  onChange = (value) => {
    console.log(value);
    this.setState({ value });
  }

  render(){
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 17 }
    }
    return (

      <Form ref='form'>


        <FormItem {...formItemLayout} label="维保单号">
          {getFieldDecorator('applicationId', {
            initialValue:"WB-BG-0000001",
          })(
            <Input
            />
          )}
        </FormItem>

        <FormItem {...formItemLayout} label="资产设备编号">
          {getFieldDecorator('applicationId', {
            initialValue:"NV-TB9716",
          })(
            <Input
            />
          )}
        </FormItem>

        <FormItem {...formItemLayout} label="资产设备名称">
          {getFieldDecorator('applicationId', {
            initialValue:"安科瑞智慧用电在线监控装置",
          })(
            <Input
            />
          )}
        </FormItem>

        <FormItem {...formItemLayout} label="资产设备类型">
          {getFieldDecorator('applicationId', {
            initialValue:"电力系统",
          })(
            <Input
            />
          )}
        </FormItem>

        <FormItem {...formItemLayout} label="资设所属系统">
          {getFieldDecorator('applicationId', {
            initialValue:"管廊系统",
          })(
            <Input
            />
          )}
        </FormItem>

        <FormItem {...formItemLayout} label="维保类型">
          {getFieldDecorator('applicationId', {
            initialValue:"日常检修",
          })(
            <Input
            />
          )}
        </FormItem>

        <FormItem {...formItemLayout} label="维保人员">
          {getFieldDecorator('applicationId', {
            initialValue:"李明",
          })(
            <Input
            />
          )}
        </FormItem>

        <FormItem {...formItemLayout} label="维保说明" >
          {getFieldDecorator('orgRemark', {
            initialValue:"/",
          })(
            <TextArea  rows={4} />
          )}
        </FormItem>

      </Form>
    )
  }
}
export default createForm()(FormSub);