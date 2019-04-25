import React, { Component } from 'react';
import { Form, Input} from 'antd';


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


        <FormItem {...formItemLayout} label="预案序号">
          {getFieldDecorator('applicationId', {
            initialValue:"1",
          })(
            <Input
            />
          )}
        </FormItem>

        <FormItem {...formItemLayout} label="预案名称">
          {getFieldDecorator('applicationId', {
            initialValue:"安检预案",
          })(
            <Input
            />
          )}
        </FormItem>

        <FormItem {...formItemLayout} label="预案属性">
          {getFieldDecorator('applicationId', {
            initialValue:"常规预案",
          })(
            <Input
            />
          )}
        </FormItem>

        <FormItem {...formItemLayout} label="预案类型">
          {getFieldDecorator('applicationId', {
            initialValue:"综合预案",
          })(
            <Input
            />
          )}
        </FormItem>

        <FormItem {...formItemLayout} label="预案编号">
          {getFieldDecorator('applicationId', {
            initialValue:"YA0000001",
          })(
            <Input
            />
          )}
        </FormItem>

        <FormItem {...formItemLayout} label="所属部门">
          {getFieldDecorator('applicationId', {
            initialValue:"隧道系统—安防部",
          })(
            <Input
            />
          )}
        </FormItem>

        <FormItem {...formItemLayout} label="是否备案">
          {getFieldDecorator('applicationId', {
            initialValue:"已备案",
          })(
            <Input
            />
          )}
        </FormItem>

        <FormItem {...formItemLayout} label="演练次数">
          {getFieldDecorator('applicationId', {
            initialValue:"3",
          })(
            <Input
            />
          )}
        </FormItem>

        <FormItem {...formItemLayout} label="最近演练日期">
          {getFieldDecorator('applicationId', {
            initialValue:"2018-12-17",
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