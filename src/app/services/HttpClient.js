const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

const defaultHeaders = {
    "Content-Type": "application/json",
};

export function get(path, query, headers) {
    const queryString = query === null ? "" : "?" + new URLSearchParams(query).toString();

    const builtUrl = `${backendUrl}/${path}${queryString}`;

    return fetch(builtUrl, {
        method: 'GET',
        headers: {
            ...defaultHeaders,
            ...headers
        }
    })
}


export function post(path, data, headers) {
    verifyHeaders(headers ?? {});

    return fetch(`${backendUrl}/${path}`, {
        method: 'POST',
        headers: {
            ...defaultHeaders,
            ...headers
        },
        body: JSON.stringify(data)
    });
}

function verifyHeaders(headers) {
    const contentTypeKey = Object.keys(headers).findLast(k => k.toLowerCase() === 'content-type');

    if (contentTypeKey) {
        if (headers[headers].toLowerCase() !== 'application/json') {
            throw new Error("HttpClient can work just  with application/json content type.");
        }
    }
}