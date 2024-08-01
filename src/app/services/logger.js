import log from 'loglevel';

const serializeObject = (obj, maxDepth = 3, depth = 0) => {
    if (depth > maxDepth || obj === null || typeof obj !== 'object') {
        return '[Object]'; //
    }

    const keys = Object.keys(obj);
    const result = {};

    keys.forEach(key => {
        try {
            result[key] = serializeObject(obj[key], maxDepth, depth + 1);
        } catch (e) {
            result[key] = '[Circular]';
        }
    });

    return result;
};

const configureLogger = () => {
    const originalFactory = log.methodFactory;

    log.methodFactory = (methodName, logLevel, loggerName) => {
        const rawMethod = originalFactory(methodName, logLevel, loggerName);
        return (message, ...args) => {
            let additionalObjects = args;
            if (!(message instanceof String)) {
                message = "Missing logging message.";
                if (typeof message === 'object') {
                    additionalObjects = [message, ...additionalObjects];
                }
            }

            let formattedMessage = `[${new Date().toISOString()}] ${methodName.toUpperCase()}: ${message}`;

            if (methodName.toLowerCase() === 'error' && additionalObjects.length > 0) {
                const [firstArg] = additionalObjects;
                if (firstArg instanceof Error) {
                    formattedMessage += `\nException: ${firstArg.message}\nStack Trace:\n${firstArg.stack}`;
                } else {
                    formattedMessage += `\nObject Details:\n${JSON.stringify(serializeObject(firstArg), null, 2)}`;
                }
            } else if (additionalObjects.length > 0) {
                formattedMessage += `\nObject Details:\n${JSON.stringify(serializeObject(args[0]), null, 2)}`;
            }

            rawMethod(formattedMessage);
        };
    };

    log.setLevel(process.env.NODE_ENV === 'development' ? 'debug' : 'warn');
};

export default configureLogger;
export const logger = log;
