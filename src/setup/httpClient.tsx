import errorService from "../service/errorService";
// import axios from "./setupAxios";
import axios from "axios";

/**
 * @description 呼叫api發生例外錯誤時的例外處理
 * @param {string} _url api路徑
 * @param {object} error api呼叫後回傳的錯誤
 * @returns {object}
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const errorHandle = (_url: string, error: any): object => {
  const { response } = error;
  console.log(
    `%c 💩💩💩 API發生例外錯誤 💩💩💩${
      response && response.status ? `status code [${response.status}]` : ""
    }`,
    "color: #BB2E29; font-size: 14px; font-weight: bold;"
  );
  return Promise.reject(error);
};

const post = (url: string, postData = {}) => {
  return axios
    .post(url, postData)
    .then((res) => {
      console.log(res);
      return res
    })
    .catch((error) => {
      errorService.showErrorMsg(error.message);
    });
};

const get = (url: string) => {

  return axios
    .get(url)
    .then((res) => {

      const { data } = res;

      return data;
     
    })
    .catch((error) => {
      errorService.showErrorMsg(error.message);
    });
};

export { post, get, errorHandle };