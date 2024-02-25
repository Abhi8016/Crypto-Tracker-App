import axios from "axios";

export const getCoinPrices = (id, days, priceType) => {
  const prices = axios
    .get(
      `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${days}&interval=daily`,
      { crossDomain: true }
    )
    .then((responce) => {
      // console.log(responce.data.prices);
      return responce.data[priceType];
    })
    .catch((error) => {
      console.log(error.message);
      // return error.message;
    });
  return prices;
};
