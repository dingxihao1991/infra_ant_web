import React, { Component } from 'react';
import { Form, Input} from 'antd';


const createForm = Form.create;

class CCTVPlay extends Component {

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

      <video   autoplay="autoplay" style={{objectFit: 'fill'}} width="100%" height="426px">
        <source src="/static/public/gl.mp4" type="video/mp4"/>
      </video>


    )
  }
}
export default createForm()(CCTVPlay);