import { queryPerambulateList , addPerambulate , queryAssetData} from 'services/api';

export default {
    namespace: 'perambulate',

    state: {
        tags:[],
        list:[],
      assetData:[],
    },

    effects: {
        *fetch({ payload }, { call, put }) {
            const response = yield call(queryPerambulateList, payload);
            yield put({
                type: 'queryPerambulate',
                payload: response,
            });
        },
        *assetData({ payload }, { call, put }) {
            const response = yield call(queryAssetData, payload);
            yield put({
              type: 'queryAssetData',
              payload: response,
            });
         },
        *add({ payload }, { call, put }) {
            const response = yield call(addPerambulate, payload);
            yield put({
                type: 'appendList',
                payload: response? response : {},
            });
        },

    },

    reducers: {
      queryAssetData(state, action) {
        return {
          ...state,
          assetData:action.payload
        };
      },
      queryPerambulate(state, action) {
            return {
                ...state,
              list:action.payload
            };
        },
        appendList(state, action) {
            return {
                ...state,
                tags: action.payload.tags,
                list:action.payload,
            };
        },
    },
};
