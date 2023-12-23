import { SetStateAction } from "react"
import Api01 from "../../../service/apiService/apiList/api01"
import errorService from "../../../service/errorService"


export default () => {
  const [getItems] = Api01.useGetItemsMutation()
  

  const getItemsApi = async (action:(data: SetStateAction<never[]>) => void) => {
    const res = await getItems({}).unwrap()
    const { header: { code, message }, body } = res

      if (code === '0000') {
          action(body)
      } else {
          errorService.showErrorMsg(message)
      }
  }



return {getItemsApi}
}
