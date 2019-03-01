import { queryWorkEventList , filterList} from '../service/api';

export default {
    namespace: 'workEvent',

    state: {
      list:[],
    },

    effects: {
        *fetch({ payload }, { call, put }) {
            const response = yield call(queryWorkEventList, payload);
            yield put({
                type: 'queryList',
                payload: response,
            });
        },
      *filter({ payload }, { call, put }) {
        const response = yield call(filterList, payload);
        yield put({
          type: 'filterList',
          payload: response? response : {},
        });
      },
    },

    reducers: {
        queryList(state, action) {
            return {
                ...state,
              list: action.payload,
            };
        },
      filterList(state, action) {
        return {
          ...state,
          tags: action.payload.tags,
          list:action.payload,
        };
      },
    },
};
