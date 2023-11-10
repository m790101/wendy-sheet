import { useEffect, useState } from 'react';
import Card from '../../component/Card';
import AddNewModal from './components/AddNewModal';
import itemApi from '../../api/itemApi';



const Home = () => {
    const [dataList, setDataList] = useState([])
    const [isVisible, setIsVisible] = useState(false)
    const [isRefresh, setIsRefresh] = useState(false)

    if (isRefresh) {
        getItem(setDataList)
        setIsRefresh(false)
    }

    useEffect(() => {
        getItem(setDataList)
    }, [])


    return (
        <>
            <AddNewModal
                isVisible={isVisible}
                setIsVisible={setIsVisible}
                setIsRefresh={setIsRefresh}
            ></AddNewModal>
            <div className='d-flex justify-content-center'>
                <button className='btn btn-success  px-4' onClick={() => { setIsVisible(true) }}>add item</button>
            </div>

            <div className='d-flex flex-column'>
                {

                    dataList.map((item, index) => {
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



const getItem = async (callback) => {
    try {
        const res = await itemApi.getItems();
        const result = res.body
        callback(result)

    } catch (error) {
        console.error(error);
    }
};





