import React, { Dispatch } from "react";
import { SetStateAction } from "react";
import { useDispatch } from "react-redux";
import { AnyAction } from "@reduxjs/toolkit";
import { updateLoginInfo } from "../../../store/appSlice";
import { NavigateFunction, useNavigate } from "react-router-dom";
import storage from "../../../utils/storage";


interface NavbarProps {
    dataList: ItemData[],
    setSearchDataList: React.Dispatch<SetStateAction<never[]>>
}



const Navbar = ({ dataList, setSearchDataList }: NavbarProps) => {
    const dispatch = useDispatch()
    const time = new Date().toLocaleString()
    const navigate = useNavigate();

    return (
        <>
            <nav className=" position-fixed z-3 navbar d-flex p-3 ">
                <div className="search_section gap-1 flex-column">
                    <div className="d-flex">
                        <div className="d-flex gap-2">
                            <input className="form-control me-2 " type="search" placeholder="搜尋" aria-label="Search" onChange={(e) => { handleSearch(e, dataList, setSearchDataList) }} />
                        </div>
                        <div>
                            <button className="btn btn-light" onClick={() => { logout(dispatch, navigate) }}>登出</button>
                        </div>
                    </div>
                    <div>
                        <span className="font-small">最後造訪時間:{time}</span>
                    </div>
                </div>

            </nav>
        </>
    );
}


export default Navbar;

interface ItemData {
    _id: string,
    name: string
    in_stock: number,

}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function handleSearch(e: React.ChangeEvent<HTMLInputElement>, dataList: ItemData[], setSearchDataList: (arg0: any) => void) {
    e.preventDefault()
    const text = e.target.value
    const filterData = dataList.filter((item) => {
        return item.name.includes(text.trim())
    })
    setSearchDataList(filterData)

}

async function logout(dispatch: Dispatch<AnyAction>, navigate: NavigateFunction) {
    await storage.removeLocalStorage('ls')
    dispatch(updateLoginInfo({ isLogin: false }))
    navigate('/login')
}

