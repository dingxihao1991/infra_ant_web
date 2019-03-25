import request from 'utils/request';

export async function queryCostCheckList(params) {
  return request('/api/costCheckList', {
    method: 'get',
  });
}