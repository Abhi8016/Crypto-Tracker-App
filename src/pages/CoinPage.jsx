import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/common/header/Header";
import Loader from "../components/common/loader/Loader";
import { coinObject } from "../functions/convertObject";
import List from "../components/dashbord/list/List";
import CoinInfo from "../components/coin/coinInfo/CoinInfo";
import { getCoinData } from "../functions/getCoinData";
import { getCoinPrices } from "../functions/getCoinPrices";
import LineChart from "../components/coin/lineChart/LineChart";
import { convertDate } from "../functions/convertDate";
import SelectDays from "../components/coin/selectDays/SelectDays";
import { settingChartData } from "../functions/settingChartData";
import PriceType from "../components/coin/priceType/PriceType";
import Footer from "../components/common/footer/Footer";
import Modal from "../components/common/modalComponent/modal/Modal";

const CoinPage = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [coinData, setCoinData] = useState();
  const [days, setDays] = useState(120);
  const [chartData, setChartData] = useState({});
  const [priceType, setPriceType] = useState("prices");

  const [modalOpen, setModalopen] = useState(false);

  const close = () => setModalopen(false);

  useEffect(() => {
    if (id) {
      getData();
    }
  }, [id]);

  async function getData() {
    const data = await getCoinData(id);
    if (data) {
      coinObject(setCoinData, data);
      const prices = await getCoinPrices(id, days, priceType);
      if (prices.length > 0) {
        settingChartData(setChartData, prices);
        setIsLoading(false);
      } else {
      }
    } else {
      console.log(isLoading);
      console.log("error");
      setModalopen(true);
    }
  }
  //   const myTimeout = setTimeout(() => {
  //     if (coinData) {
  //       clearTimeout(myTimeout);
  //     } else {
  //       console.log("error");
  //     }
  //   }, 2);

  // const [days, setdays] = useState(30);

  const handleDaysChange = async (event) => {
    setIsLoading(true);
    setDays(event.target.value);
    const prices = await getCoinPrices(id, event.target.value, priceType);
    if (prices.length > 0) {
      settingChartData(setChartData, prices);
      setIsLoading(false);
    }
  };

  const handlePriceTypeChange = async (event) => {
    const newType = event.target.value;
    setIsLoading(true);
    setPriceType(newType);
    const prices = await getCoinPrices(id, days, newType);
    if (prices.length > 0) {
      settingChartData(setChartData, prices);
      setIsLoading(false);
    }
  };

  return (
    <>
      {modalOpen && (
        <Modal
          modalOpen={modalOpen}
          handleClose={close}
          title={"Error"}
          text1={"You've exceeded the Rate Limit or something wrong happend"}
          text2={"Try again after some time."}
        />
      )}
      <div>
        <Header />
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <div className="grey-wrapper">
              <List coin={coinData} />
            </div>
            <div className="grey-wrapper">
              <SelectDays days={days} handleDaysChange={handleDaysChange} />
              <PriceType
                priceType={priceType}
                handlePriceTypeChange={handlePriceTypeChange}
              />
              <LineChart chartData={chartData} priceType={priceType} />
            </div>
            <CoinInfo heading={coinData.name} desc={coinData.desc} />
          </>
        )}
        <Footer />
      </div>
    </>
  );
};

export default CoinPage;
