import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import constant from "../../constant/development";

const url = constant.apiUrl;


export const baseApiService = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: url,
  }),
  endpoints: () => ({}), // 會在 api 檔案中使用 injectEndpoints() 來注入 endpoints
  keepUnusedDataFor: 1, // (該值以秒為單位), 用來設定多久沒有被使用的資料會從 cache 中移除
})