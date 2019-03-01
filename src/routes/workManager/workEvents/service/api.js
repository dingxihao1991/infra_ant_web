import request from 'utils/request';

export async function queryWorkEventList(params) {
  return request('/api/workEvent', {
    method: 'get',

  });
}
export async function filterList(params) {
  return request('/api/workEventFilterList', {
    method: 'POST',
    body:{
      ...params,
      method: 'post',
    }
  });
}