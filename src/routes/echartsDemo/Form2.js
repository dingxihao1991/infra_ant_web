import React, { Component } from 'react';
import { Form, Button, Input, Select,TreeSelect,InputNumber} from 'antd';
//import { POST,GET,PUT,DELETE } from '../../../services/api';
import styles from './test.less';

const Option = Select.Option;
const FormItem = Form.Item;
const {TextArea } =Input;
const createForm = Form.create;
const TreeNode = TreeSelect.TreeNode;

const treeData = [{
  title: 'Node1',
  value: '0-0',
  children: [{
    title: 'Child Node1',
    value: '0-0-1',
  }, {
    title: 'Child Node2',
    value: '0-0-2',
  }],
}, {
  title: 'Node2',
  value: '0-1',
}];

class FormSub extends Component {

  state = {
    checkNick: false,
    value: undefined,
    treeData:[],
    treeData2:[]
  };


  constructor(props){
    super(props);
    this.init();
  }

  init= () =>{
   /* const thiz = this;
    GET('/organization/findSelectData',function(result){
      if(result.success){

        console.log(result);
        thiz.setState({treeData:result.result})
      }
    },function(error){
      console.log(error)
    })

    //获取应用标识
    GET('/application/findApplicationData',function(result){
      if(result.success){

        //获取应用标识数量
        let appLength = result.result.length;
        thiz.setState({treeData2:result.result,appLength:appLength})

        console.log(appLength);
      }
    },function(error){
      console.log(error)
    })*/
  }



  onChange = (value) => {
    console.log(value);
    this.setState({ value });
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

        {/* {
                this.state.appLength === 1 ? (//系统标识只有1个，

                 null

                ) : (
                  <FormItem {...formItemLayout} label="系统标识">
                    {getFieldDecorator('applicationId', {
                      initialValue:record?record['applicationId']:this.state.value,
                      rules: [{
                        required: true,
                        message: '请选择系统标识',
                      }],
                    })(
                      <TreeSelect
                        placeholder="请选择系统标识"
                        showSearch
                        dropdownStyle={{ overflow: 'auto' }}
                        allowClear
                        //onChange={this.onChange}
                        treeData={this.state.treeData2}
                      />
                    )}
                  </FormItem>
                )
              }*/}

        <FormItem {...formItemLayout} label="资产设备编号">
          {getFieldDecorator('applicationId', {
            initialValue:record?record['applicationId']:"NV-TB9716",
            rules: [{
              required: false,
              message: '请选择资产设备编号',
            }],
          })(
            <TreeSelect
              placeholder="请选择资产设备编号"
              showSearch
              dropdownStyle={{ overflow: 'auto' }}
              allowClear
              //onChange={this.onChange}
              treeData={this.state.treeData2}
            />
          )}
        </FormItem>

        <FormItem
          label="资产设备名称："
          {...formItemLayout}>
          {getFieldDecorator('orgName', {
            initialValue:record?record['orgName']:"智能照明设备",
            rules: [{
              required: false,
              message: '请输入资产设备名称',
            }],
          })(
            <Input placeholder="请输入资产设备名称" />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="资产设备类型">
          {getFieldDecorator('parentId', {
            initialValue:record?record['parentId']:"照明系统",
          })(
            <TreeSelect
              showSearch
              dropdownStyle={{ overflow: 'auto' }}
              allowClear
              //onChange={this.onChange}
              treeData={this.state.treeData}
            />
          )}
        </FormItem>

        <FormItem {...formItemLayout} label="资产设备位置">
          {getFieldDecorator('orgType', {
            initialValue:record?record['orgType']:"上海市青浦区诸光路(地铁站)",
            rules: [{
              required: false,
              message: '请选择资产设备位置',
            }],
          })(
            <Select  placeholder="请选择资产设备状态">
              <Option value="集团">集团</Option>
              <Option value="公司">公司</Option>
              <Option value="部门">部门</Option>
              <Option value="虚拟机构">虚拟机构</Option>
            </Select>,
          )}
        </FormItem>

        <FormItem {...formItemLayout} label="资产设备状态">
          {getFieldDecorator('orgType', {
            initialValue:record?record['orgType']:"正常",
            rules: [{
              required: false,
              message: '请选择资产设备位置',
            }],
          })(
            <Select  placeholder="请选择资产设备状态">
              <Option value="集团">集团</Option>
              <Option value="公司">公司</Option>
              <Option value="部门">部门</Option>
              <Option value="虚拟机构">虚拟机构</Option>
            </Select>,
          )}
        </FormItem>

        <FormItem {...formItemLayout} label="描述" >
          {getFieldDecorator('orgRemark', {
            initialValue:record?record['orgRemark']:"/",
          })(
            <TextArea  rows={4} />
          )}
        </FormItem>
      </Form>
    )
  }
}
export default createForm()(FormSub);