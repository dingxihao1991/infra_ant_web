import React, { Component } from 'react';
import { Form, Button, Input, Select,TreeSelect,InputNumber} from 'antd';
import { POST,GET,PUT,DELETE } from '../../../services/api';
import styles from './MenuManage.less';

const Option = Select.Option;
const FormItem = Form.Item;
const {TextArea } =Input;
const createForm = Form.create;
const TreeNode = TreeSelect.TreeNode;


class FormSub extends Component {

    state = {
        checkNick: false,
        value: undefined,
        treeData:[]
    };

    constructor(props){
        super(props);
        this.init();
    }

    init= () =>{
        const thiz = this;
        POST('/menu/findSelectData',4,function(result){
            if(result.success){

                thiz.setState({treeData:result.result})
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
                <FormItem {...formItemLayout} label="菜单类型">
                    {getFieldDecorator('menuType', {
                        initialValue:record?record['menuType']:null,
                        rules: [{
                            required: true,
                            message: '请选择菜单类型',
                        }],
                    })(
                        <Select  placeholder="请选择菜单类型">
                            <Option value="菜单">菜单</Option>
                            <Option value="按钮">按钮</Option>
                            <Option value="URL资源">URL资源</Option>
                        </Select>,
                    )}
                </FormItem>
                <FormItem
                    label="菜单名称："
                    {...formItemLayout}>
                    {getFieldDecorator('menuName', {
                        initialValue:record?record['menuName']:null,
                        rules: [{
                            required: true,
                            message: '请输入菜单名称',
                        }],
                    })(
                       <Input placeholder="请输入菜单名称" />
                    )}
                </FormItem>
                <FormItem {...formItemLayout} label="上级菜单">
                    {getFieldDecorator('parentId', {
                        initialValue:record?record['parentId']:this.state.value,
                    })(
                        <TreeSelect
                            placeholder="不选默认为顶级根菜单"
                            showSearch
                            dropdownStyle={{ overflow: 'auto' }}
                            allowClear
                            onChange={this.onChange}
                            treeData={this.state.treeData}
                            />
                    )}
                </FormItem>
                <FormItem label="菜单图标："{...formItemLayout}>
                    {getFieldDecorator('menuIcon', {
                        initialValue:record?record['menuIcon']:null,
                    })(
                        <Input placeholder="请输入菜单" />
                    )}
                </FormItem>
                <FormItem {...formItemLayout} label="权限标识">
                    {getFieldDecorator('authCode', {
                        initialValue:record?record['authCode']:null,
                        rules: [{
                            required: true,
                            message: '请输入权限标识',
                        }],
                    })(
                        <Input placeholder="请输入权限标识" />
                    )}
                </FormItem>
                <FormItem {...formItemLayout} label="URL资源">
                    {getFieldDecorator('menuPath', {
                        initialValue:record?record['menuPath']:null,
                    })(
                        <Input placeholder="请输入URL资源" />
                    )}
                </FormItem>
                <FormItem
                    label="菜单顺序："
                    {...formItemLayout}>
                    {getFieldDecorator('menuSrno', {
                        initialValue:record?record['menuSrno']:null,

                    })(
                        <InputNumber placeholder="请输入菜单顺序" style={{width:'100%'}}/>
                    )}
                </FormItem>
                <FormItem {...formItemLayout} label="描述">
                    {getFieldDecorator('menuRemark', {
                        initialValue:record?record['menuRemark']:null,
                    })(
                        <TextArea  rows={4} />
                    )}
                </FormItem>
            </Form>
        )
    }
}
export default createForm()(FormSub);