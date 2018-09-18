/**
 * @Author: CJN
 * @Date: 2018/8/23
 * @Description: *
 */

export function getAuthority() {
    return localStorage.getItem('operation-web-authority') || 'admin';
}

export function setAuthority(authority) {
    return localStorage.setItem('operation-web-authority', authority);
}