import React, { useEffect, useState } from "react";
import Header from "../components/common/header/Header";
import TabsComponents from "../components/dashbord/tabs/TabsComponents";
import axios from "axios";
import Search from "../components/dashbord/search/Search";
import PaginationComponent from "../components/dashbord/pagination/PaginationComponent";
import Loader from "../components/common/loader/Loader";
import BackToTop from "../components/common/backToTop/BackToTop";
import { get100Coins } from "../functions/get100Coins";
import Footer from "../components/common/footer/Footer";
import Modal from "../components/common/modalComponent/modal/Modal";

const DashbordPage = () => {
  const [coins, setCoins] = useState([]);
  const [paginatedCoins, setPaginatedCoins] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [modalOpen, setModalopen] = useState(false);

  const close = () => setModalopen(false);

  const handlePageChange = (event, value) => {
    setPage(value);
    let previousIndex = (value - 1) * 10;
    setPaginatedCoins(coins.slice(previousIndex, previousIndex + 10));
  };

  const onSearchChange = (e) => {
    console.log(e.target.value);
    setSearch(e.target.value);
  };

  let filteredCoin = [];
  console.log(coins.length);
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const myCoins = await get100Coins();

    if (myCoins) {
      setCoins(myCoins);
      // clearTimeout(myTimeout);
      setPaginatedCoins(myCoins?.slice(0, 10));
      filteredCoin = coins.filter(
        (item) =>
          item?.name?.toLowerCase().includes(search.toLowerCase()) ||
          item?.symbol?.toLowerCase().includes(search.toLowerCase())
      );
      setIsLoading(false);
    } else {
      console.log(isLoading);
      console.log("error");
      setModalopen(true);
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
      <Header />
      <BackToTop />
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Search search={search} onSearchChange={onSearchChange} />
          {<TabsComponents coins={search ? filteredCoin : paginatedCoins} />}
          {!search && (
            <PaginationComponent
              page={page}
              handlePageChange={handlePageChange}
            />
          )}
        </div>
      )}
      <Footer />
    </>
  );
};

export default DashbordPage;
