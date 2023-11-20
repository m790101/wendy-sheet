
import { Outlet } from "react-router-dom"
import { AppLayout } from "../layout/AppLayout"

export default function HomeLayout() {
  return (
    <AppLayout isAuthRequired={true}>
      {/* child route page */}
      <Outlet />
    </AppLayout>
  )
}