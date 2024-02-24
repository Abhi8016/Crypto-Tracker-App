import React, { useEffect, useState } from "react";
import TabsComponents from "../components/dashbord/tabs/TabsComponents";
import { get100Coins } from "../functions/get100Coins";
import Header from "../components/common/header/Header";
import Loader from "../components/common/loader/Loader";
import { useSelector } from "react-redux";
import noRes from "../assets/no-results.png";
import { ToastContainer, toast } from "react-toastify";
import Footer from "../components/common/footer/Footer";

const WatchlistPage = () => {
  let myList = useSelector((state) => state.watchList);
  // console.log(myList.length);
  let flag = true;
  if (myList.length < 1) {
    flag = false;
  }
  return (
    <div>
      <Header />

      {flag ? (
        <>
          <TabsComponents coins={myList} />
        </>
      ) : (
        <div className="grey-wrapper-img">
          <img src={noRes} />
        </div>
      )}
      <Footer />
    </div>
  );
};

export default WatchlistPage;
