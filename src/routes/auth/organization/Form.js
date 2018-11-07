import React, { Component } from 'react';
import { Form, Button, Input, Select,TreeSelect,InputNumber} from 'antd';
import { POST,GET,PUT,DELETE } from '../../../services/api';
import styles from './organizationManage.less';

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
        const thiz = this;
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
      })
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

                <FormItem
                    label="机构名称："
                    {...formItemLayout}>
                    {getFieldDecorator('orgName', {
                        initialValue:record?record['orgName']:null,
                        rules: [{
                            required: true,
                            message: '请输入机构名称',
                        }],
                    })(
                       <Input placeholder="请输入机构名称" />
                    )}
                </FormItem>
                  <FormItem {...formItemLayout} label="上级机构">
                    {getFieldDecorator('parentId', {
                      initialValue:record?record['parentId']:this.state.value,
                    })(
                      <TreeSelect
                        placeholder="不选默认为顶级机构"
                        showSearch
                        dropdownStyle={{ overflow: 'auto' }}
                        allowClear
                        //onChange={this.onChange}
                        treeData={this.state.treeData}
                      />
                    )}
                  </FormItem>

              <FormItem {...formItemLayout} label="机构类型">
                {getFieldDecorator('orgType', {
                  initialValue:record?record['orgType']:null,
                  rules: [{
                    required: true,
                    message: '请选择机构类型',
                  }],
                })(
                  <Select  placeholder="请选择系统标识">
                    <Option value="集团">集团</Option>
                    <Option value="公司">公司</Option>
                    <Option value="部门">部门</Option>
                    <Option value="虚拟机构">虚拟机构</Option>
                  </Select>,
                )}
              </FormItem>
                <FormItem {...formItemLayout} label="描述" >
                    {getFieldDecorator('orgRemark', {
                        initialValue:record?record['orgRemark']:null,
                    })(
                        <TextArea  rows={4} />
                    )}
                </FormItem>
            </Form>
        )
    }
}
export default createForm()(FormSub);