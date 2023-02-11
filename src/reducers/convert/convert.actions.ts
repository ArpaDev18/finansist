import {SET_COVNERT, SET_LOADING} from "./convert.constants";

export const setConvertedData = (convertedData: number) => ({
    type: SET_COVNERT,
    payload: convertedData,
});

export const setLoading= (loading: boolean) => ({
    type: SET_LOADING,
    payload: loading,
});