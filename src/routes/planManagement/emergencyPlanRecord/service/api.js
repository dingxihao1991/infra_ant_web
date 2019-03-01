import request from 'utils/request';

export async function queryList(params) {
  return request('/api/emergencyPlanRecord', {
    method: 'get',

  });
}