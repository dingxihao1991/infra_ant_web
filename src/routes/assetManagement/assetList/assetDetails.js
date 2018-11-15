import React, { Component } from 'react';
import {
  Form,
  Tabs,
  Card,
  Icon,
  List,
  message,
  Avatar,
} from "antd";


/**
 * 资产详情页面
 *
 * @type {<TOwnProps>(options?: FormCreateOption<TOwnProps>) => ComponentDecorator}
 */

//定义各类变量
const createForm = Form.create;

const TabPane = Tabs.TabPane;

const { Meta } = Card;

const count = 3;


//维护变更记录
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
    title: '车站系统—上海诸光路地铁站—供电系统设备维修',
    description: '车站长李浩然于2018-9-15在诸光路地铁站完成供电设备维修【点检】',
  },{
    title: '管廊系统—合肥管廊新站段—智能照明设备临时检修',
    description: '高级工程师张向阳于2018-10-11在合肥管廊新站段完成对智能照明设备的临时检修【临检】',
  }, {
    title: '管廊系统—合肥管廊高新段—鸡鸣山路排水设备检修',
    description: '工程师李明于2018-11-25在鸡鸣山路完成排水设备检查【周检】',
  },
  {
    title: '隧道系统—上海长江隧道—B1出口处通风设备检修',
    description: '值班长汪飞龙于2017-6-9在长江隧道B1出口完成通风设备检查【月检】',
  },
  {
    title: '车站系统—上海诸光路地铁站—供电系统设备维修',
    description: '车站长李浩然于2018-9-15在诸光路地铁站完成供电设备维修【点检】',
  },{
    title: '管廊系统—合肥管廊新站段—智能照明设备临时检修',
    description: '高级工程师张向阳于2018-10-11在合肥管廊新站段完成对智能照明设备的临时检修【临检】',
  }
];


//文档数据
const listData = [];
for (let i = 0; i < 23; i++) {
  listData.push({
    href: 'http://ant.design',
    title: `关于建设管廊系统安全培训会议的通知`,
    description: '管廊系统—会议通知',
    content: '各市区管廊公司、管廊主体单位...',
});
}


class FormSub extends Component {

  state = {
    checkNick: false,
    value: undefined,
    treeData:[],
    treeData2:[],
    initLoading: true,
    loading: false,
    data: [],
    list: [],
  };


  componentDidMount() {//sp
      this.setState({
        initLoading: false,
      });
  }


  constructor(props){
    super(props);
  }

  //文档分页函数
  onChange = (value) => {
    console.log(value);
    this.setState({ value });
  }

  //编辑
  edit =()=>{
    message.error("功能开发中~~~");
  }

  render(){

    return (
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

        <List
          itemLayout="vertical"
          size="large"
          pagination={{
            onChange: (page) => {
              console.log(page);
            },
            pageSize: 3,
          }}
          dataSource={listData}
          renderItem={item => (
            <List.Item
              key={item.title}
              extra={<img width={202} alt="logo" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1542018125427&di=22c32d0f6b38e169fc52f2f1ad9be11b&imgtype=0&src=http%3A%2F%2Fimgsa.baidu.com%2Fexp%2Fpic%2Fitem%2F8367d1fc1e178a82184c0aa2f503738da977e805.jpg" />}
            >
              <List.Item.Meta
                avatar={<Avatar src={item.avatar} />}
                title={<a href={item.href}>{item.title}</a>}
                description={item.description}
              />
              {item.content}
            </List.Item>
          )}
        />
        </TabPane>
      </Tabs>

    )

  }

}

export default createForm()(FormSub);

