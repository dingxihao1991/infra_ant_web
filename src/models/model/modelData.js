import { queryModelFileList} from 'services/api';

export default {
    namespace: 'modelData',

    state: {
        list:[]
    },

    effects: {
        *fetch({ payload }, { call, put }) {
            const response = yield call(queryModelFileList, payload);
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
