import { SetStateAction, useState } from "react";
import FormModal from "./FormModal";
import { showMsgBox } from "../utils/helpers/msgHelper";
import errorService from "../service/errorService";
import itemApi from "../api/itemApi";
import React from "react";

interface CardProps {
  data: ItemData;
  setIsRefresh: React.Dispatch<SetStateAction<boolean>>;
}

const Card = ({ data, setIsRefresh }: CardProps) => {
  const [itemNum, setItemNum] = useState(data.in_stock);
  const [isDelete, setIsDelete] = useState(false);

  return (
    <>
      <div className="card p-3">
        <div className="d-flex justify-content-end">
          <button
            className="btn btn-danger"
            onClick={() => {
              setIsDelete(true);
            }}
          >
            X
          </button>
        </div>
        <div className="card-body">
          <blockquote className="blockquote mb-0">
            <p> 類別：</p>
            <p className="fs-5">
              品名：<span className="fw-bold">{data.name}</span>
            </p>
            <div className="mb-3 row align-items-center">
              <label className=" col" htmlFor="itemNumber">
                庫存：
              </label>
              <input
                type="number"
                id="itemNumber"
                className="form-control col"
                value={itemNum}
                onChange={(e) => {
                  setItemNum(Number(e.target.value));
                }}
              />
            </div>
            <div className="p-3 d-flex justify-content-center gap-5">
              <button
                className="fs-4 m-1 btn btn-info"
                onClick={() => setItemNum(itemNum + 1)}
              >
                +
              </button>
              <button
                className="fs-4 m-1 btn btn-info"
                onClick={() => setItemNum(itemNum - 1)}
              >
                -
              </button>
            </div>
          </blockquote>
        </div>
        <button
          className="btn btn-primary"
          onClick={async() => {
            const dataUpdated = updateNumber(data, itemNum);
            await submit(dataUpdated);
            setIsRefresh(true)
          }}
        >
          更新
        </button>
      </div>

      <FormModal
        title="確定刪除?"
        hasCloseBtn={true}
        maxWidth="sm"
        isVisible={isDelete}
        mainBtn={{
          label: "Ok",
          onClick: async () => {
            await deleteItem(data);
            setIsDelete(false);
            setIsRefresh(true);
          },
        }}
        minorBtn={{
          label: "Cancel",
        }}
        onRequestClose={() => {
          setIsDelete(false);
        }}
      ></FormModal>
    </>
  );
};

interface ItemData {
  _id: string;
  name: string;
  in_stock: number;
}

function updateNumber(data: ItemData, num: number) {
  return {
    ...data,
    in_stock: num,
  };
}

async function submit(data: ItemData) {
  const res = await itemApi.updateItem({ data });
  const {
    header: { code, message },
  } = res.data;
  if (code === "0000") {
    showMsgBox({
      content: `已成功更新${data.name}數量!`,
      titleImg: "success",
      title: "更新成功",
      mainBtn: { label: "我知道了"},
    });
  } else {
    errorService.showErrorMsg(message);
  }
}

async function deleteItem(data: { _id: string; name: string }) {
  const id = data._id;
  const res = await itemApi.deleteItems({ id });
  const {
    header: { code, message },
  } = res.data;
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
}

export default Card;
