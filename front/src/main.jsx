import React from 'react'
import ReactDOM from 'react-dom/client'
import {   RouterProvider,createBrowserRouter } from 'react-router-dom'
import Home from './page/Home.jsx'
import CreateRecete from './page/CreateRecete.jsx'
import App from './App.jsx'
import './index.css'


const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />, 
      },
      {
        path: "/nouvelle-recette",
        element: <CreateRecete />,
      }

    ]
  }
])



const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
