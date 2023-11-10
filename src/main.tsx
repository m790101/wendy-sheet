import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import "./assets/styles/index.scss"
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { RouterProvider } from 'react-router-dom'
import router from './router.tsx'
import { Provider } from 'react-redux';
import store from './store/store.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(

  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>

)
