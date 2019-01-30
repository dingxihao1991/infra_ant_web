import request from 'utils/request';

export async function queryJobPlanList(params) {
  return request('/api/jobPlan', {
    method: 'get',
  });
}