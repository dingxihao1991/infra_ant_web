import React, { Component } from 'react';
import { Form, Button, Input, Select ,Layout ,TreeSelect,Upload,Icon,message } from 'antd';
import FileUpload from './FileUpload';

import styles from '../style/uploadFile.less';

const Dragger = Upload.Dragger;




const FormItem = Form.Item;

const createForm = Form.create;


class FormSub extends Component {
    constructor(props){
        super(props)

    }

    state = {

        fileId: null,


    };


    normFile = (e) => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    }

    onChange = (info) =>{
        const status = info.file.status;
        if (status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (status === 'done') {
            console.log(info.file.name);
            message.success(`${info.file.name} file uploaded successfully.`);

        } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    }

    render(){

        const props = {
            name: 'file',
            multiple: true,
            action: '//jsonplaceholder.typicode.com/posts/',
            onChange:this.onChange
        };

        const { getFieldDecorator } = this.props.form;


        const formItemLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 17 }
        }

        return (

                    <Form ref='form' className={styles.uplod}>
                        <Form.Item
                            {...formItemLayout}
                        >
                            <div className="dropbox">
                                {getFieldDecorator('fileList', {
                                    valuePropName: 'fileList',
                                    getValueFromEvent: this.normFile,
                                })(
                                    <Upload.Dragger name="files" {...props}>
                                        <p className="ant-upload-drag-icon">
                                            <Icon type="inbox" />
                                        </p>
                                        <p className="ant-upload-text">单击或拖动文件到此区域以上传</p>
                                        <p className="ant-upload-hint">支持单一或批量上传</p>
                                    </Upload.Dragger>
                                )}
                            </div>
                        </Form.Item>


                    </Form>


        )
    }
}
export default createForm()(FormSub);

// const ant_col_17 ={
//     .ant-col-17{
//     width:'100%'
//     }
//
// }