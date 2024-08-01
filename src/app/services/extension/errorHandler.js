import {HttpError} from "../exception/HttpError";
import {logger} from "@/app/services/logger";

export function errorHandler(response) {
    if (!response.ok) {
        logger.error('errorHandler: not ok');
        if (response.status === 401) {
            logger.error('Unauthorized access - 401 should be');
            throw new HttpError('Unauthorized access - 401', 401);
        } else {
            throw new HttpError(`Error - ${response.status}: ${response.statusText}`, response.status);
        }
    }

    return response;
}