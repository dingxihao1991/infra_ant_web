import {queryApplication,add} from '../service/api';
import {addCurrentUser} from "../../../User/centre/service/api";

export default {
    namespace: 'takeRecord',

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
        *add({ payload }, { call, put }) {
            const response = yield call(add, payload);
            console.log("-----------",response);
            yield put({
                type: 'add',
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
        add(state, action) {

            return {
                ...state,
                list: action.payload,
            };
        },
    },
};
