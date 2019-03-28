import request from 'utils/request';

export async function queryConserveList(params) {
  return request('/api/conserveManagerList', {
    method: 'get',
  });
}