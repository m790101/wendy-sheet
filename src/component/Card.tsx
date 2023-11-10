import { useState } from "react";
import FormModal from "./FormModal";
import { showMsgBox } from "../utils/helpers/msgHelper";
import errorService from "../service/errorService";
import itemApi from "../api/itemApi";

const Card = ({ data, setIsRefresh }) => {
  const [itemNum, setItemNum] = useState(data.in_stock)
  const [isVisible, setIsVisible] = useState(false)

  return (
    <>
      <div className="card">
        <div className="d-flex justify-content-end">
          <button className="btn btn-danger" onClick={() => {
            deleteItem(data)
            setIsRefresh(true)
          }}>X</button>
        </div>
        <div className="card-body">
          <blockquote className="blockquote mb-0">
            {/* <p> 類別：{data.item.type}</p> */}
            <p className="fw-bold">品名：</p>
            <p className="fw-bold">{data.name}</p>
            <p className="fw-bold">庫存：{itemNum} </p>
            <div className="p-2">
              <button className="fs-2 m-1 btn btn-info" onClick={() => setItemNum(itemNum + 1)}>+</button>
              <button className="fs-2 m-1 btn btn-info" onClick={() => setItemNum(itemNum - 1)}>-</button>
            </div>
          </blockquote>
        </div>
        <button className="btn btn-primary" onClick={() => {
          const dataUpdated = updateNumber(data, itemNum)
          submit(dataUpdated)
        }}>submit</button>
      </div>
      <FormModal
        title="更新成功"
        hasCloseBtn={true}
        maxWidth="xs"
        isVisible={isVisible}
        mainBtn={{ label: "Ok", onClick: () => { setIsVisible(false) } }}
        onRequestClose={() => { setIsVisible(false) }} >
      </FormModal>
    </>
  );
};

function updateNumber(data, num) {
  return {
    ...data,
    in_stock: num
  }
}


async function submit(data) {
  const res = await itemApi.updateItem({ data })
  const { header: { code, message } } = res.data
  if (code === '0000') {
    showMsgBox({
      content: `已成功更新${data.name}數量!`,
      titleImg: "success",
      title: "更新成功",
      mainBtn: { label: "我知道了" },
    })
  } else {
    errorService.showErrorMsg(message)
  }
}


async function deleteItem(data) {
  const id = data._id
  const res = await itemApi.deleteItems({ id })
  console.log(res);
  const { header: { code, message } } = res.data
  if (code === '0000') {
    showMsgBox({
      content: `已成功刪除!`,
      titleImg: "success",
      title: "成功",
      mainBtn: { label: "我知道了" },
    })
  } else {
    errorService.showErrorMsg(message)
  }
}



export default Card