import request from '../../../../utils/request';


export async function queryApplication(){
    return request('/application/findAll', {
        method: 'get',

    });
}