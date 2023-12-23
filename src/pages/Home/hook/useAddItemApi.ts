import Api01 from "../../../service/apiService/apiList/api01"
import errorService from "../../../service/errorService"
import { showMsgBox } from "../../../utils/helpers/msgHelper"

export default () => {
    const [addItems] = Api01.useAddItemsMutation()

const addItemsApi = async (data:ItemData) => {
    const res = await addItems({data}).unwrap()
    const { header: { code, message } } = res

    if (code === '0000') {
        showMsgBox({
            content: `已成功新增${data.itemName}!`,
            titleImg: "success",
            title: "新增成功",
            mainBtn: { label: "我知道了" },
        })
    } else {
        errorService.showErrorMsg(message)
    }
}

return {addItemsApi}
}

interface ItemData{
    itemName:string,
    itemNumber:number,
  
  }
