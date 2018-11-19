import { queryFakeList, removeFakeList, addFakeList, updateFakeList } from 'services/api';
export default {
  namespace: 'dashboard',

  state: {
    bar1: [],
    bar2: [],
  },

  subscriptions: {
    setup({ history, dispatch }) {
      return history.listen(({ pathname }) => {
        if (pathname.indexOf('/personal/centre') !== -1) {

          dispatch({
            type: '@request',
            afterResponse: resp => resp.data,
            payload: {
              valueField: 'bar1',
              url: '/api/currentUser',
            }
          });
          dispatch({
            type: '@request',
            afterResponse: resp => resp.data,
            payload: {
              valueField: 'bar2',
              url: '/charts/bar2',
            }
          });
        }
      });
    }
  },
};