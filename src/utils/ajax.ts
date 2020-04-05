/**
 * ajax based axios
 * @author zhaoyiming
 * @since  2020/04/05
 */

import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosPromise,
  AxiosResponse,
} from "axios";
import {
  getUid,
  getToken,
  getAccountType,
  removeUid,
  removeToken,
} from "@/utils/session";

export interface ResponseData {
  code: number;
  data?: any;
  message: string;
  success: boolean;
}

interface NeedReplaceKey {
  key: string;
}

class Ajax {
  public request(options: AxiosRequestConfig): AxiosPromise {
    const instance: AxiosInstance = axios.create();
    const transformResponse = (data: any) => getRealJsonData(data);
    options = Object.assign({}, options, { transformResponse });
    this.interceptors(instance, options.url);
    return instance(options);
  }

  private interceptors(instance: AxiosInstance, url?: string) {
    // 请求拦截
    instance.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        Object.assign(config.headers, {
          Uid: getUid(),
          Token: getToken(),
          accountType: getAccountType(),
        });
        return config;
      },
      (error) => Promise.reject(error)
    );

    // 响应拦截
    instance.interceptors.response.use(
      (res: AxiosResponse<ResponseData>) => {
        const { code, success, message } = res.data;
        if (code !== 0 || !success) {
          if (code === 401) {
            removeUid();
            removeToken();
            setTimeout(() => {
              window.location.reload();
            }, 1000);
            return res;
          }
          return Promise.reject();
        }
        return res;
      },
      (error) => {
        Promise.reject(error);
      }
    );
  }
}

const getRealJsonData = (baseStr: string) => {
  if (!baseStr || typeof baseStr != "string") {
    console.log("baseStr is not string");
  }
  let jsonData = null;
  try {
    jsonData = JSON.parse(baseStr);
  } catch (err) {
    return null;
  }

  let needReplaceStrs: NeedReplaceKey[] = [];
  loopFindArrOrObj(jsonData, needReplaceStrs);
  needReplaceStrs.forEach((replaceInfo: NeedReplaceKey) => {
    let matchArr = baseStr.match('"' + replaceInfo.key + '":[0-9]{15,}');
    if (matchArr) {
      let str = matchArr[0];
      let replaceStr = str.replace(
        '"' + replaceInfo.key + '":',
        '"' + replaceInfo.key + '":"'
      );
      replaceStr += '"';
      baseStr = baseStr.replace(str, replaceStr);
    }
  });
  let returnJson = null;
  try {
    returnJson = JSON.parse(baseStr);
  } catch (err) {
    return null;
  }
  return returnJson;
};

const loopFindArrOrObj = (value: any, needRpStrArr: NeedReplaceKey[]) => {
  let valueTypeof = Object.prototype.toString.call(value);
  if (valueTypeof == "[object Object]") {
    needRpStrArr.concat(getNeedRpStrByObj(value, needRpStrArr));
  }
  if (valueTypeof == "[object Array]") {
    needRpStrArr.concat(getNeedRpStrByArr(value as any[], needRpStrArr));
  }
};

const getNeedRpStrByObj = (obj: any, needReplaceStrs: NeedReplaceKey[]) => {
  for (let key in obj) {
    const value = obj[key];
    if (typeof value == "number" && value > 9007199254740992) {
      needReplaceStrs.push({ key: key });
    }
    loopFindArrOrObj(value, needReplaceStrs);
  }
  return needReplaceStrs;
};

const getNeedRpStrByArr = (arr: any[], needReplaceStrs: NeedReplaceKey[]) => {
  for (let i = 0; i < arr.length; i++) {
    const value = arr[i];
    loopFindArrOrObj(value, needReplaceStrs);
  }
  return needReplaceStrs;
};

export default new Ajax();
