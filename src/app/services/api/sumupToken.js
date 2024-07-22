import {get} from "../HttpClient";

export function sumupToken(token) {
    return get("api/pos/sumup-token", null, {Authorization: `Bearer ${token}`, Accept: 'application/json'});
}