import React, { PureComponent } from 'react';
import { List, Icon, Tag } from 'antd';
import { connect } from 'dva';
import styles from './Task.less';
import ArticleListContent from 'components/ArticleListContent';
import logo from '../../../../logo.svg';


const list = [
    {
        id: '000000009',
        title: '任务名称',
        content: '任务需要在 2018-01-12 20:00 前启动',
        updatedAt:'2018-01-11 15:46',
        extra: '未开始',
        status: 'todo',
        owner:'管理员',
        type: '计划巡检',
        avatar:logo,
    }, {
        id: '000000010',
        title: '第三方紧急代码变更',
        content: '冠霖提交于 2018-01-06，需在 2018-01-07 前完成代码变更任务',
        updatedAt:'2018-01-11 15:46',
        extra: '马上到期',
        status: 'urgent',
        owner:'管理员',
        type: '临时任务',
        avatar:logo,
    }, {
        id: '000000011',
        title: '信息安全考试',
        content: '指派竹尔于 2018-01-09 前完成更新并发布',
        extra: '已耗时 8 天',
        updatedAt:'2018-01-11 15:46',
        status: 'doing',
        owner:'管理员',
        type: '计划巡检',
        avatar:logo,
    }, {
        id: '000000012',
        title: 'ABCD 版本发布',
        content: '冠霖提交于 2018-01-06，需在 2018-01-07 前完成代码变更任务',
        extra: '进行中',
        updatedAt:'2018-01-11 15:46',
        status: 'processing',
        owner:'管理员',
        type: '临时任务',
        avatar:logo,
    }];
class Task extends PureComponent {

    getRenderItem = item =>{
        const color = {
            todo: '',
            processing: 'blue',
            urgent: 'red',
            doing: 'gold',
        }[item.status];
        return  (
            <List.Item
                key={item.id}

            >
                <List.Item.Meta
                    title={
                        <a className={styles.listItemMetaTitle} href={item.href}>
                            {item.title}
                        </a>
                    }
                    description={
                        <span>
                  <Icon type="arrow-left" />
                  <Tag>{item.type}</Tag>
                  <Tag color={color}>{item.extra}</Tag>
                </span>

                    }
                />
                <ArticleListContent data={item} />
            </List.Item>
        )
    }
    render() {
        // const {
        //   list: { list },
        // } = this.props;
        const IconText = ({ type, text }) => (
            <span>
        <Icon type={type} style={{ marginRight: 8 }} />
                {text}
      </span>
        );
        return (
            <List
                size="large"
                className={styles.articleList}
                rowKey="id"
                itemLayout="vertical"
                dataSource={list}
                renderItem={this.getRenderItem}
            />
        );
    }
}

export default Task;
