import React, {Component} from 'react';
import {connect} from 'dva';
import {Link} from 'dva/router';
import {Checkbox, Alert, Icon} from 'antd';
import Login from '../../components/Login';
import styles from './Login.less';

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
            dispatch({
                type: 'login/login',
                payload: {
                    ...values,
                    type,
                },
            });
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
                    <UserName name="userName" placeholder="用户名"/>
                    <Password name="password" placeholder="密码"/>
                    <div>
                        <Checkbox checked={autoLogin} style={{float: 'left'}} onChange={this.changeAutoLogin}>
                            自动登录
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
