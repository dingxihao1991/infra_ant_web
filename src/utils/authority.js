/**
 * @Author: CJN
 * @Date: 2018/8/23
 * @Description: *
 */
let authCodes;
export function getAuthority() {
    return localStorage.getItem('operation-web-authority')// || 'admin';
}

export function setAuthority(authority) {
    return localStorage.setItem('operation-web-authority', JSON.stringify(authority));
}

export function setToken(token) {
    return localStorage.setItem('access_token', token);
}

export function getToken() {
    return localStorage.getItem('access_token');
}
