import React, { Component } from 'react';
import {
  Form,
  Button,
  Input,
  Select,
  TreeSelect,
  InputNumberM,
  Tabs,
  Card,
  Col,
  Row,
  Icon,
  Avatar,
  List,
  Layout, message
} from "antd";
//import { POST,GET,PUT,DELETE } from '../../../services/api';
import styles from './test.less';
import FormSub2 from './Form';//资产设备单个定位页面

const Option = Select.Option;
const FormItem = Form.Item;
const {TextArea } =Input;
const createForm = Form.create;
const TreeNode = TreeSelect.TreeNode;

const TabPane = Tabs.TabPane;

const { Meta } = Card;


const pStyle = {
  fontSize: 16,
  color: 'rgba(0,0,0,0.85)',
  lineHeight: '24px',
  display: 'block',
  marginBottom: 16,
};

const topColResponsiveProps = {
  xs: 24,
  sm: 12,
  md: 12,
  lg: 12,
  xl: 16,
  style: { marginBottom: 24 },
};


//数据2
const data2 = [
  {
    title: '管廊系统—合肥管廊高新段—鸡鸣山路排水设备检修',
    description: '工程师李明于2018-11-25在鸡鸣山路完成排水设备检查【周检】',
  },
  {
    title: '隧道系统—上海长江隧道—B1出口处通风设备检修',
    description: '值班长汪飞龙于2017-6-9在长江隧道B1出口完成通风设备检查【月检】',
  },
  {
    title: '车站系统—上海诸光路地铁站—',   //TODO
    description: '隧道系统—超级管理员—增加新设备AB-156',
  },{
    title: '管廊系统—合肥管廊新站段—智能照明设备临时检修',
    description: '高级工程师张向阳于2018-10-11在合肥管廊新站段完成对智能照明设备的临时检修【临检】',
  },
  {
    title: '操作日志',
    description: '车站系统—耀华路—操作员—扫描上报BL-197设备异常并上报',
  },
];


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

  //编辑
  edit =()=>{
   /* const {rows} = this.state
    console.log(rows)*/
  /*  if(rows.length>1){
      Modal.warning({
        title: '警告信息',
        content: '请选中一行数据',
      });
      return;
    }*/
    message.error("功能开发中~~~");
  /*  let  form = FormSub2
    this.setState({
      //record:rows[0],
      visible: true,
      form:form
    });*/
  }

  render(){
    const { getFieldDecorator } = this.props.form;
    const {record} =this.props;

    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 17 }
    }
    return (
//onChange={callback}
      <Tabs defaultActiveKey="1">
        <TabPane tab="基本信息" key="1" styles>


          <Card
            style={{ width: 700 }}
            cover={<img alt="example" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1541936160681&di=b092d107b2716097789543410892712c&imgtype=0&src=http%3A%2F%2Fsup.img.51sole.com%2Fimages1%2F200912281615140.jpg" />}
          >
            <Meta
              avatar={<Avatar src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1541935904231&di=78ad5676d6a4a495bfe79c99e0acb961&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2Fb219ebc4b74543a9a5ca03ea15178a82b80114c6.jpg" />}
              title="智能照明操作设备"
              description="上海市青浦区—诸光路地铁站—照明系统—操作设备"
            />
          </Card>

          <Card
                title="资产设备信息"
                extra={<a onClick={this.edit}>定位设备当前位置</a>}
                style={{ width: 700 }}
          >

            <p><Icon type="double-right"/> 资产设备编号 :            'NV-TB9716'</p>
            <p><Icon type="double-right"/> 资产设备名称 :           '智能照明设备'</p>
            <p><Icon type="double-right"/> 资产设备类型 :         '照明系统'</p>
            <p><Icon type="double-right"/> 资产设备位置 :         '上海市青浦区诸光路(地铁站)'</p>
            <p><Icon type="double-right"/> 资产设备状态 :         '正常'</p>
          </Card>
        </TabPane>
        <TabPane tab="维护变更记录" key="2">

          <List
                itemLayout="horizontal"
                dataSource={data2}
                renderItem={item => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={<Avatar src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=334939587,2995828434&fm=26&gp=0.jpg" />}
                      title={<a href="https://ant.design">{item.title}</a>}
                      description={item.description}
                    />
                  </List.Item>
                )}
          />

        </TabPane>

      <TabPane tab="相关文档" key="3">

        <List className="col-md-4"
              itemLayout="horizontal"
              dataSource={data2}
              renderItem={item => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=334939587,2995828434&fm=26&gp=0.jpg" />}
                    title={<a href="https://ant.design">{item.title}</a>}
                    description={item.description}
                  />
                </List.Item>
              )}
        />

        </TabPane>
      </Tabs>

      /*<Form ref='form'>

        {/!* {
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
              }*!/}

        <FormItem {...formItemLayout} label="资产设备编号">
          {getFieldDecorator('applicationId', {
            initialValue:record?record['applicationId']:this.state.value,
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
            initialValue:record?record['orgName']:null,
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
            initialValue:record?record['parentId']:this.state.value,
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
            initialValue:record?record['orgType']:null,
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
            initialValue:record?record['orgType']:null,
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
            initialValue:record?record['orgRemark']:null,
          })(
            <TextArea  rows={4} />
          )}
        </FormItem>
      </Form>*/
    )

  }


}

export default createForm()(FormSub);