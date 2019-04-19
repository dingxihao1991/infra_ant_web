import React, { Component } from 'react';
import { Form, Button, Input, Select ,Layout ,TreeSelect} from 'antd';
import UserUpload from './UserUpload';
import {GET, POST} from "../../../services/api";

const { Sider , Content} = Layout;

const Option = Select.Option;
const FormItem = Form.Item;
const {TextArea } =Input;
const createForm = Form.create;


class FormSub extends Component {
    constructor(props){
        super(props)
        this.init();
    }

    state = {
        checkNick: false,
        fileId: null,
        value: undefined,
        treeData:[],
        selectData:null,
        roleId:undefined,
        children:null
    };

    setSubFileId = (fileId)=>{
        this.props.form.setFieldsValue({'fileId':fileId});
    };



    init= () =>{
        const thiz = this;
    /*    console.log(this.props.record)
        let departmentId = null;
        if(this.props.record != null){
            departmentId = this.props.record.departmentId;
        }*/
        GET( '/organization/roleAndOrgs', function(result){ //6 代表登陆人的虚拟机构ID
            if(result.success){
                thiz.setState({treeData:result.result.jsonArray});
                var children = [];
                thiz.setState({selectData:result.result.list});

                for (let i = 0 ; i < thiz.state.selectData.length ; i++) {
                    children.push(<Option key={thiz.state.selectData[i].id}>{thiz.state.selectData[i].name}</Option>);
                }
                thiz.setState({children:children});
            }

        },function(error){
            console.log(error)
        })
    }

    onSelChange = (roleId) => {
        console.log(roleId);
        this.setState({ roleId });
    }

    render(){
        const { getFieldDecorator } = this.props.form;
        const { children } = this.state;
        const {record} =this.props;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 18 },
            style : {'width':'46%'}
        }
        const data = {
            setSubFileId: this.setSubFileId,
            imageURL: record ? record['imgDir'] : null,
        }
        return (
            <Layout style={{minHeight:"auto","display":"-webkit-box" ,'background': '#fff'}}>
                <Content style={{"flex":"1" ,'width': '80%'}}>
                    <Form ref='form' layout="inline">
                        <FormItem
                            label="帐号"
                            {...formItemLayout} >
                            {getFieldDecorator('loginName', {
                                initialValue:record?record['loginName']:null,
                                rules: [{
                                    required: true,
                                    message: '请输入帐号',
                                }],
                            })(
                                <Input placeholder="请输入帐号"/>
                            )}
                        </FormItem>
                        <FormItem {...formItemLayout} label="姓名">
                            {getFieldDecorator('userName', {
                                initialValue:record?record['userName']:null,
                                rules: [{
                                    required: true,
                                    message: '请输入姓名',
                                }],
                            })(
                                <Input placeholder="请输入姓名" />
                            )}
                        </FormItem>
                        <FormItem {...formItemLayout} label="手机">
                            {getFieldDecorator('mobilePhone', {
                                initialValue:record?record['mobilePhone']:null,
                                rules: [{
                                    required: true,
                                    message: '请输入手机号',
                                }],
                            })(
                                <Input placeholder="请输入手机号" />
                            )}
                        </FormItem>
                        <FormItem {...formItemLayout} label="邮箱">
                            {getFieldDecorator('email', {
                                initialValue:record?record['email']:null,
                            })(
                                <Input placeholder="请输入邮箱" />
                            )}
                        </FormItem>

                        <FormItem {...formItemLayout} label="证件号">
                            {getFieldDecorator('card', {
                                initialValue:record?record['card']:null,
                                rules: [{
                                    required: true,
                                    message: '请输入证件号',
                                }]
                            })(
                                <Input placeholder="请输入证件号" />
                            )}
                        </FormItem>

                        <FormItem {...formItemLayout} label="QQ">
                            {getFieldDecorator('qq', {
                                initialValue:record?record['qq']:null,
                            })(
                                <Input placeholder="请输入qq" />
                            )}
                        </FormItem>
                        <FormItem {...formItemLayout} label="所属机构">
                            {getFieldDecorator('departmentId', {
                                initialValue:record?record['departmentId']:this.state.value, //编辑的时候用
                            })(
                                <TreeSelect
                                    dropdownStyle={{ overflow: 'auto' }}
                                    allowClear
                                    treeData={this.state.treeData}
                                />
                            )}
                        </FormItem>

                        <FormItem {...formItemLayout} label="角色">
                            {getFieldDecorator('roleId', {
                                initialValue:record?record['roleId']:this.state.value,
                                rules: [{
                                    required: true,
                                    message: '请选择角色',
                                }],
                            })(
                                <Select  placeholder="请选择角色" onChange={this.onSelChange}>
                                    {children}
                                </Select>,
                            )}
                        </FormItem>

                    </Form>
                </Content>
                <FormItem >
                    {getFieldDecorator('fileId', {
                        initialValue:record?record['fileId']:null,
                    })(
                        <div style={{"flex":"1"}}><UserUpload {...data}/></div>
                    )}
                </FormItem>


            </Layout>

        )
    }
}
export default createForm()(FormSub);