import { SetStateAction, useState } from "react";
import FormModal from "./FormModal";
import { showMsgBox } from "../utils/helpers/msgHelper";
import errorService from "../service/errorService";
import itemApi from "../api/itemApi";

interface CardProps {
  data:ItemData,
  setIsRefresh: React.Dispatch<SetStateAction<boolean>>
}


const Card = ({ data, setIsRefresh }:CardProps) => {
  const [itemNum, setItemNum] = useState(data.in_stock)
  const [isVisible, setIsVisible] = useState(false)
  const [isDelete, setIsDelete] = useState(false)

  return (
    <>
      <div className="card">
        <div className="d-flex justify-content-end">
          <button className="btn btn-danger" onClick={() => {
            setIsDelete(true)
          }}>X</button>
        </div>
        <div className="card-body">
          <blockquote className="blockquote mb-0">
            <p> 類別：</p>
            <p className="fs-5">品名：<span className="fw-bold">{data.name}</span></p>
            <p className="fw-bold">庫存：{itemNum} </p>
            <div className="p-3 d-flex justify-content-center gap-3">
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
      
      <FormModal
        title="確定刪除?"
        hasCloseBtn={true}
        maxWidth="sm"
        isVisible={isDelete}
        mainBtn={{ label: "Ok", onClick: () => { 
          deleteItem(data)
          setIsRefresh(true)
          setIsDelete(false)
         } }}
        minorBtn={{
          label: "Cancel",
        }}
        onRequestClose={() => {
          setIsDelete(false)
        }}></FormModal>
    </>
  );
};

interface ItemData{
  _id:string,
  name:string
  in_stock:number,

}

function updateNumber(data: ItemData, num: number) {
  return {
    ...data,
    in_stock: num
  }
}


async function submit(data:ItemData) {
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


async function deleteItem(data: { _id: string; name: string;  }) {
  const id = data._id
  const res = await itemApi.deleteItems({ id })
  const { header: { code, message } } = res.data
  if (code === '0000') {
    showMsgBox({
      content: `已成功刪除${data.name}!`,
      titleImg: "success",
      title: "成功",
      mainBtn: { label: "我知道了" },
    })
  } else {
    errorService.showErrorMsg(message)
  }
}



export default Card