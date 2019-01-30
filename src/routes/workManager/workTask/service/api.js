import request from 'utils/request';

export async function queryWorkTaskList(params) {
  return request('/api/workTask', {
    method: 'get',
  });
}