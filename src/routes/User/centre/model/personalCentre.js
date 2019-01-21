import { queryCurrentUser, addCurrentUser} from '../service/api';

export default {
    namespace: 'personalCentre',

    state: {
        currentUser:{},
        tags:[],
        calendarList:[],
    },

    effects: {
        *fetch({ payload }, { call, put }) {
            const response = yield call(queryCurrentUser, payload);
            yield put({
                type: 'queryUser',
                payload: response,
            });
        },
        *add({ payload }, { call, put }) {
            const response = yield call(addCurrentUser, payload);
            yield put({
                type: 'appendList',
                payload: response? response : {},
            });
        },

    },

    reducers: {
        queryUser(state, action) {
            return {
                ...state,
                currentUser: action.payload.currentUser,
                tags:action.payload.tags,
                calendarList:action.payload.calendarList
            };
        },
        appendList(state, action) {
            return {
                ...state,
                tags: action.payload.tags,
                calendarList:action.payload.calendarList,
            };
        },
    },
};
