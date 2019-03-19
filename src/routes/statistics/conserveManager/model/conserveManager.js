import { queryConserveList} from '../service/api';

export default {
    namespace: 'conserveManager',

    state: {
      list:[],
    },

    effects: {
        *fetch({ payload }, { call, put }) {
            const response = yield call(queryConserveList, payload);
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
