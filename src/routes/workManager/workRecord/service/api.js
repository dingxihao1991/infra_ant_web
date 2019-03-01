import request from 'utils/request';

export async function queryWorkRecordList(params) {
  return request('/api/workRecord', {
    method: 'get',
  });
}

export async function filterList(params) {
  return request('/api/filterList', {
    method: 'POST',
    body:{
      ...params,
      method: 'post',
    }
  });
}