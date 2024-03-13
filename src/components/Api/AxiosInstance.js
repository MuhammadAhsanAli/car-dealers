import axios from 'axios';
import { configureAxios } from './AxiosInterceptor';
import { configValues } from '../../config';

const baseURL = configValues.apiUrl;
const axiosInstance = axios.create({ baseURL });

configureAxios(axiosInstance);

export default axiosInstance;