import { queryList} from '../service/api';

export default {
  namespace: 'emergencyPlanRecord',

  state: {
    list:[],
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryList, payload);
      yield put({
        type: 'queryList',
        payload: response,
      });
    }
  },

  reducers: {
    queryList(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
  },
};
