import { queryList} from '../service/api';

export default {
    namespace: 'interestPoint',

    state: {
        points:[],
    },

    effects: {
        *fetch({ payload }, { call, put }) {
            const response = yield call(queryList, payload);
            yield put({
                type: 'queryList',
                payload: response,
            });
        },


    },

    reducers: {
        queryList(state, action) {
            return {
                ...state,
                points: action.payload
            };
        },

    },
};
