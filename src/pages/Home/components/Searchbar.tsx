import { useState } from "react";

const Navbar = ({ dataList, setsearchDataList }) => {
    const [searchText, setSearchText] = useState('')

    return (
        <>
            <nav className="mb-3">
                <div className="">
                    <div className="d-flex flex-column gap-2">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={(e) => { setSearchText(e.target.value) }} />
                        <button className="btn btn-outline-success" type="submit" onClick={(e) => { handleSearch(e, searchText, dataList, setsearchDataList) }}>Search</button>
                    </div>
                </div>
            </nav>
        </>
    );
}


export default Navbar;



function handleSearch(e, searchText, dataList, setsearchDataList) {
    e.preventDefault()
    const filterData = dataList.filter((item) => {
        return item.name.includes(searchText.trim())
    })
    setsearchDataList(filterData)
    
}