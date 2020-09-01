import jwtDecode from 'jwt-decode';
import { TOKEN } from './constants';

// funcion para guardar el token que nos llego desde el mutation login una vez ejecutado el mutation en LoginForm
export function setToken(token) {
    localStorage.setItem(TOKEN, token );
}

export function getToken() {
    return localStorage.getItem(TOKEN);
}

export function decodeToken(token) {
    return jwtDecode(token);
}