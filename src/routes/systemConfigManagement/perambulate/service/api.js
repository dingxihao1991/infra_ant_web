import request from 'utils/request';

export async function queryAssetData(params) {
  return request('/api/assetData', {
    method: 'get',
  });
}

export async function queryPerambulateList(params) {
  return request('/api/perambulate', {
    method: 'get',
  });
}

export async function addPerambulate(params) {
  return request('/api/addPerambulate', {
    method: 'POST',
    body:{
      ...params,
      method: 'post',
    }
  });
}

