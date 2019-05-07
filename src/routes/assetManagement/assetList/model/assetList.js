import {queryApplication} from '../service/api';

export default {
    namespace: 'assetList',

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
        },
        *update({ payload }, { call, put }) {
            console.log(payload)
            const response = yield call(queryApplication, payload);
            yield put({
                type: 'update',
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
        update(state, action) {

            return {
                ...state,
                list: action.payload,
            };
        },
    },
};
