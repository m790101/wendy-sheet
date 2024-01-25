import { SetStateAction, useState } from "react";
import FormModal from "../../../component/FormModal";
import useGetItemApi from "../hook/useGetItemApi";
import useDeleteItemApi from "../hook/useDeleteItemApi";
import useUpdateItemApi from "../hook/useUpdateItemApi";
import enumList from "../../../enum/enumList";
import ItemData from "../../../interface/itemData";

interface CardProps {
  data: ItemData;
  setDataListInitial: (data: SetStateAction<never[]>) => void;
}

const ItemCard = ({ data, setDataListInitial }: CardProps) => {
  const [itemNum, setItemNum] = useState(data.in_stock);
  const [isDelete, setIsDelete] = useState(false);

  const { deleteItemsApi } = useDeleteItemApi()
  const { getItemsApi } = useGetItemApi()
  const { updateItemApi } = useUpdateItemApi()

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
            <section className="ms-3">
              <div>
                <p> 類別：{checkType(data.type)}</p>
              </div>
              <div>
                <p className="fs-5">
                  品名：<span className="fw-bold">{data.name}</span>
                </p>
              </div>
              <div>
                <p> 單位：{data.unit}</p>
              </div>
              <div className="mb-3 d-flex align-items-center">
                <label className=" d-block" htmlFor="itemNumber">
                  庫存：
                </label>
                <input
                  type="text"
                  id="itemNumber"
                  className="form-control item-number-input"
                  value={itemNum}
                  onChange={(e) => {
                    const value = e.target.value
                    if (isNaN(Number(value))) {
                      return
                    }
                    setItemNum(Number(value));
                  }}
                />
              </div>
              <div>
                <p className="fs-5">
                  備註：<span className="">{data.remark}</span>
                </p>
              </div>
            </section>
            <div className="p-2 d-flex justify-content-center gap-4 btn-num-section">
              <button
                className="fs-4 m-1 btn-num plus"
                onClick={() => setItemNum(itemNum + 1)}
              ></button>
              <button
                className="fs-4 m-1 btn-num minus"
                onClick={() => setItemNum(itemNum - 1)}
              ></button>
            </div>
          </blockquote>
        </div>
        <button
          className=" btn-save"
          onClick={async () => {
            const dataUpdated = updateNumber(data, itemNum);
            await updateItemApi(dataUpdated)
            await getItemsApi(setDataListInitial)
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
            await deleteItemsApi(data)
            setIsDelete(false);
            await getItemsApi(setDataListInitial)
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


function updateNumber(data: ItemData, num: number) {
  return {
    ...data,
    in_stock: num,
  };
}

function checkType(type: string) {
  switch (type) {
    case enumList.itemType.consumables:
      return "消耗品";
    case enumList.itemType.intravenousBackup:
      return "點滴備品";
    case enumList.itemType.intravenousMedicine:
      return "點滴藥品";
    case enumList.itemType.prpItem:
      return "PRP 耗材";
    case enumList.itemType.injectionFridge:
      return "冰箱針劑";
    case enumList.itemType.metagenics:
      return "Metagenics";
    case enumList.itemType.metagenicsCalc:
      return "Metagenics 開封精算";
    default:
      return "";
  }
}

export default ItemCard;
