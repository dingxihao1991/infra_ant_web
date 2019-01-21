import request from 'utils/request';

export async function queryCurrentUser() {

    return request('/api/currentUser', {
        method: 'GET',
    });
}

export async function addCurrentUser(params) {
    return request('/api/addcurrentUser', {
        method: 'POST',
        body:{
            ...params,
            method: 'post',
        }
    });
}

export async function queryTaskList(params) {
    return request('/api/task', {
        method: 'get',
    });
}
