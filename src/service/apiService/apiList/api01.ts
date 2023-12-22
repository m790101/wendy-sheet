import { GetItemsRes, IBaseRes } from "../../models/apiModel01";
import { baseApiService } from "../baseApiService";


 const Api01 = baseApiService.injectEndpoints({
  endpoints: (builder) => ({
    getItems: builder.mutation<IBaseRes<GetItemsRes[]>,void>({
        query: () => ({
            url: "/allItem",
            method: "get",
        })
    }),
    updateItem: builder.mutation({
        query: (req) => ({
            url: "/update",
            method: "post",
            body:req
        })
    }),
    deleteItems: builder.mutation({
        query: (req) => ({
            url: "/delete",
            method: "post",
            body:req
        })
    }),
    addItems: builder.mutation({
        query: (req) => ({
            url: "/add",
            method: "post",
            body:req
        })
    }),
  }),
});



export default Api01;
