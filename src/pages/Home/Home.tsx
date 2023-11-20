import { SetStateAction, useEffect, useState } from 'react';
import Card from '../../component/Card';
import AddNewModal from './components/AddNewModal';
import itemApi from '../../api/itemApi';
import SearchBar from './components/Searchbar';
import Footer from '../../component/Footer';
import Papa from 'papaparse';



const Home = () => {
    const [dataList, setDataList] = useState([])
    const [searchDataList, setSearchDataList] = useState([])
    const [isVisible, setIsVisible] = useState(false)
    const [isRefresh, setIsRefresh] = useState(false)

    if (isRefresh) {
        getItem(setDataListInitial)
        setIsRefresh(false)
    }
    function setDataListInitial(data: SetStateAction<never[]>){
        setDataList(data)
        setSearchDataList(data)
    }

    useEffect(() => {
        getItem(setDataListInitial)
    }, [])

    return (
        <>
            <SearchBar dataList={dataList} setSearchDataList={setSearchDataList}></SearchBar>
            <div className=' home'>
            <AddNewModal
                isVisible={isVisible}
                setIsVisible={setIsVisible}
                setIsRefresh={setIsRefresh}
            ></AddNewModal>
            <div className='d-flex justify-content-center gap-3'>
                <button className='btn btn-success ' onClick={() => { setIsVisible(true) }}>新增物品</button>
                <button className='btn btn-success px-3 ' onClick={() => {
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    const dataListWithoutId = dataList.map(({ _id, __v, ...rest}:{_id:string, __v:string,name: string, in_stock: number}) => rest);
                    const csv = Papa.unparse(dataListWithoutId);
                    exportData(csv,'result.csv', 'text/csv;charset=utf-8;')
                    
                    }}>輸出檔案</button>
            </div>

            <div className='d-flex flex-column'>
                {

                    searchDataList.map((item, index) => {
                        return (
                            <div key={index} className='p-3'>
                                <Card data={item} setIsRefresh={setIsRefresh}></Card>
                            </div>
                        )
                    }
                    )
                }
            </div>
            </div>
            <Footer></Footer>



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


// Function to export data as a file
const exportData = (data:string, fileName:string, type:string) => {
    // Create a link and download the file
    const blob = new Blob([data], { type });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();
    window.URL.revokeObjectURL(url);
  };
