import {post} from "../HttpClient"
import {LoginError} from "../exception/LoginError";

export function authenticate({email, password, deviceName}, tokenSetter) {
    return post("api/auth/token", {email, password, device_name: deviceName}, {
        Accept: 'application/json'
    })
        .then(res => {
            if (!res.ok) {
                //TODO: Need to add detail description
                //TODO: what is wrong
                //TODO: backend provides all necessary information
                return Promise.reject(new LoginError("Invalid username or password. Please try again."));
            }

            return res;
        })
        .then(res => res.text())
        .then(token => tokenSetter(token));

}