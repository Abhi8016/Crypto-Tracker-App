import React, { useState } from "react";
import "./styles.css";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import TrendingDownRoundedIcon from "@mui/icons-material/TrendingDownRounded";
import { Link } from "react-router-dom";
import StarsOutlinedIcon from "@mui/icons-material/StarsOutlined";
import StarsIcon from "@mui/icons-material/Stars";
import { useDispatch, useSelector } from "react-redux";
import { add, remove } from "../../../app/watchListSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Grid = ({ coin, i }) => {
  const dispatch = useDispatch();
  const myList = useSelector((state) => state.watchList);

  let currentObj = {};

  myList.forEach((e) => {
    if (e.id === coin?.id) {
      currentObj = { ...e };
    }
  });

  const handleFav = (e) => {
    e.preventDefault();
    if (currentObj.id === coin?.id) {
      dispatch(remove(coin?.id));
      toast.warning(
        `you have removed ${coin?.name || coin?.title} from Watch List`
      );
    } else {
      coin && dispatch(add({ ...coin }));
      toast.success(
        `you have added ${coin?.name || coin?.title} to Watch List`
      );
    }
  };

  return (
    <Link to={`/coin/${coin.id}`}>
      <div
        className={`grid-container ${
          coin.price_change_percentage_24h < 0 && "grid-container-red"
        }`}
      >
        <div className="fav-icon-flex">
          <div className="info-flex">
            <img src={coin.image} className="coin-logo" />
            <div className="name-col">
              <p className="coin-symbol">{coin.symbol}</p>
              <p className="coin-name">{coin.name}</p>
            </div>
          </div>
          
          <div className="fav-icon" onClick={handleFav}>
            {currentObj.id == coin.id ? <StarsIcon style={{color: "var(--green)"}}/> : <StarsOutlinedIcon />}
          </div>
        </div>
        {coin.price_change_percentage_24h > 0 ? (
          <div className="chip-flex">
            <div className="price-chip">
              {coin.price_change_percentage_24h.toFixed(2)}%
            </div>
            <div className="icon-chip">
              <TrendingUpRoundedIcon />
            </div>
          </div>
        ) : (
          <div className="chip-flex">
            <div className="price-chip chip-red">
              {coin.price_change_percentage_24h.toFixed(2)}%
            </div>
            <div className="icon-chip chip-red">
              <TrendingDownRoundedIcon />
            </div>
          </div>
        )}
        <div className="info-container">
          <h3
            className="coin-price"
            style={{
              color:
                coin.price_change_percentage_24h < 0
                  ? "var(--red)"
                  : "var(--green)",
            }}
          >
            ${coin.current_price.toLocaleString()}
          </h3>
          <p className=" total_volume">
            Total Volune : {coin.total_volume.toLocaleString()}
          </p>
          <p className=" total_volume">
            Market Cap : {coin.market_cap.toLocaleString()}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default Grid;
