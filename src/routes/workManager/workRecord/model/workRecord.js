import { queryWorkRecordList} from '../service/api';

export default {
    namespace: 'workRecord',

    state: {
      list:[],
    },

    effects: {
        *fetch({ payload }, { call, put }) {
            const response = yield call(queryWorkRecordList, payload);
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
