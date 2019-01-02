import { queryJobPlanList} from 'services/api';

export default {
    namespace: 'jobPlan',

    state: {
      list:[],
    },

    effects: {
        *fetch({ payload }, { call, put }) {
            const response = yield call(queryJobPlanList, payload);
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
