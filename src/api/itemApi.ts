import { get, post } from "../setup/httpClient";
import constant from "../constant/development";
import ItemData from "../interface/itemData";

const url = constant.apiUrl;



interface ItemAddData{
  itemName:string
  itemNumber:number,

}

const getItems = async() => {
    const response = await get(url + "allItem");
    return response;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const updateItem = async ({data}:{data:ItemData}):Promise<any> => {
  const response = await post(url + "update",{data});
  return response;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const addItems = async ({data}:{data:ItemAddData}):Promise<any> => {
  const response = await post(url + "add",{data});
  return response;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const deleteItems = async ({id}:{id:string}):Promise<any> => {
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
