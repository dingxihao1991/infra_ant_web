import React, {Component} from 'react';
import { push } from 'react-router-redux'


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
        console.log("----",values)

        //window.location.href="http://localhost:8000";
        const {type} = this.state;
        const {dispatch} = this.props;
        if (!err) {
            POST('/infraops/login',values,function(result){
                console.log("------"+result);
                if(result.success){
                    dispatch (push("/"));

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

    renderMessage = content => {
        return <Alert style={{marginBottom: 24}} message={content} type="error" showIcon/>;
    };

    render() {
        const {login, submitting} = this.props;
        const {type, autoLogin} = this.state;
        return (
            <div className={styles.main}>
                <Login defaultActiveKey={type} onSubmit={this.handleSubmit}>
                    <UserName name="loginName" placeholder="用户名"/>
                    <Password name="password" placeholder="密码"/>
                    <div>
                        <Checkbox checked={autoLogin} style={{float: 'left'}} onChange={this.changeAutoLogin}>
                            我记住
                        </Checkbox>
                        <a style={{float: 'right'}}>
                            忘记密码
                        </a>
                    </div>
                    <Submit className={styles.loginButton} loading={submitting}>登录</Submit>
                </Login>
            </div>
        );
    }
}
