import { queryProjectList} from '../service/api';

export default {
    namespace: 'projectManager',

    state: {
      list:[],
    },

    effects: {
        *fetch({ payload }, { call, put }) {
            const response = yield call(queryProjectList, payload);
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
