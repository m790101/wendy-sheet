import { SetStateAction, useEffect, useState } from 'react';
import AddNewModal from './components/AddNewModal';
import itemApi from '../../api/itemApi';
import SearchBar from './components/Searchbar';
import Papa from 'papaparse';
import Api01 from '../../service/apiService/apiList/api01';
import errorService from '../../service/errorService';
import ItemCard from './components/ItemCard';
import Footer from '../../component/Footer';
import exportData from '../../utils/hooks/exportData';



const Home = () => {
    const [dataList, setDataList] = useState([])
    const [searchDataList, setSearchDataList] = useState([])
    const [isVisible, setIsVisible] = useState(false)
    const [isRefresh, setIsRefresh] = useState(false)
    const [getItems] = Api01.useGetItemsMutation({})


    if (isRefresh) {
        getItem(setDataListInitial)
        setIsRefresh(false)
    }
    function setDataListInitial(data: any) {
        setDataList(data)
        setSearchDataList(data)
    }

    useEffect(() => {
        getItems()
            .unwrap()
            .then((res) => {
                const { header: { code, message }, body } = res
                if (code === '0000') {
                    setDataListInitial(body)
                } else {
                    errorService.showErrorMsg(message)
                }
            })
    }, [])

    return (
        <>
            <SearchBar dataList={dataList} setSearchDataList={setSearchDataList}></SearchBar>
            <div className='home'>
                <AddNewModal
                    isVisible={isVisible}
                    setIsVisible={setIsVisible}
                    setIsRefresh={setIsRefresh}
                ></AddNewModal>
                <div className='d-flex flex-column'>
                    {

                        searchDataList.map((item, index) => {
                            return (
                                <div key={index} className='p-3'>
                                    <ItemCard data={item} setIsRefresh={setIsRefresh}></ItemCard>
                                </div>
                            )
                        }
                        )
                    }
                </div>
            </div>
            <Footer>
                <div className='d-flex justify-content-center gap-3'>
                    <button className='btn btn-success ' onClick={() => { setIsVisible(true) }}>新增物品</button>
                    <button className='btn btn-success px-3 ' onClick={() => {
                        // eslint-disable-next-line @typescript-eslint/no-unused-vars
                        const dataListWithoutId = dataList.map(({ _id, __v, ...rest }: { _id: string, __v: string, name: string, in_stock: number }) => rest);
                        const csv = Papa.unparse(dataListWithoutId);
                        exportData(csv, 'result.csv', 'text/csv;charset=utf-8;')

                    }}>輸出檔案</button>
                </div>
            </Footer>
        </>
    );
};

export default Home;



// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getItem = async (callback: { (data: SetStateAction<never[]>): void; (data: SetStateAction<never[]>): void; (arg0: any): void; }) => {
    try {
        const res = await itemApi.getItems();
        const result = res.body
        callback(result)

    } catch (error) {
        console.error(error);
    }
};
