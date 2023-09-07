import React from "react";
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import SaveNews from "./AllPages/SaveNews";
import MainLayout from "./MainLayout";
import MainPage from "./AllPages/MainPage";

const router = createBrowserRouter([
  
      {
        index: true,
        element: <MainPage />,
      },
   
  {
    path: 'save', 
    element: <MainLayout />, 
    children: [
      {
        index: true,
        element: <SaveNews />,
      },
    ],
  },
]);

const Pages = ({ onSearch }) => {
  return <RouterProvider router={router} onSearch={onSearch} />;
};

export default Pages;


