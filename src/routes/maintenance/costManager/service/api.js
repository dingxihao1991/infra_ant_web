import request from 'utils/request';

export async function queryCostList(params) {
  return request('/api/constManagerList', {
    method: 'get',
  });
}