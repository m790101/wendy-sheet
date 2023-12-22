export interface IBaseReq<T> {
    header: {
      ctxSn: string
      txDate: string
      txId: string
    }
    body: T
  }
  
  export interface IBaseRes<T> {
    header: {
      ctxSn: string
      txDate: string
      txId: string
      returnCode: string
      returnMsg?: string
    }
    body: T
  }
  
  export class ApiError<T> {
    /** 中台回覆代碼 */
    returnCode: string
    /** 中台回覆訊息  */
    returnMsg: string
    /** 顯示於前端畫面中的錯誤訊息 */
    fullMsg: string
    errorParams?: T | null
  
    constructor(
      returnCode: string,
      returnMsg = "",
      errorParams: T | null = null
    ) {
      this.returnCode = returnCode
      this.returnMsg = returnMsg
      this.errorParams = errorParams
      this.fullMsg = `${returnCode}:${returnMsg}`
    }
  }