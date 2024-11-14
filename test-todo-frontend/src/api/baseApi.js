import axios from 'axios';

export const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT || 'http://localhost:8000';

const axiosApi = axios.create({
    baseURL: API_ENDPOINT
});

/**
 * HTTP Request using GET method
 * 
 * @param {string} url A url endpoint
 * @param {string} queryParams Query Params 
 * @param {string} token A jwt token to authorize
 * 
 * @returns HTTP Request Response
 */
export const apiGet = async ({ url, queryParams, token = undefined }) => {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    };
    if (!token) {
        delete headers.Authorization;
    }

    try {
        const response = await axiosApi.get(url, {
            params: queryParams,
            headers,
        });

        if (response.status < 300) {
            return response.data;
        } else {
            throw Error(String(response?.data));
        }
    } catch (error) {
        throw error?.response?.data || error;
    }
};

/**
 * HTTP Request using POST method
 * 
 * @param {string} url A url endpoint
 * @param {string} queryParams Query Params 
 * @param {string} bodyParam Body Params 
 * @param {string} token A jwt token to authorize
 * 
 * @returns HTTP Request Response
 */
export const apiPost = async ({ url, queryParams = undefined, bodyParam, token = undefined }) => {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    };
    if (!token) {
        delete headers.Authorization;
    }

    try {
        const response = await axiosApi.post(url, bodyParam, {
            params: queryParams,
            headers: headers,
        });

        if (response.status < 300) {
            return response.data;
        } else {
            throw Error(response?.data);
        }
    } catch (error) {
        throw error?.response?.data || error;
    }
};


/**
 * HTTP Request using POST method
 * 
 * @param {string} url A url endpoint
 * @param {string} queryParams Query Params 
 * @param {string} bodyParam Body Params 
 * @param {string} token A jwt token to authorize
 * 
 * @returns HTTP Request Response
 */
export const apiPut = async ({ url, queryParams, bodyParam, token = undefined }) => {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    };
    if (!token) {
        delete headers.Authorization;
    }

    try {
        const response = await axiosApi.put(url, bodyParam, {
            params: queryParams,
            headers: headers,
        });

        if (response.status < 300) {
            return response.data;
        } else {
            throw Error(response?.data);
        }
    } catch (error) {
        throw error?.response?.data || error;
    }
};


/**
 * HTTP Request using POST method
 * 
 * @param {string} url A url endpoint
 * @param {string} queryParams Query Params 
 * @param {string} bodyParam Body Params 
 * @param {string} token A jwt token to authorize
 * 
 * @returns HTTP Request Response
 */
export const apiDelete = async ({ url, token = undefined }) => {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    };
    if (!token) {
        delete headers.Authorization;
    }

    try {
        const response = await axiosApi.delete(url, {
            headers: headers,
        });

        if (response.status < 300) {
            return response.data;
        } else {
            throw Error(response?.data);
        }
    } catch (error) {
        throw error?.response?.data || error;
    }
};
