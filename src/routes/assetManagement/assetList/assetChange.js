import React, { Component } from 'react';
import { Form, Input,} from 'antd';


/**
 * 资产变更页面
 *
 */


const FormItem = Form.Item;
const {TextArea } =Input;
const createForm = Form.create;

class FormSub extends Component {


  constructor(props){
    super(props);
  }

  render(){
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 17 }
    }
    return (

      <Form ref='form'>
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
            initialValue:"智能照明设备",
          })(
            <Input
            />
          )}
        </FormItem>

        <FormItem {...formItemLayout} label="资产设备类型">
          {getFieldDecorator('applicationId', {
            initialValue:"照明系统",
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

        <FormItem {...formItemLayout} label="资产设备位置">
          {getFieldDecorator('applicationId', {
            initialValue:"上海市青浦区诸光路(地铁站)",
          })(
            <Input
            />
          )}
        </FormItem>

        <FormItem {...formItemLayout} label="资产设备状态">
          {getFieldDecorator('applicationId', {
            initialValue:"正常",
          })(
            <Input
            />
          )}
        </FormItem>

        <FormItem {...formItemLayout} label="描述" >
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