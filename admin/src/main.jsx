import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './components/Home.jsx';
import Orders from './components/Orders.jsx';
import Product from './components/Products.jsx';
import Admin from './components/Admin.jsx';


const router = createBrowserRouter([
  {
    path:"/",
    element:<Home/>
  },
  {
    path:"orders",
    element:<Orders/>
  },
  {
    path:"products",
    element:<Product/>
  },
  {
    path:"admin",
    element:<Admin/>
  },
])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
