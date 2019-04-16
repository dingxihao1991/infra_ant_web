/**
 * @Author: CJN
 * @Date: 2018/8/23
 * @Description: *
 */
import RenderAuthorized from '../components/Authorized';
import { getAuthority,getAccessRole } from './authority';

let Authorized = RenderAuthorized(getAccessRole());

// Reload the rights component
const reloadAuthorized = () => {
    Authorized = RenderAuthorized(getAccessRole());
};

export { reloadAuthorized };
export default Authorized;
