import { PropsWithChildren } from "react"
import { useLocation, Navigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectIsLogin } from "../store/appSlice"

interface IProps {
    isAuthRequired?: boolean
}

export const AppLayout =({
    isAuthRequired,
    children,
}: PropsWithChildren<IProps>) => {
    const isLogin = useSelector(selectIsLogin)
    const location = useLocation()

    // 處理未登入時，導向登入頁面
    if (isAuthRequired && !isLogin) {
        let currentPath = location.pathname
        currentPath =
            currentPath.indexOf("/") === 0 ? currentPath.slice(1) : currentPath

        return <Navigate to={`/login?redirect_url=${currentPath}`} />
    }

    return (
        <div className="layout">
            {children}
        </div>
    )
}

