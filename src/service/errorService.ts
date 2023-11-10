import { showMsgBox } from "../utils/helpers/msgHelper";


const errorService = {

    /**
     * 顯示錯誤訊息
     * @param data 錯誤訊息參數
     */
    showErrorMsg: (message:string) =>
        showMsgBox({
        content: message,
        titleImg: "error",
        title: "錯誤訊息",
        mainBtn: { label: "我知道了" },
        }),
    

}



  export default errorService;