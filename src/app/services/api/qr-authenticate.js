import {post} from "../HttpClient"

export function initiateQrAuthentication(token) {
    return post("api/pos/pos-sessions", null, {Authorization: `Bearer ${token}`, Accept: 'application/json'});
}