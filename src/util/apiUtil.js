import axios from "axios";
import { getToken, clearToken } from "./token_util";
import appConfig from "../config";
import { store } from "../store/store";
import authActions from "./../redux/auth/actions";
import config from "../config";
import appActions from "../../redux/app/actions";

class ApiProvider {
  static axiosWithToken;
  static token;

  static setToken(token) {
    ApiProvider.token = token;
    ApiProvider.axiosWithToken.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    ApiProvider.axiosWithToken.defaults.headers.common["version"] = `${config.version}`;
  }

  static init() {
    ApiProvider.axiosWithToken = axios.create({
      baseURL: appConfig.apiUrl
    });

    ApiProvider.axiosWithToken.interceptors.response.use(
      function(response) {
        // Do something with response data bro :)
        return response;
      },
      function(error) {
        if (error.response.data.error === "WRONG_TOKEN") {
          clearToken();
          store.dispatch(authActions.logout());
          store.dispatch(appActions.setNeedReconnect());
        }else if(error.response.data.error === "NEED_VERSION_UPDATE") {
          store.dispatch(appActions.setNeedVersionUpdate());
        }
        throw error;
      }
    );
  }
}

ApiProvider.init();
const token = getToken();

if (token) {
  ApiProvider.setToken(token);
}

export default ApiProvider;
