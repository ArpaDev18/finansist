import {LATEST_RATES, LATEST_RATES_LOADING} from "./exchangeRates.constants";
import {ExchangeRatesActionType, ExchangeRatesLoadingType, InitialStateType} from "./exchangeRates.types";

const initialState:InitialStateType = {
    rates: {},
    isLoading: false
};

export const exchangeRates = (
    state = initialState,
    action: ExchangeRatesActionType | ExchangeRatesLoadingType
) => {
    switch (action.type) {
        case LATEST_RATES:
            return {...state, rates: action.payload};
        case LATEST_RATES_LOADING:
            return {...state, isLoading: action.payload};
        default:
            return state;
    }
};
