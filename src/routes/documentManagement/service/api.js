import request from 'utils/request';


export async function queryFolderList(){
    return request('/api/folderList', {
        method: 'get',

    });
}

export async function queryDocumentList(params){
    if(params['params']){
        console.log(params)
        return request('/api/documentList', {
            method: 'post',
            body:{
                ...params,
                method: 'post',
            }
        });
    }else {
        return request('/api/documentList', {
            method: 'post',

        });

    }



}

