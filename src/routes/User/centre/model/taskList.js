import { queryTaskList, addTaskList} from '../service/api';

export default {
    namespace: 'taskList',

    state: {
        list:[],
    },

    effects: {
        *fetch({ payload }, { call, put }) {
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
