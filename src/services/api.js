import { stringify } from 'qs';
import request from '../utils/request';
import { getToken } from '../utils/authority';
import {ModalForm}  from 'components/Modal';
const confirm = ModalForm.Modal.confirm;

export async function addCurrentUser(params) {
    return request('/api/addcurrentUser', {
        method: 'POST',
        body:{
            ...params,
            method: 'post',
        }
    });
}
export async function queryModelFileList(params) {
    return request('/api/model/fileList', {
        method: 'get',
    });
}




export async function querySearch (params) {
    return request('/api/querySearch', {
        method: 'POST',
        body:{
            ...params,
            method: 'post',
        }
    });
}

export async function fakeAccountLogin(params,callBack,errorFuc) {

  return request('/infraops/login', {
    method: 'POST',
    body: params,
  });
}

export async function GET(url,callBack,errorFuc) {
    return ajax(url,'GET',null,callBack,errorFuc);
}

export async function POST(url,params,callBack,errorFuc) {
    return ajax(url,'POST',params,callBack,errorFuc);
}

export async function PUT(url,params,callBack,errorFuc) {
    return ajax(url,'PUT',params,callBack,errorFuc);
}

export async function DELETE(url,params,callBack,errorFuc) {
    return ajax(url,'DELETE',params,callBack,errorFuc);
}

/**
 *
 * @param url 请求地址
 * @param method 请求方式
 * @param params 请求参数
 * @param callBack 请求回调
 * @param errorFuc 异常回调
 */
const ajax = function(url,method,params,callBack,errorFuc){
    let option = {
            method:method,
            //mode:'cors',// 避免cors攻击
            //credentials: 'include'
            headers:{
                'Content-Type':'application/json;charset=utf-8',
                'token':getToken()
            },
            body:params?JSON.stringify(params):null
        };
    if(method!='GET'){
        option.body = params?JSON.stringify(params):null

    }

    fetch('http://192.168.200.29:8888'+url,option).then(function(response) {
        try{
            response.json().then(function(result){
                if(result.code==-2){
                    debugger
                    vif()
                }else{
                    callBack(result,response)
                }

            });
        }catch (e){
            console.log("返回参数格式化出错",e)
        }

    }).catch(errorFuc);
}

const vif = function(){
    confirm({
        title: '提示信息',
        content: '该帐号已经在其他地方登陆,是否重新登录',
        okText: '是',
        okType: 'danger',
        cancelText: '否',
        onOk() {
            window.location.href="http://192.168.200.29:8888/#/user/login";
        },
        onCancel() {

        },

    })
}