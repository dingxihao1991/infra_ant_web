import {queryApplication} from '../service/api';

export default {
    namespace: 'applicationModel',

    state: {
        list:[],
    },

    effects: {
        *fetch({ payload }, { call, put }) {
            console.log(payload)
            const response = yield call(queryApplication, payload);
            yield put({
                type: 'queryList',
                payload: response,
            });
        }

    },

    reducers: {
        queryList(state, action) {
            console.log("》》》》》》》》》》》",action.payload)
            console.log("action.payload.result",action.payload.result)
            return {
                ...state,
                list: action.payload.result,
            };
        },
    },
};
