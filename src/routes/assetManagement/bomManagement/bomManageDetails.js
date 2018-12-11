import React, { Component } from 'react';
import { Form, Input} from 'antd';


/**
 * 备品备件详情页面
 *
 * @type {FormItem}
 */

const FormItem = Form.Item;
const createForm = Form.create;

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


        <FormItem {...formItemLayout} label="备件编号">
          {getFieldDecorator('applicationId', {
            initialValue:"BJ-TD-0000001",
          })(
            <Input
            />
          )}
        </FormItem>

        <FormItem {...formItemLayout} label="备件名称">
          {getFieldDecorator('applicationId', {
            initialValue:"探头",
          })(
            <Input
            />
          )}
        </FormItem>

        <FormItem {...formItemLayout} label="备件所属系统">
          {getFieldDecorator('applicationId', {
            initialValue:"其他系统",
          })(
            <Input
            />
          )}
        </FormItem>

        <FormItem {...formItemLayout} label="备件数量">
          {getFieldDecorator('applicationId', {
            initialValue:"15",
          })(
            <Input
            />
          )}
        </FormItem>

        <FormItem {...formItemLayout} label="最近更新时间">
          {getFieldDecorator('applicationId', {
            initialValue:"2018-11-19 15:03",
          })(
            <Input
            />
          )}
        </FormItem>

        <FormItem {...formItemLayout} label="备注">
          {getFieldDecorator('applicationId', {
            initialValue:"/",
          })(
            <Input
            />
          )}
        </FormItem>

      </Form>
    )
  }
}
export default createForm()(FormSub);