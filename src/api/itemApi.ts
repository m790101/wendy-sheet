import { get, post } from "../setup/httpClient";
import constant from "../constant/development";

const url = constant.apiUrl;

const getItems = async() => {
    const response = await get(url + "allItem");
    return response;
};

const updateItem = async ({data}) => {
  const response = await post(url + "update",{data});
  return response;
};

const addItems = async ({data}) => {
  const response = await post(url + "add",{data});
  return response;
};

const deleteItems = async ({id}) => {
    const response = await post(url + "delete",{id});
    return response;
  };

const itemApi = {
  getItems,
  updateItem,
  addItems,
  deleteItems
};

export default itemApi;
