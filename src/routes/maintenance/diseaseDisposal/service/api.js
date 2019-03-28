import request from 'utils/request';

export async function queryProjectList(params) {
  return request('/api/diseaseDisposalList', {
    method: 'get',
  });
}