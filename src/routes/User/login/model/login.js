import { routerRedux } from 'dva/router';
import { stringify } from 'qs';
import { fakeAccountLogin } from '../../../../services/api';
import { reloadAuthorized } from 'utils/Authorized';
import { getPageQuery } from 'utils/utils';
import { setAuthority,setToken,setAccessRole} from 'utils/authority';

export default {
  namespace: 'login',

  state: {
    status: undefined,
  },

  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(fakeAccountLogin, payload);
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      });
      // Login successfully
      if (response.success) {
        reloadAuthorized();

        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        let { redirect } = params;

        if (redirect) {
          const redirectUrlParams = new URL(redirect);
            console.log("redirectUrlParams：",redirectUrlParams)
          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);
            console.log(redirect,'#######:'+redirect.startsWith('/#'))
            if (redirect.startsWith('/#')) {
              redirect = redirect.substr(2);
                console.log("redirect：",redirect)

            }
          if (redirect.startsWith('/web/#')) {
              redirect = redirect.substr(6);
              console.log("redirect：",redirect)

          }
          } else {
            window.location.href = redirect;
            return;
          }
        }
          console.log("redirect：",redirect)
        yield put(routerRedux.replace(redirect || '/'));
      }
    },
    *logout(_, { put }) {
      yield put({
        type: 'changeLoginStatus',
        payload: {
          status: false,
          currentAuthority: 'guest',
        },
      });
      reloadAuthorized();
      yield put(
        routerRedux.push({
          pathname: '/user/login',
          search: stringify({
            redirect: window.location.href,
          }),
        })
      );
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {

        setAccessRole(payload.result.tokenObjDTO.roleId);
        setAuthority(payload.result.tokenObjDTO);
        setToken(payload.result.token);

      return {
        ...state,
        status: true,
        type: payload.type,
      };
    },
  },
};
