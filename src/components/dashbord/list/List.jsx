import React from "react";
import "./styles.css";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import TrendingDownRoundedIcon from "@mui/icons-material/TrendingDownRounded";
import { Tooltip } from "@mui/material";
import { convertNumbers } from "../../../functions/convertnumbers";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { add, remove } from "../../../app/watchListSlice";
import { toast } from "react-toastify";
import StarsOutlinedIcon from "@mui/icons-material/StarsOutlined";
import StarsIcon from "@mui/icons-material/Stars";

const List = ({ coin }) => {
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
      <tr className="list-row">
        <Tooltip title="Coin logo">
          <td className="td-img">
            <img src={coin.image} className="coin-logo" />
          </td>
        </Tooltip>
        <td>
          <div className="name-col">
            <p className="coin-symbol">{coin.symbol}</p>
            <p className="coin-name">{coin.name}</p>
          </div>
        </td>
        {coin.price_change_percentage_24h > 0 ? (
          <Tooltip title="Price Change">
            <td className="chip-flex">
              <div className="price-chip">
                {coin.price_change_percentage_24h.toFixed(2)}%
              </div>
              <div className="icon-chip td-icon">
                <TrendingUpRoundedIcon />
              </div>
            </td>
          </Tooltip>
        ) : (
          <Tooltip title="Price Change">
            <td className="chip-flex">
              <div className="price-chip chip-red">
                {coin.price_change_percentage_24h.toFixed(2)}%
              </div>
              <div className="icon-chip chip-red td-icon">
                <TrendingDownRoundedIcon />
              </div>
            </td>
          </Tooltip>
        )}
        <Tooltip title="Currten Price">
          <td>
            <h3
              className="coin-price td-center-align"
              style={{
                color:
                  coin.price_change_percentage_24h < 0
                    ? "var(--red)"
                    : "var(--green)",
              }}
            >
              ${coin.current_price.toLocaleString()}
            </h3>
          </td>
        </Tooltip>
        <Tooltip title="Total Volume">
          <td>
            <p className=" total_volume td-right-align td-total-volume">
              ${coin.total_volume.toLocaleString()}
            </p>
          </td>
        </Tooltip>
        <Tooltip title="Market Cap">
          <td className="desktop-td-mkt">
            <p className="total_volume td-right-align ">
              ${coin.market_cap.toLocaleString()}
            </p>
          </td>
        </Tooltip>
        <Tooltip title="Market Cap">
          <td className="mobile-td-mkt">
            <p className="total_volume td-right-align ">
              ${convertNumbers(coin.market_cap)}
            </p>
          </td>
        </Tooltip>
        <div className="fav-icon-list" onClick={handleFav}>
          {currentObj.id == coin.id ? (
            <StarsIcon style={{ color: "var(--green)" }} />
          ) : (
            <StarsOutlinedIcon />
          )}
        </div>
      </tr>
    </Link>
  );
};

export default List;
