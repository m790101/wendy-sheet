
import { useDispatch } from "react-redux";
import { AnyAction, Dispatch } from "@reduxjs/toolkit";
import { updateLoginInfo } from "../../../store/appSlice";
import { NavigateFunction, useNavigate } from "react-router-dom";
import storage from "../../../utils/storage";





const LogoutBtn = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    return (
        <>
            <div>
                <button className="btn btn-success" onClick={() => { logout(dispatch, navigate) }}>登出</button>
            </div>
        </>
    );
}


export default LogoutBtn;



async function logout(dispatch: Dispatch<AnyAction>, navigate: NavigateFunction) {
    await storage.removeLocalStorage('ls')
    dispatch(updateLoginInfo({ isLogin: false }))
    navigate('/login')
}