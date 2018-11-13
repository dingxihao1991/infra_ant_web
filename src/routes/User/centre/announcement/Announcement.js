import React ,{PureComponent} from 'react';
import {List,Card,Layout } from 'antd';
const { Header, Footer, Sider, Content } = Layout;
import stylesProjects from './Announcement.less';
import ArticleListContent from 'components/ArticleListContent';
import AvatarList from 'components/AvatarList';
import moment from 'moment';

const data = [
    {
        title: '系统公告',
        updatedAt:'2018-10-25 10:21:30',
        subDescription:'冠霖提交于 2018-01-06，需在 2018-01-07 前完成代码变更任务,冠霖提交于 2018-01-06，需在 2018-01-07 前完成代码变更任务',
        cover:'https://gw.alipayobjects.com/zos/rmsportal/uMfMFlvUuceEyPpotzlq.png',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ZiESqWwCXBRQoaPONSJe.png',
        owner:'系统管理员',
        members: [
            {
                avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ZiESqWwCXBRQoaPONSJe.png',
                name: '曲丽丽',
                id: 'member1',
            },
            {
                avatar: 'https://gw.alipayobjects.com/zos/rmsportal/tBOxZPlITHqwlGjsJWaF.png',
                name: '王昭君',
                id: 'member2',
            },
        ],
    },
    {
        title: '部门公告',
        updatedAt:'2018-09-11 15:46:30',
        subDescription:'指派竹尔于 2018-01-09 前完成更新并发布',
        cover:'https://gw.alipayobjects.com/zos/rmsportal/gLaIAoVWTtLbBWZNYEMg.png',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/iXjVmWVHbCJAyqvDxdtx.png',
        owner:'系统管理员',
        members: [
            {
                avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ZiESqWwCXBRQoaPONSJe.png',
                name: '曲丽丽',
                id: 'member1',
            },
            {
                avatar: 'https://gw.alipayobjects.com/zos/rmsportal/tBOxZPlITHqwlGjsJWaF.png',
                name: '王昭君',
                id: 'member2',
            },
            {
                avatar: 'https://gw.alipayobjects.com/zos/rmsportal/sBxjgqiuHMGRkIjqlQCd.png',
                name: '董娜娜',
                id: 'member3',
            },
        ],
    },
    {
        title: '系统公告',
        updatedAt:'2018-11-13 15:46:30',
        subDescription:'冠霖提交于 2018-01-06，需在 2018-01-07 前完成代码变更任务',
        cover:'https://gw.alipayobjects.com/zos/rmsportal/iZBVOIhGJiAnhplqjvZW.png',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/sBxjgqiuHMGRkIjqlQCd.png',
        owner:'系统管理员',
        members: [
            {
                avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ZiESqWwCXBRQoaPONSJe.png',
                name: '曲丽丽',
                id: 'member1',
            },
            {
                avatar: 'https://gw.alipayobjects.com/zos/rmsportal/tBOxZPlITHqwlGjsJWaF.png',
                name: '王昭君',
                id: 'member2',
            },
            {
                avatar: 'https://gw.alipayobjects.com/zos/rmsportal/sBxjgqiuHMGRkIjqlQCd.png',
                name: '董娜娜',
                id: 'member3',
            },
        ],
    },
    {
        title: '系统公告',
        updatedAt:'2018-01-11 15:46:30',
        subDescription:'冠霖提交于 2018-01-06，需在 2018-01-07 前完成代码变更任务',
        cover:'https://gw.alipayobjects.com/zos/rmsportal/uMfMFlvUuceEyPpotzlq.png',
        owner:'系统管理员',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/sBxjgqiuHMGRkIjqlQCd.png',
        members: [
            {
                avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ZiESqWwCXBRQoaPONSJe.png',
                name: '曲丽丽',
                id: 'member1',
            },
            {
                avatar: 'https://gw.alipayobjects.com/zos/rmsportal/tBOxZPlITHqwlGjsJWaF.png',
                name: '王昭君',
                id: 'member2',
            },
            {
                avatar: 'https://gw.alipayobjects.com/zos/rmsportal/sBxjgqiuHMGRkIjqlQCd.png',
                name: '董娜娜',
                id: 'member3',
            },
        ],
    },

    {
        title: '系统公告',
        updatedAt:'2018-01-11 15:46:30',
        subDescription:'冠霖提交于 2018-01-06，需在 2018-01-07 前完成代码变更任务',
        cover:'https://gw.alipayobjects.com/zos/rmsportal/iXjVmWVHbCJAyqvDxdtx.png',
        owner:'系统管理员',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/sBxjgqiuHMGRkIjqlQCd.png',
        members: [
            {
                avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ZiESqWwCXBRQoaPONSJe.png',
                name: '曲丽丽',
                id: 'member1',
            },
            {
                avatar: 'https://gw.alipayobjects.com/zos/rmsportal/tBOxZPlITHqwlGjsJWaF.png',
                name: '王昭君',
                id: 'member2',
            },
            {
                avatar: 'https://gw.alipayobjects.com/zos/rmsportal/sBxjgqiuHMGRkIjqlQCd.png',
                name: '董娜娜',
                id: 'member3',
            },
        ],
    },
    {
        title: '系统公告',
        updatedAt:'2018-01-11 15:46:30',
        subDescription:'冠霖提交于 2018-01-06，需在 2018-01-07 前完成代码变更任务',
        cover:'https://gw.alipayobjects.com/zos/rmsportal/uMfMFlvUuceEyPpotzlq.png',
        owner:'系统管理员',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/sBxjgqiuHMGRkIjqlQCd.png',
        members: [
            {
                avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ZiESqWwCXBRQoaPONSJe.png',
                name: '曲丽丽',
                id: 'member1',
            },
            {
                avatar: 'https://gw.alipayobjects.com/zos/rmsportal/tBOxZPlITHqwlGjsJWaF.png',
                name: '王昭君',
                id: 'member2',
            },
            {
                avatar: 'https://gw.alipayobjects.com/zos/rmsportal/sBxjgqiuHMGRkIjqlQCd.png',
                name: '董娜娜',
                id: 'member3',
            },
            {
                avatar: 'https://gw.alipayobjects.com/zos/rmsportal/tBOxZPlITHqwlGjsJWaF.png',
                name: '王昭君',
                id: 'member4',
            },
            {
                avatar: 'https://gw.alipayobjects.com/zos/rmsportal/sBxjgqiuHMGRkIjqlQCd.png',
                name: '董娜娜',
                id: 'member5',
            },
        ],
    },
];
class Announcement extends PureComponent{

