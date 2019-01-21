import { queryDocumentList,queryFolderList} from '../service/api';

export default {
    namespace: 'documentModel',

    state: {
        folderList:[],
        documentList:[]
    },

    effects: {
        *folder({ payload }, { call, put }) {
            const response = yield call(queryFolderList, payload);
            yield put({
                type: 'queryFolderList',
                payload: response,
            });
        },
        *document({ payload }, { call, put }) {
            const response = yield call(queryDocumentList, payload);
            yield put({
                type: 'queryDocumentList',
                payload: response,
            });
        },

    },

    reducers: {
        queryFolderList(state, action) {
            return {
                ...state,
                folderList: action.payload
            };
        },
        queryDocumentList(state, action) {
            return {
                ...state,
                documentList: action.payload
            };
        },
    },
};
