import ItemData from "../../../interface/itemData";
import Api01 from "../../../service/apiService/apiList/api01";
import errorService from "../../../service/errorService";
import { showMsgBox } from "../../../utils/helpers/msgHelper";

export default () => {
  const [deleteItems] = Api01.useDeleteItemsMutation();

  const deleteItemsApi = async (data:ItemData) => {
    const id = data._id;
    const res = await deleteItems({ id }).unwrap();
    const {
      header: { code, message },
    } = res;
    if (code === "0000") {
      showMsgBox({
        content: `已成功刪除${data.name}!`,
        titleImg: "success",
        title: "成功",
        mainBtn: { label: "我知道了" },
      });
    } else {
      errorService.showErrorMsg(message);
    }
  };
  return { deleteItemsApi };
};

