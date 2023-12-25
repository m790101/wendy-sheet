import { baseApiService } from "../baseApiService";


 const Api02 = baseApiService.injectEndpoints({
  endpoints: (builder) => ({
    getTypes: builder.mutation({
        query: () => ({
            url: "/type/allTypes",
            method: "post",
        })
    })
  }),
});



export default Api02;