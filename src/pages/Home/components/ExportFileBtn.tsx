import Papa from "papaparse";
import exportData from "../../../utils/hooks/exportData";
import { memo } from "react";
import ItemData from "../../../interface/itemData";






const ExportFileBtn = ({dataList}: {dataList: ItemData[]}) => {
    const date = new Date().toLocaleDateString()
    return (
        <button className='btn btn-success px-3 ' onClick={() => {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const dataListWithoutId = dataList.map(({...item}: ItemData) => ({
                type: item.type,
                name: item.name,
                unit: item.unit,
                in_stock: item.in_stock,
                remark: item.remark,
            }));
            const csv = Papa.unparse(dataListWithoutId);
            exportData(csv, `${date}.csv`, 'text/csv;charset=utf-8;')

        }}>輸出檔案</button>
    )
}


const MemoizedExportFileBtn = memo(ExportFileBtn);
export default MemoizedExportFileBtn;
