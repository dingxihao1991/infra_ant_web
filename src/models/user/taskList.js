import { queryTaskList, addTaskList} from 'services/api';

export default {
    namespace: 'taskList',

    state: {
        list:[],
    },

    effects: {
        *fetch({ payload }, { call, put }) {
            console.log(payload)
            const response = yield call(queryTaskList, payload);
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
