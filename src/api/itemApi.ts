import { get, post } from "../setup/httpClient";
import constant from "../constant/development";

const url = constant.apiUrl;

interface ItemData{
  _id:string,
  name:string
  in_stock:number,

}

const getItems = async() => {
    const response = await get(url + "allItem");
    return response;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const updateItem = async ({data}):Promise<any> => {
  const response = await post(url + "update",{data});
  return response;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const addItems = async ({data}):Promise<any> => {
  const response = await post(url + "add",{data});
  return response;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const deleteItems = async ({id}):Promise<any> => {
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
