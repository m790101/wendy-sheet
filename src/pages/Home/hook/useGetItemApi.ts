import Api01 from "../../../service/apiService/apiList/api01"
import errorService from "../../../service/errorService"


export default () => {
  const [getItems] = Api01.useGetItemsMutation()
  



  // 呼叫 Loin API
  const getItemsApi = async () => {
    return getItems().unwrap()
  }



return {getItemsApi}
}
