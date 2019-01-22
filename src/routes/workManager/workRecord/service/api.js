import request from 'utils/request';

export async function queryWorkRecordList(params) {
  return request('/api/workRecord', {
    method: 'get',
  });
}