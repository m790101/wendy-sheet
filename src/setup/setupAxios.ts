// import axios from "axios";
// // import { alterLoading } from "../store/loadSlice";
// import store from "../store/store";

// axios.interceptors.request.use(
//         (config) => {
//             store.dispatch(alterLoading(true));
//             return config;
//         },
//         (error) => {
//             store.dispatch(alterLoading(false));
//             return Promise.reject(error);
//         }
//     );
// axios.interceptors.response.use(
//         (response) => {
//             store.dispatch(alterLoading(false));
//             return response;
//         },
//         (error) => {
//             store.dispatch(alterLoading(false));
//             return Promise.reject(error);
//         }
//     );
// export default axios;