/**
 * @Description: 用户操作类
 * @Author:  yulin.zhang
 * @CreateDate: 2018/11/11 10:30
 */
import React, {Component,PureComponent} from 'react';
import { Card, Row, Col, Icon, Avatar, Tag, Divider, Spin, Input } from 'antd';
import styles from './PersonalCentre.less';
import PropTypes from 'prop-types';
import { push } from 'react-router-redux'
import { connect } from 'dva';
import Task from './task/Task';
import WorkingCalendar from './calendar/WorkingCalendar';
import Announcement from './announcement/Announcement';
import moment from 'moment';

import FormSub from './MemoForm';
import {ModalForm}  from 'components/Modal';

const currentUser1 = {
    name: '超级管理员',
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
    userid: '00000001',
    email: 'antdesign@alipay.com',
    signature: '综合运维系统',
    group: '某某平台部－某某技术部－UED',
    notifyCount: 12,
    country: 'China',
    geographic: {
        province: {
            label: '浙江省',
            key: '330000',
        },
        city: {
            label: '杭州市',
            key: '330100',
        },
    },
    address: '西湖区工专路 77 号',
    phone: '0752-268888888',
    tags: [
        {
            key: '0',
            label: '10点汇报工作',
        },
        {
            key: '1',
            label: '18点参加部门会议',
        }

    ],
}

const tabsList ={
    'task':<Task/>,
    'calendar':<WorkingCalendar/>,
    'announcement':<Announcement/>,
}
let i=4;

 @connect(({loading, personalCentre}) => ({
     tags:personalCentre.tags,
     currentUser:personalCentre.currentUser,
 }))
export default class PersonalCentre extends  PureComponent {

    static contextTypes = {
        location: PropTypes.object,
        breadcrumbNameMap: PropTypes.object,
        userInfo:PropTypes.object,
        openModal: PropTypes.func,
    };

    constructor(props){
        super(props);
        this.state = {
            newTags: [],
            contents:null,
            inputVisible: false,
            inputValue: '',
            visible:false,
            key:props.location.state?props.location.state.key:'task'
        };

    }

    componentDidMount(){
        const {dispatch } = this.props;
        dispatch({
            type: 'personalCentre/fetch',
            payload: {
            },
        });
        dispatch({
            type: 'taskList/fetch',
            payload: {
            },
        });
    }

    componentWillReceiveProps(newProps){
        const {currentUser} = newProps;
        if(newProps.location.state){
            this.setState({key:newProps.location.state.key})
        }
    }

    onTabChange = key => {
        const { match ,dispatch} = this.props;
        switch (key) {
            case 'task':
                this.setState({key:'task'});
                break;
            case 'calendar':
                this.setState({key:'calendar'});
                break;
            case 'announcement':
                this.setState({key:'announcement'});
                break;
            default:
                break;
        }
    };

    addMemo = () =>{
        const modalFormProps = {
            title:'添加备忘录',
            record:null,
            isShow:true,
            Contents:FormSub,
            modalOpts: {
                width: 700,
            },
            onSubmit: (values) => this.onSubmit(values)
        }
        this.context.openModal(modalFormProps);
        this.setState({contents:FormSub});
        this.setState({visible:true});
    }

    onSubmit =(values)=>{
        console.log(",,,",values,'=======',moment(values.date).format('YYYY-MM-DD'))


        const {dispatch } = this.props;
        dispatch({
            type: 'personalCentre/add',
            payload: {
                tags:{
                    key:i++,
                    date:moment(values.date).format('YYYY-MM-DD'),
                    label: values.describe,
                }
            },
        });
    }

    render(){
        const { newTags, inputVisible, inputValue ,key} = this.state;

        const {currentUser,tags} = this.props;
        const operationTabList = [
            {
                key: 'task',
                tab: (
                    <span>
                        任务 <span style={{ fontSize: 14 }}>(4)</span>
                      </span>
                ),
            },
            {
                key: 'calendar',
                tab: (
                    <span>
                        日历 <span style={{ fontSize: 14 }}>(8)</span>
                      </span>
                ),
            },
            {
                key: 'announcement',
                tab: (
                    <span>
                        公告 <span style={{ fontSize: 14 }}>(8)</span>
                      </span>
                ),
            },
        ];

        return(
            <div>
                <Row gutter={24}>
                    <Col lg={7} md={24}>
                        <Card bordered={false} style={{ marginBottom: 24 }} >
                            {currentUser && Object.keys(currentUser).length ? (
                                    <div>
                                        <div className={styles.avatarHolder}>
                                            <img alt="" src={currentUser.avatar} />
                                            <div className={styles.name}>{currentUser.name}</div>
                                            <div>{currentUser.signature}</div>
                                        </div>
                                        <div className={styles.detail}>
                                            <p>
                                                <i className={styles.title} />
                                                {currentUser.title}
                                            </p>
                                            <p>
                                                <i className={styles.group} />
                                                {currentUser.group}
                                            </p>
                                            <p>
                                                <i className={styles.address} />
                                                {currentUser.geographic.province.label}
                                                {currentUser.geographic.city.label}
                                            </p>
                                        </div>
                                        <Divider dashed />
                                        <div className={styles.tags}>
                                            <div className={styles.tagsTitle}>备忘录</div>
                                            {tags.concat(newTags).map(item => {

                                                return (<Tag key={item.key}>{item.label}</Tag>)
                                            }
                                            )}
                                            {inputVisible && (
                                                <Input
                                                    ref={this.saveInputRef}
                                                    type="text"
                                                    size="small"
                                                    style={{ width: 78 }}
                                                    value={inputValue}

                                                />
                                            )}
                                            {!inputVisible && (
                                                <Tag
                                                    onClick={this.addMemo}
                                                    style={{ background: '#fff', borderStyle: 'dashed' }}
                                                >
                                                    <Icon type="plus" />
                                                </Tag>
                                            )}
                                        </div>
                                        <Divider style={{ marginTop: 16 }} dashed />
                                        <div className={styles.team}>
                                            <div className={styles.teamTitle}>天气</div>

                                        </div>
                                    </div>
                                ) : (
                                    'loading...'
                                )}
                        </Card>
                    </Col>
                    <Col lg={17} md={24}>
                        <Card
                            className={styles.tabsCard}
                            bordered={false}
                            tabList={operationTabList}
                            activeTabKey={key}
                            onTabChange={this.onTabChange}
                        >
                            {tabsList[key]}
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}