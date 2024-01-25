

interface NavbarProps {
    handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void
}



const Navbar = ({ handleSearch}: NavbarProps) => {
    const time = new Date().toLocaleString()

    return (
        <>
            <nav className=" position-fixed z-3 navbar d-flex p-3 ">
                <div className="search_section gap-1 flex-column">
                    <div className="d-flex">
                        <div className="d-flex gap-2">
                            <input  className="form-control me-2 " type="search" placeholder="搜尋" aria-label="Search" onChange={handleSearch} />
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


