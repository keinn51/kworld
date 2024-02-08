const TOKEN = 'token';
const expireDays = 5;

export function clearToken() {
    window.localStorage.clear();
}

export function saveToken(token) {
    const tokenObj = {
        value: token,
        expire: Date.now() + expireDays * 24 * 60 * 60 * 1000,
    };
    const tokenObjString = JSON.stringify(tokenObj);
    window.localStorage.setItem(TOKEN, tokenObjString);
}

export function getToken() {
    if (!window || !window.localStorage) return null;
    const tokenObjString = window.localStorage.getItem(TOKEN);
    if (!tokenObjString) {
        return null;
    }
    const tokenObj = JSON.parse(tokenObjString);
    if (Date.now() > tokenObj.expire) {
        clearToken();
        return null;
    }
    return tokenObj.value;
}
