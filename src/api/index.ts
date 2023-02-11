import axios from "axios";
import {INITIAL_CURRENCIES} from "../components/ExchangeRateTable/ExchangeRateTable.constants";

const instance = axios.create({
  baseURL: "https://api.apilayer.com/exchangerates_data/",
  headers: { apiKey: "1x37jDCWFCwGkAAm1aoS9ssQq90eldkA" },
});

export const convertAPI = {
  getConvert(to: string, from: string, amount: string) {
    return instance.get(`convert?to=${to}&from=${from}&amount=${amount}`);
  },
};

export const latestCurseAPI = {
  getLatestRates(symbols?: string[], base?: string) {
    return instance.get(
      `latest?symbols=${symbols ? symbols : INITIAL_CURRENCIES}&base=${
        base ? base : "USD"
      }`
    );
  },
};

export const ratesByDateAPI = {
  getRatesByDate(date: string, symbols?: string[], base?: string) {
    return instance.get(
      `${date}?symbols=${symbols ? symbols : INITIAL_CURRENCIES}&base=${
        base ? base : "USD"
      }`
    );
  },
};
