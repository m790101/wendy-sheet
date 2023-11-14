import React from "react";
import { MouseEvent, SetStateAction, useState } from "react";


interface NavbarProps {
    dataList:ItemData[],
    setSearchDataList:React.Dispatch<SetStateAction<never[]>>
}



const Navbar = ({ dataList, setSearchDataList }:NavbarProps) => {
    const [searchText, setSearchText] = useState('')

    return (
        <>
            <nav className=" position-fixed z-3 navbar">
                <div className="search_section">
                    <div className="d-flex flex-column gap-2">
                        <input className="form-control me-2 " type="search" placeholder="Search" aria-label="Search" onChange={(e) => { setSearchText(e.target.value) }} />
                        <button className="btn btn-success" type="submit" onClick={(e) => { handleSearch(e, searchText, dataList, setSearchDataList) }}>搜尋</button>
                    </div>
                </div>
            </nav>
        </>
    );
}


export default Navbar;

interface ItemData{
    _id:string,
    name:string
    in_stock:number,
  
  }

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function handleSearch(e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>, searchText: string, dataList: ItemData[], setSearchDataList: (arg0: any) => void) {
    e.preventDefault()
    const filterData = dataList.filter((item) => {
        return item.name.includes(searchText.trim())
    })
    setSearchDataList(filterData)
    
}