    renderItem=item=>{
       return(
           <List.Item>
               <Card
                   className={stylesProjects.card}
                   hoverable
               >
                   <Layout>
                       <Sider>
                           <img alt={item.title} src={item.cover} width="100%" height={150}/>
                       </Sider>
                       <Content style={{background: '#fff', padding: '10px'}}>
                           {/*<Header>Header</Header>
                           <Content>Content</Content>
                           <Footer>Footer</Footer>*/}
                           <Card.Meta title={<a>{item.title}</a>} description={item.subDescription} style={{}} />
                      {/*     <ArticleListContent data={item} />*/}
                           <div style={{marginTop: '40px'}}>
                               <div className={stylesProjects.avatarList} style={{float: 'right',}}>
                                   <span >{moment(item.updatedAt).fromNow()}</span>
                                   <AvatarList size="mini">
                                       {item.members.map(member => (
                                           <AvatarList.Item
                                               key={`${item.id}-avatar-${member.id}`}
                                               src={member.avatar}
                                               tips={member.name}
                                           />
                                       ))}
                                   </AvatarList>
                               </div>
                           </div>
                       </Content>
                   </Layout>
               </Card>
           </List.Item>
           )
    }

    render(){

        return(
            <List
                className={stylesProjects.coverCardList}
                rowKey="id"
                grid={{ gutter: 24, xxl: 2, xl: 2, lg: 2, md: 2, sm: 2, xs: 1 }}
                dataSource={data}
                renderItem={this.renderItem}
            >

            </List>
        )
    }
}

export default Announcement;