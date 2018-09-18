/**
 * @Author: CJN
 * @Date: 2018/8/23
 * @Description: *
 */
import RenderAuthorized from '../components/Authorized';
import { getAuthority } from './authority';

let Authorized = RenderAuthorized(getAuthority());

// Reload the rights component
const reloadAuthorized = () => {
    Authorized = RenderAuthorized(getAuthority());
};

export { reloadAuthorized };
export default Authorized;
