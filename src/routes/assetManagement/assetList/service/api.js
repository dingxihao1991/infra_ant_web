import request from 'utils/request';


export async function queryApplication(){
    return request('/api/assetList', {
        method: 'get',

    });
}

export async function update(){
    return request('/api/update', {
        method: 'get',

    });
}