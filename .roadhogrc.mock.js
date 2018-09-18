/**
 * @Author: CJN
 * @Date: 2018/8/24
 * @Description: roadhog 配置设置 本地反代
 */
import mockjs from 'mockjs';

import { format, delay } from 'roadhog-api-doc';

// 是否禁用代理
const noProxy = process.env.NO_PROXY === 'true';

// 代码中会兼容本地 service mock 以及部署站点的静态数据
const proxy = {

};
export default (noProxy ? {} : delay(proxy, 1000));
