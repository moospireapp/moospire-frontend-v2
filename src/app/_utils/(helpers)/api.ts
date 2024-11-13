import axios from "axios";
import { API_VERSION, API_BASE_URL, commonUtil } from "@/app/_utils";

interface IServiceType {
  fetch: (url: string, option: optionType) => Promise<any>;
  push: (url: string, option: optionType) => Promise<any>;
  update: (url: string, option: optionType) => Promise<any>;
  remove: (url: string, option: optionType) => Promise<any>;
  handleErrors: (err: any) => Promise<any>;
  getHeaders: (attach: boolean) => any;
  injectTokenInterceptor: () => Promise<any>;
}

// SERVIVE TYPES
type optionType = {
  payload?: any;
  resolve?: boolean;
  is_attach?: boolean;
};

// SERVICE API CLSS
class serviceApi implements IServiceType {
  private base_url: string = API_BASE_URL as string;
  private base_version: string = API_VERSION as string;

  // INSTANTIATE BASE API URL
  constructor() {
    axios.defaults.baseURL = `${this.base_url}${this.base_version}`;
    this.injectTokenInterceptor();
  }

  // GET API REQUEST
  async fetch(
    url: string,
    option: optionType = { resolve: true }
  ): Promise<any> {
    const api_url = commonUtil.urlHash(url);

    try {
      const response = await axios.get(api_url, this.getHeaders());
      return option.resolve ? response.data : response;
    } catch (err) {
      return this.handleErrors(err);
    }
  }

  // POST API REQUEST
  async push(
    url: string,
    { payload = {}, resolve = true, is_attach = false }: optionType
  ): Promise<any> {
    try {
      const response = await axios.post(
        url,
        payload,
        this.getHeaders(is_attach)
      );

      return resolve ? response.data : response;
    } catch (err) {
      return this.handleErrors(err);
    }
  }

  // UPDATE API REQUEST
  async update(
    url: string,
    { payload = {}, resolve = true, is_attach = false }: optionType
  ): Promise<any> {
    try {
      const response = await axios.put(
        url,
        payload,
        this.getHeaders(is_attach)
      );
      return resolve ? response.data : response;
    } catch (err) {
      return this.handleErrors(err);
    }
  }

  // DELETE API REQUEST
  async remove(
    url: string,
    option: optionType = { payload: {}, resolve: true }
  ): Promise<any> {
    try {
      const response = await axios.delete(url, {
        data: option.payload,
        ...this.getHeaders(),
      });

      return option.resolve ? response.data : response;
    } catch (err) {
      return this.handleErrors(err);
    }
  }

  // HANDLE API REQUEST ERRORS
  async handleErrors(err: any): Promise<any> {
    return await err.response?.data;
  }

  // SETUP REQUEST
  getHeaders(attach = false): any {
    return attach
      ? {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      : {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        };
  }

  // AXIOS INTERCEPTOR
  async injectTokenInterceptor(): Promise<any> {
    axios.interceptors.request.use((config) => config);

    const nonAuthorizedRoutes =
      /^\/(auth\/login|auth\/signup|auth\/request-password|auth\/reset-password)/;

    axios.interceptors.response.use(
      async (response) => response,

      async (error) => {
        const originalConfig = error.config;

        // Check if the route is NOT a non-authorized route
        const isNonAuthorizedRoute = nonAuthorizedRoutes.test(
          originalConfig.url
        );

        if (error.response && !isNonAuthorizedRoute) {
          if (
            [401, 403].includes(error.response.status) &&
            !originalConfig._retry
          ) {
            originalConfig._retry = true;
            localStorage.clear();
            // window.location.href = "/login";
            return axios(originalConfig);
          }
        }

        return Promise.reject(error);
      }
    );
  }
}

export default new serviceApi();
