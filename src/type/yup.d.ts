// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { StringSchema } from "yup"

declare module "yup" {
  interface StringSchema<
    TType extends Maybe<string> = string | undefined,
    TContext extends AnyObject = AnyObject,
    TOut extends TType = TType
  > extends yup.BaseSchema<TType, TContext, TOut> {
    /**
     * 自訂檢核必填(去空白、null、undefined、空字串)
     * @param fieldName 欄位名稱 (optional) 如果有傳入，會顯示在錯誤訊息中
     */
    cusRequired(
      fieldName?: string,
      type?: string
    ): StringSchema<TType, TContext>

  }
}