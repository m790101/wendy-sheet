import { SetStateAction, useEffect, useState } from 'react';
import AddNewModal from './components/AddNewModal';
import SearchBar from './components/Searchbar';
import ItemCard from './components/ItemCard';
import Footer from '../../component/Footer';
import useGetItemApi from './hook/useGetItemApi';
import ExportFileBtn from './components/ExportFileBtn';
import LogoutBtn from './components/LogoutBtn';
import ItemData from '../../interface/itemData';



const Home = () => {
    const [dataList, setDataList] = useState([])
    // const [searchDataList, setSearchDataList] = useState([])
    const [isVisible, setIsVisible] = useState(false)
    const [searchText, setSearchText] = useState('')
    const { getItemsApi } = useGetItemApi()


    function setDataListInitial(data: SetStateAction<never[]>) {
        setDataList(data)
        // setSearchDataList(data)
    }

    useEffect(() => {
        getItemsApi(setDataListInitial)
    }, [])


    function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
        const text = e.target.value
        setSearchText(text)
    }

    return (
        <>
            <SearchBar handleSearch={handleSearch} ></SearchBar>
            <div className='home'>
                <AddNewModal
                    isVisible={isVisible}
                    setIsVisible={setIsVisible}
                    setDataListInitial={setDataListInitial}
                ></AddNewModal>

                <div className='d-flex flex-column'>
                    {filterSearch(searchText, dataList).map((item: ItemData) => {
                        return (
                            <div key={item._id} className='p-3'>
                                <ItemCard data={item} setDataListInitial={setDataListInitial} ></ItemCard>
                            </div>
                        )
                    })
                    }
                </div>
            </div>
            <Footer>
                <div className='d-flex justify-content-center gap-3'>
                    <button className='btn btn-success ' onClick={() => { setIsVisible(true) }}>新增物品</button>
                    <ExportFileBtn
                        dataList={dataList}
                    />
                    <LogoutBtn />
                </div>

            </Footer>
        </>
    );
};


export default Home;


function filterSearch(text: string, dataList: ItemData[]) {
    const filterData = dataList.filter((item: ItemData) => {
        return item.name.includes(text.trim())
    })
    return filterData
}
