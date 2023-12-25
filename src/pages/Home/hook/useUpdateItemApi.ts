import Api01 from "../../../service/apiService/apiList/api01";
import errorService from "../../../service/errorService";
import { showMsgBox } from "../../../utils/helpers/msgHelper";

interface ItemData {
    _id: string;
    type: string;
    name: string;
    unit: string;
    in_stock: number;
    remark: string;
  }


export default () => {
  const [updateItem] = Api01.useUpdateItemMutation();
  const updateItemApi = async (data:ItemData) => {
    const res = await updateItem({ data }).unwrap();
    const {
      header: { code, message },
    } = res;
    if (code === "0000") {
      showMsgBox({
        content: `已成功更新${data.name}數量!`,
        titleImg: "success",
        title: "更新成功",
        mainBtn: { label: "我知道了" },
      });
    } else {
      errorService.showErrorMsg(message);
    }
  };
  return { updateItemApi };
};


