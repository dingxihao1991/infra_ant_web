import { queryCostCheckList} from '../service/api';

export default {
    namespace: 'costCheck',

    state: {
      list:[],
    },

    effects: {
        *fetch({ payload }, { call, put }) {
            const response = yield call(queryCostCheckList, payload);
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
