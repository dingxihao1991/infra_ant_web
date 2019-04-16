/**
 * @Author: CJN
 * @Date: 2018/8/23
 * @Description: *
 */
export function getAuthority() {
    return JSON.parse(localStorage.getItem('operation-web-authority'))// || 'admin';
}

export function setAuthority(authority) {
    return localStorage.setItem('operation-web-authority', JSON.stringify(authority));
}

export function getAccessRole() {
    return localStorage.getItem('access-authority')// || 'admin';
}

export function setAccessRole(role) {
    return localStorage.setItem('access-authority', role);
}

export function setToken(token) {
    return localStorage.setItem('access_token', token);
}

export function getToken() {
    return localStorage.getItem('access_token');
}
