import request from 'utils/request';

export async function queryWorkEventList(params) {
  return request('/api/workEvent', {
    method: 'get',

  });
}