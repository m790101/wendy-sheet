import { SetStateAction, useEffect, useState } from 'react';
import Card from '../../component/Card';
import AddNewModal from './components/AddNewModal';
import itemApi from '../../api/itemApi';
import SearchBar from './components/Searchbar';
import React from 'react';



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
            <AddNewModal
                isVisible={isVisible}
                setIsVisible={setIsVisible}
                setIsRefresh={setIsRefresh}
            ></AddNewModal>
            <div className='d-flex justify-content-center'>
                <button className='btn btn-success  w-100' onClick={() => { setIsVisible(true) }}>新增物品</button>
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





