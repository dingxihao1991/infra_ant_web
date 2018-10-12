/**
 * @Author: CJN
 * @Date: 2018/8/24
 * @Description: *
 */

import Authorized from './Authorized';
import AuthorizedRoute from './AuthorizedRoute';
import Secured from './Secured';
import check from './CheckPermissions.js';
import renderAuthorize from './renderAuthorize';
import ButtonAuthorize from './ButtonAuthorize';

Authorized.Secured = Secured;
Authorized.AuthorizedRoute = AuthorizedRoute;
Authorized.check = check;
Authorized.ButtonAuthorize = ButtonAuthorize;

export default renderAuthorize(Authorized);