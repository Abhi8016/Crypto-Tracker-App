import axios from "axios";

export const getCoinPrices = (id, days) => {
  const prices = axios
    .get(
      `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${days}&interval=daily`
    )
    .then((responce) => {
      console.log(responce.data.prices);
      return responce.data.prices;
    })
    .catch((error) => {
      console.log(error);
    });
  return prices;
};
