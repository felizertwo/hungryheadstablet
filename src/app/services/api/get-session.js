import {get} from "../HttpClient";

export function getSession(uuidSession, token) {
    return get(`api/pos-sessions/${uuidSession}`, null, {Authorization: `Bearer ${token}`, Accept: 'application/json'});
}