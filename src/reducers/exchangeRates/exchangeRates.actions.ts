import {LATEST_RATES, LATEST_RATES_LOADING} from "./exchangeRates.constants";

 export const setLatestRatesData = (rates:Record<string, number> ) => ({
    type: LATEST_RATES,
    payload: rates,
});

export const setLatestRatesDataLoading = (loading:boolean ) => ({
    type: LATEST_RATES_LOADING,
    payload: loading,
});