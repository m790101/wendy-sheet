import * as Yup from "yup"

// 新增客製化驗證後，要 yupSchemaExtended.ts 以及 yup.d.ts 加入 Schema

/**
 * 檢核數字的位數是否在範圍內
 * @param max 金額位數上限
 * @returns schema
 */
// export const maxDigitNumber = function (this: Yup.NumberSchema, max = 1) {
//   return this.test({
//     name: "maxDigitNumber",
//     exclusive: true,
//     params: { max },
//     message: t("__validation_maxDigitNumber", { max }),
//     test: (value) => {
//       if (value === undefined) return false
//       if (isNaN(value)) return false
//       return value < Math.pow(10, max)
//     },
//   })
// }

/**
 * 檢核數字需大於參數
 * @param min 數字下限
 * @param fieldName 欄位名稱 (optional) 如果有傳入，會顯示在錯誤訊息中
 * @param minFieldName 數字下限欄位名稱 (optional) 如果有傳入，會顯示在錯誤訊息中
 */
export const needMoreThanParam = function (
  this: Yup.NumberSchema,
  min: number,
  fieldName?: string,
  minFieldName?: string
) {
  return this.test({
    name: "needMoreThanParam",
    exclusive: true,
    params: { min, fieldName, minFieldName },
    message: `請輸入大於${minFieldName}的${fieldName}`,
    test: (value) => {
      if (value === undefined) return false
      if (isNaN(value)) return false
      return value >= min
    },
  })
}