/**
 * @Author: CJN
 * @Date: 2018/8/23
 * @Description: 全局设置
 */

export default {
    namespace: 'global',

    state: {
        collapsed: false,
        notices: [],
    },
    reducers: {
        changeLayoutCollapsed(state, {payload}) {
            return {
                ...state,
                collapsed: payload,
            };
        }
    },
    subscriptions: {
        setup({ history }) {
            return history.listen(({ pathname, search }) => {
                if (typeof window.ga !== 'undefined') {
                    window.ga('send', 'pageview', pathname + search);
                }
            });
        },
    },
}