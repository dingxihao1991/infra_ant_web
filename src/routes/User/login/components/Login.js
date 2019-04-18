import React, {Component} from 'react';
import { push } from 'react-router-redux'
import { setAuthority,setToken} from '../../../../utils/authority';

import {connect} from 'dva';
import {Link} from 'dva/router';
import {Checkbox, Alert, Icon,message} from 'antd';
import Login from 'components/Login';
import styles from '../style/Login.less';
import { POST,GET,PUT,DELETE } from '../../../../services/api';
const {Tab, UserName, Password, Mobile, Captcha, Submit} = Login;

@connect(({login, loading}) => ({
    login,
    submitting: loading.effects['login/login'],
}))
export default class LoginPage extends Component {
    state = {
        type: 'account',
        autoLogin: true,
    };

    componentDidMount(){
        const {login} = this.props;
        console.log("--login------",login)
    }


    handleSubmit = (err, values) => {

        const {type} = this.state;
        const {dispatch} = this.props;
        if (!err) {
            //模拟已经登陆了
            let data = {"code":0,"message":"登陆成功","result":{"tokenObjDTO":{"authCode":["application:add","organization:delete","application:update","user:delete","role:delete","organization:add","user:add","role:update","document:upload","organization:update","menu:delete","application:delete","menu:update","role:add","menu:add","user:update"],"departmentId":"0","departmentName":"综合运维系统","departmentPid":"-9999","expTime":"2019-04-23 15:36:45","imgUrl":"/user/psb.jpg","loginName":"zhangyl","loginTime":"2019-04-16 15:36:45","menus":[{"icon":"home","key":"9476d82186064fc6b5ac22e3d22e6d4a","name":"首页","path":"/index"},{"icon":"book","key":"dbccfe3daa874e0092e5c647a4a8b83d","name":"结构安全","path":"/model/index"},{"children":[{"icon":"1","key":"7b876ff140394fab9bc86f9bef859bf5","name":"机构管理","path":"/auth/organizationManage"},{"icon":"","key":"b7c772895095456da7f22c5dc1d5e014","name":"应用管理","path":"/auth/application"},{"icon":"","key":"64a29408f4a64ce79c9f654228727c1c","name":"角色管理","path":"/auth/roleManage"},{"icon":"","key":"8f53bda12ed94038903c2a1ecd3f810a","name":"菜单管理","path":"/auth/MenuManage"},{"icon":"","key":"160b4fce70cc4956b8c2f5a42684fc4e","name":"操作审计","path":"/auth/systemOperationLogs"},{"icon":"","key":"48f868f97f0e43aebfcb8f9fa7a7f080","name":"用户管理","path":"/auth/userManage"}],"icon":"setting","key":"a90d1e90e98148438fdec5a04029bcf6","name":"权限中心","path":"/auth"},{"icon":"user","key":"3de8f605b0904cb0843d680318608a38","name":"个人中心","path":"/personal/centre"},{"children":[{"icon":"","key":"d3cd69aab44b425e8604efd84a828a29","name":"资产概览","path":"/assetManagement/assetOverview"},{"icon":"","key":"dbad076be52845a49a34290b184c5df1","name":"资产列表","path":"/assetManagement/assetList"},{"icon":"","key":"292228e9fb8249acb9e7b2cfd4a0c3e6","name":"维保记录","path":"/assetManagement/assetRecord"},{"icon":"","key":"026cfb126c854749b402cc61af5c800f","name":"备品备件管理","path":"/assetManagement/bomManagement"}],"icon":"dashboard","key":"a27814c50db24f8b9fbe7c710bb6011d","name":"设备管理","path":"facility"},{"children":[{"icon":"","key":"f4d4f499084441899657f72ddb7fe6e0","name":"工作计划","path":"/job/plan"},{"icon":"","key":"684123c6c3c74b638745c4423d4db14a","name":"待办任务","path":"/job/willdo"},{"icon":"","key":"07213e582cc64c039001bde2ec9b7f92","name":"工作记录","path":"/job/record"}],"icon":"profile","key":"5b36e30aa9644a9ca6c95457a76cc4c7","name":"日常巡检管理","path":"2"},{"children":[{"icon":"","key":"e083aa40ec534836a3d31ed83e42fed8","name":"监控列表","path":"/operationMonitoring/monitoringList"}],"icon":"loading","key":"1487c4ac40ac4faf8122ab074b32fb7d","name":"巡查监控","path":"1"},{"children":[{"icon":"","key":"11a99ec4fec24f4d868360873edc95d1","name":"预案管理","path":"/planManagement/emergencyPlanRecord"},{"icon":"","key":"350a195160be4dae91341d0b5869c150","name":"预警记录","path":"/job/event"}],"icon":"bars","key":"f60621a71acf4413b75282297308da7b","name":"预警预案","path":"3"},{"children":[{"icon":"","key":"b0765a8aaab0445a8c11634376766672","name":"运维养护管理","path":"/statistics/conserveManager"},{"icon":"","key":"81c7dc50f38f4714b8d96dfdbb478402","name":"统计分析","path":"/statistics/finance"}],"icon":"form","key":"1357415d6ccc4608b6ddc48c0c7a14f7","name":"统计与评估","path":"4"},{"children":[{"icon":"","key":"defead54fecf42c0a9b1d8cc63effd07","name":"费用管理","path":"/maintenance/costManager"},{"icon":"","key":"0e7b79ab7b71451596c01b68462640f9","name":"病害处置","path":"/maintenance/diseaseDisposal"},{"icon":"","key":"78cd86eeed14491f8f669cae77597638","name":"工程管理","path":"/maintenance/projectManager"},{"icon":"","key":"659cf804144446a0b96c95727267bb5c","name":"费用核算","path":"/maintenance/costCheck"}],"icon":"tool","key":"fadb121a7e6244cba36962d54dba9cf4","name":"维保管理","path":"6"},{"icon":"file","key":"9d96e82ec5d44da0bb6fda3d44cf7c8b","name":"文档管理","path":"/dataManagement/docManagement"},{"children":[{"icon":"","key":"f95c5b940d4e4b6f8f414111a1247f67","name":"巡检配置","path":"/system/perambulate"}],"icon":"setting","key":"c0a0a6c3ba094dbfb850aa5b662adc1b","name":"系统配置","path":"5"}],"userId":"4fe3be90fb92426e95d42734869de580","userName":"zhangyl"}},"success":true}
            setAuthority(data.result.tokenObjDTO);
            setToken("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");
            dispatch (push("/"));
            /*POST('/infraops/login',values,function(data,response){
                if(data.success){
                    console.log(data);
                    setAuthority(data.result.tokenObjDTO);
                    setToken(response.headers.get('token'));
                    dispatch (push("/"));
                    //window.location.href="http://localhost:8000";
                }else{
                    message.error("用户名或密码错误")
                }
            },function(error){
                console.log(error)
            })*/
            // dispatch({
            //     type: 'login/login',
            //     payload: {
            //         ...values,
            //         type,
            //     },
            // });
        }
    };

    changeAutoLogin = e => {
        this.setState({
            autoLogin: e.target.checked,
        });
    };

    render() {
        const {login, submitting} = this.props;
        const {type,autoLogin} = this.state;
        return (
            <div className={styles.main}>
                <Login onSubmit={this.handleSubmit}>
                    <UserName name="loginName" placeholder="用户名"/>
                    <Password name="password" placeholder="密码"/>
                    <div style={{marginTop:'25px'}}>
                        <Checkbox checked={autoLogin} style={{float: 'left'}} onChange={this.changeAutoLogin}>
                            <span style={{color:'#2a9ae9'}}>记住密码</span>
                        </Checkbox>
                        <a style={{float: 'right'}}>
                            <Icon type="question-circle" />忘记密码
                        </a>
                    </div>
                    <Submit className={styles.loginButton} loading={submitting}><span style={{fontSize:'19'}}>登录</span></Submit>
                    {/*<a style={{coloe:'#2a9ae9'}}><Icon type="question-circle" />无法登录账户</a>*/}
                </Login>
            </div>
        );
    }
}
