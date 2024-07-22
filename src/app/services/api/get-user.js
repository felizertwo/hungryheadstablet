import {get} from "../HttpClient";

export function getUser(userId, token) {
    return get(`api/pos/users/${userId}`, null, {Authorization: `Bearer ${token}`, Accept: 'application/json'});
}