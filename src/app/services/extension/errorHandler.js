import {HttpError} from "../exception/HttpError";

export function errorHandler(response) {
    if (!response.ok) {
        console.log('errorHandler: not ok');
        if (response.status === 401) {
            console.log('Unauthorized access - 401 should be');
            throw new HttpError('Unauthorized access - 401', 401);
        } else {
            throw new HttpError(`Error - ${response.status}: ${response.statusText}`, response.status);
        }
    }

    return response;
}