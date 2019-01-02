import { queryWorkEventList} from 'services/api';

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
