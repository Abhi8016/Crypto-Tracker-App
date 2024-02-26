import React, { useEffect, useState } from "react";
import Header from "../components/common/header/Header";
import SelectCoins from "../components/compare/selectCoins/SelectCoins";
import SelectDays from "../components/coin/selectDays/SelectDays";
import { settingChartData } from "../functions/settingChartData";
import { getCoinData } from "../functions/getCoinData";
import { getCoinPrices } from "../functions/getCoinPrices";
import Loader from "../components/common/loader/Loader";
import { coinObject } from "../functions/convertObject";
import List from "../components/dashbord/list/List";
import CoinInfo from "../components/coin/coinInfo/CoinInfo";
import LineChart from "../components/coin/lineChart/LineChart";
import PriceType from "../components/coin/priceType/PriceType";
import Footer from "../components/common/footer/Footer";
import { get100Coins } from "../functions/get100Coins";
import Modal from "../components/common/modalComponent/modal/Modal";

const ComparePage = () => {
  const [crypto1, setCrypto1] = useState("bitcoin");
  const [crypto2, setCrypto2] = useState("ethereum");

  const [crypto1Data, setCrypto1Data] = useState({});
  const [crypto2Data, setCrypto2Data] = useState({});

  const [days, setDays] = useState(30);

  const [isLoading, setIsLoading] = useState(true);

  const [allCoins, setAllCoins] = useState([]);

  const [priceType, setPriceType] = useState("prices");

  const [chartData, setChartData] = useState({});

  const [modalOpen, setModalopen] = useState(false);

  const close = () => setModalopen(false);

  useEffect(() => {
    getData();
  }, []);
  //////////////////////////////////////////////////////////////////////////////////TODO
  async function getData() {
    setIsLoading(true);
    const coins = await get100Coins();
    if (coins) {
      setAllCoins(coins);
      const data1 = await getCoinData(crypto1);
      const data2 = await getCoinData(crypto2);
      coinObject(setCrypto1Data, data1);
      coinObject(setCrypto2Data, data2);
      if (data1 && data2) {
        const prices1 = await getCoinPrices(crypto1, days, priceType);
        const prices2 = await getCoinPrices(crypto2, days, priceType);
        settingChartData(setChartData, prices1, prices2, crypto1, crypto2);
        setIsLoading(false);
      }
    } else {
      console.log(isLoading);
      console.log("error");
      setModalopen(true);
    }
  }

  async function handleDaysChange(e) {
    setIsLoading(true);
    setDays(e.target.value);
    const prices1 = await getCoinPrices(crypto1, e.target.value, priceType);
    const prices2 = await getCoinPrices(crypto2, e.target.value, priceType);
    if (prices1 && prices2) {
      settingChartData(setChartData, prices1, prices2, crypto1, crypto2);
      setIsLoading(false);
    } else {
      console.log(isLoading);
      console.log("error");
      setModalopen(true);
    }
  }

  const handlePriceTypeChange = async (event) => {
    const newType = event.target.value;
    setIsLoading(true);
    setPriceType(newType);
    const prices1 = await getCoinPrices(crypto1, days, newType);
    const prices2 = await getCoinPrices(crypto2, days, newType);
    if (prices1 && prices2) {
      settingChartData(setChartData, prices1, prices2, crypto1, crypto2);
      setIsLoading(false);
    } else {
      console.log(isLoading);
      console.log("error");
      setModalopen(true);
    }
  };

  const handleCoinChange = async (event, isCoin2) => {
    setIsLoading(true);
    if (isCoin2) {
      setCrypto2(event.target.value);
      const data2 = await getCoinData(event.target.value);
      if (data2) {
        coinObject(setCrypto2Data, data2);
        const prices1 = await getCoinPrices(crypto1, days, priceType);
        const prices2 = await getCoinPrices(
          event.target.value,
          days,
          priceType
        );
        settingChartData(setChartData, prices1, prices2, crypto1, crypto2);
      }
      setIsLoading(false);
    } else {
      setCrypto1(event.target.value);
      const data1 = await getCoinData(event.target.value);
      if (data1) {
        coinObject(setCrypto1Data, data1);
        const prices1 = await getCoinPrices(
          event.target.value,
          days,
          priceType
        );
        const prices2 = await getCoinPrices(crypto2, days, priceType);
        settingChartData(setChartData, prices1, prices2, crypto1, crypto2);
      }
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
        {isLoading || !crypto1Data?.id || !crypto2Data?.id ? (
          <Loader />
        ) : (
          <>
            <div className="coins-days-flex">
              <SelectCoins
                crypto1={crypto1}
                crypto2={crypto2}
                handleCoinChange={handleCoinChange}
                allCoins={allCoins}
              />

              <SelectDays
                days={days}
                handleDaysChange={handleDaysChange}
                noPTag={true}
              />
            </div>

            <div className="grey-wrapper">
              <List coin={crypto1Data} />
            </div>
            <div className="grey-wrapper">
              <List coin={crypto2Data} />
            </div>
            <div className="grey-wrapper">
              <PriceType
                priceType={priceType}
                handlePriceTypeChange={handlePriceTypeChange}
              />
              <LineChart
                chartData={chartData}
                priceType={priceType}
                multiAxis={true}
              />
            </div>

            <CoinInfo heading={crypto1Data.name} desc={crypto1Data.desc} />
            <CoinInfo heading={crypto2Data.name} desc={crypto2Data.desc} />
          </>
        )}
        <Footer />
      </div>
    </>
  );
};

export default ComparePage;
