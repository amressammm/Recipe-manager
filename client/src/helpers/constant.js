import parseJwt from "./decryptAuthToken";

export function checkLogin() {
    const token = localStorage.getItem("Recipe-Manager-Token");
    if (token) {
        const userData = parseJwt(token);
        return userData;
    }
    else {
        return false;
    }
}