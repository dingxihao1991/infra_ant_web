import { querySearch} from 'services/api';

export default {
    namespace: 'search',

    state: {
        list:[]
    },

    effects: {
        *query({ payload }, { call, put }) {
            const response = yield call(querySearch, payload);
            yield put({
                type: 'queryModelFile',
                payload: response,
            });
        },

    },

    reducers: {
        queryModelFile(state, action) {
            return {
                ...state,
                list: action.payload
            };
        },
    },
};
