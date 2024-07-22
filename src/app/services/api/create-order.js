import {post} from "../HttpClient";

export function createOrder(token, order) {
    return post("api/pos/orders", order, {Authorization: `Bearer ${token}`, Accept: 'application/json'});

}