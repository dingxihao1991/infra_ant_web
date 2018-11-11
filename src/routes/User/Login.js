import React, {Component} from 'react';
import { push } from 'react-router-redux'
import { setAuthority,setToken} from '../../utils/authority';

import {connect} from 'dva';
import {Link} from 'dva/router';
import {Checkbox, Alert, Icon,message} from 'antd';
import Login from '../../components/Login';
import styles from './Login.less';
import { POST,GET,PUT,DELETE } from '../../services/api';
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


    handleSubmit = (err, values) => {

        const {type} = this.state;
        const {dispatch} = this.props;
        if (!err) {
            POST('/infraops/login',values,function(data,response){
                if(data.success){
                    console.log(data);
                    setAuthority(data.result.tokenObjDTO);
                    dispatch (push("/"));
                    setToken(response.headers.get('token'))
                    //window.location.href="http://localhost:8000";
                }else{
                    message.error("用户名或密码错误")
                }
            },function(error){
                console.log(error)
            })
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
