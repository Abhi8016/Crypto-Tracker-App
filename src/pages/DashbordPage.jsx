import React, { useEffect, useState } from "react";
import Header from "../components/common/header/Header";
import TabsComponents from "../components/dashbord/tabs/TabsComponents";
import axios from "axios";
import Search from "../components/dashbord/search/Search";
import PaginationComponent from "../components/dashbord/pagination/PaginationComponent";
import Loader from "../components/common/loader/Loader";
import BackToTop from "../components/common/backToTop/BackToTop";

const DashbordPage = () => {
  const [coins, setCoins] = useState([]);
  const [paginatedCoins, setPaginatedCoins] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const handlePageChange = (event, value) => {
    setPage(value);
    let previousIndex = (value - 1) * 10;
    setPaginatedCoins(coins.slice(previousIndex, previousIndex + 10));
  };
  const onSearchChange = (e) => {
    console.log(e.target.value);
    setSearch(e.target.value);
  };

  let filteredCoin = coins.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.symbol.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=USD&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en"
      )
      .then((response) => {
        console.log(response);
        setCoins(response.data);
        setPaginatedCoins(response.data.slice(0, 10));
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        // setIsLoading(false);
      });
  }, []);
  return (
    <>
      <Header />
      <BackToTop />
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Search search={search} onSearchChange={onSearchChange} />
          <TabsComponents coins={search ? filteredCoin : paginatedCoins} />
          {!search && (
            <PaginationComponent
              page={page}
              handlePageChange={handlePageChange}
            />
          )}
        </div>
      )}
    </>
  );
};

export default DashbordPage;
