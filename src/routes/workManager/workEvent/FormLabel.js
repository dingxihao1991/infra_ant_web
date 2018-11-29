import React, { Component } from 'react';
import { Form, Button, Input, Select ,DatePicker} from 'antd';
import {TreeCheck} from 'components/Tree';
import { POST,GET,PUT,DELETE } from '../../../services/api';
import moment from 'moment';

const FormItem = Form.Item;
const {TextArea } =Input;
const createForm = Form.create;

class FormLabel extends Component {
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


  render(){
    const { getFieldDecorator } = this.props.form;
    const {record} =this.props;

    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 17 }
    }

    return (
      <Form ref='form'>
        <FormItem
          label="标签名称："
          {...formItemLayout}>
          {getFieldDecorator('labelName', {
            initialValue:record?record['labelName']:null,
            rules: [{
              required: true,
              message: '请输入标签名称',
            }],
          })(
            <Input placeholder="请输入标签名称" />
          )}
        </FormItem>
      </Form>
    )
  }
}
export default createForm()(FormLabel);