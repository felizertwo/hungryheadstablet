import {get} from "../HttpClient";

export function foodItems(token) {
    return get("api/pos/food-items", null, {Authorization: `Bearer ${token}`, Accept: 'application/json'});
}