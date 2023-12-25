import Papa from "papaparse";
import exportData from "../../../utils/hooks/exportData";


interface ItemData {
    _id: string;
    type: string;
    name: string;
    unit: string;
    in_stock: number;
    remark: string;
    __v: string;
  }



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


export default ExportFileBtn