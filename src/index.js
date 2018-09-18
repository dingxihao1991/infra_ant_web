/**
 * @Author: CJN
 * @Date: 2018/8/23
 * @Description: *
 */
import dva from "dva";
import createHistory from 'history/createHashHistory';

import createLoading from 'dva-loading';
import 'moment/locale/zh-cn';


import './index.less';


const app = dva({
    history: createHistory(),
});


app.use(createLoading());


app.model(require('./models/global').default);


app.router(require('./router').default);


app.start('#root');

export default app._store;