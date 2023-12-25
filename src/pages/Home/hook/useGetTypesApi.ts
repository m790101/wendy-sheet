import { SetStateAction } from "react"
import Api02 from "../../../service/apiService/apiList/api02"
import errorService from "../../../service/errorService"


export default () => {
  const [getTypes] = Api02.useGetTypesMutation()
  

  const getTypesApi = async (action:React.Dispatch<SetStateAction<never[]>>) => {
    const res = await getTypes({}).unwrap()
    const { header: { code, message }, body } = res

      if (code === '0000') {
          action(body)
      } else {
          errorService.showErrorMsg(message)
      }
  }



return {getTypesApi}
}