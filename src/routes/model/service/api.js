import request from 'utils/request';


export async function queryList(){
    return request('/api/interestPoint', {
        method: 'get',

    });
}

export async function queryList1(){
    if(params['params']){

        return request('/api/interestPoint', {
            method: 'get',

        });
    }else {
        return request('/api/documentList', {
            method: 'post',

        });

    }



}

