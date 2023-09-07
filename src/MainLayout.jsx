import React from "react";
import Header from "./AllPages/Header";
import { Outlet } from "react-router-dom";
import Footer from "./AllPages/Footer";

const MainLayout = ({ handleSearch, searchResult, news, setData, setInformation }) => {
  return (
    <>
      <Header handleSearch={handleSearch} />
      <Outlet />
      <Footer/>
    </>
  );
};


export default MainLayout;
