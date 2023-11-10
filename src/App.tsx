import './App.css'
import { Outlet } from 'react-router-dom'
import { LoadingMask } from './layout/LoadingMask'
// import useAppSelector from "./utils/hooks/useAppSelector"
import { RootState } from './store/store';
import { useDispatch, useSelector } from 'react-redux';
import { MsgBox } from './component/MsgBox';
import { selectCurrentGlobalMsg, removeCurrentGlobalMsg } from './store/msgSlice';


function App() {
  const dispatch = useDispatch()
  const isLoading = useSelector((state:RootState) => state.loading.isLoading);
  const currentGlobalMsg = useSelector(selectCurrentGlobalMsg)

  return (
    <>
    {isLoading && <LoadingMask />}
    {/* 全域文字訊息彈跳視窗 */}
    {currentGlobalMsg && (
        <MsgBox
          {...currentGlobalMsg}
          isVisible
          onRequestClose={() => {
            dispatch(removeCurrentGlobalMsg())
          }}
        />
      )}
      <div id="detail">
        <Outlet />
      </div>

    </>
  )
}

export default App
