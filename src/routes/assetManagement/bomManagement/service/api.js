import request from 'utils/request';


export async function queryApplication(){
    return request('/api/takeRecord', {
        method: 'get',

    });
}

export async function add(params) {
    return request('/api/takeRecord/add', {
        method: 'POST',
        body:{
            ...params,
            method: 'post',
        }
    });
}