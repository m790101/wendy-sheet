import { SetStateAction, useEffect, useState } from 'react';
import AddNewModal from './components/AddNewModal';
import SearchBar from './components/Searchbar';
import Papa from 'papaparse';
import ItemCard from './components/ItemCard';
import Footer from '../../component/Footer';
import exportData from '../../utils/hooks/exportData';
import useGetItemApi from './hook/useGetItemApi';



const Home = () => {
    const [dataList, setDataList] = useState([])
    const [searchDataList, setSearchDataList] = useState([])
    const [isVisible, setIsVisible] = useState(false)
    const {getItemsApi} = useGetItemApi()


    function setDataListInitial(data: SetStateAction<never[]>){
        setDataList(data)
        setSearchDataList(data)
    }

    useEffect(() => {
        getItemsApi(setDataListInitial)
    }, [])

    return (
        <>
            <SearchBar dataList={dataList} setSearchDataList={setSearchDataList}></SearchBar>
            <div className='home'>
                <AddNewModal
                    isVisible={isVisible}
                    setIsVisible={setIsVisible}
                    setDataListInitial={setDataListInitial}
                ></AddNewModal>
                <div className='d-flex flex-column'>
                    {

                        searchDataList.map((item, index) => {
                            return (
                                <div key={index} className='p-3'>
                                    <ItemCard data={item} setDataListInitial={setDataListInitial}></ItemCard>
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

