import axiosInstance from './AxiosInstance';

export const AxiosRequest = async (method, url, data = null) => {
    try {
        let response;
        if (method === 'GET') {
            response = await axiosInstance.get(url);
        } else if (method === 'POST') {
            response = await axiosInstance.post(url, data);
        } else if (method === 'PUT') {
            response = await axiosInstance.put(url, data);
        } else if (method === 'DELETE') {
            response = await axiosInstance.delete(url);
        } else {
            throw new Error('Unsupported HTTP method');
        }
        return response;
    } catch (error) {
        throw new Error(`Failed to ${method} data: ${error.message}`);
    }
};
