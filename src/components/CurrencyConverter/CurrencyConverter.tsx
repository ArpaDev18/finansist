import React from "react";
import {useAppDispatch, useAppSelector} from "../../hooks";
import Box from "@mui/material/Box";
import {RootState} from "../../store";
// @ts-ignore
import styles from './CurrencyConverter.module.css'
import {CURRECIES} from "./CurrencyConverter.constants";
import {convertAPI} from "../../api";
import {setConvertedData, setLoading} from "../../reducers/convert/convert.actions";

export const CurrencyConverter = () => {
    const [from, setFrom] = React.useState("USD");
    const [to, setTo] = React.useState("USD");
    const [amount, setAmount] = React.useState("");

    const dispatch = useAppDispatch();

    const {result, isLoading} = useAppSelector(
        (state: RootState) => state.convert
    );

    const handleConvert = async () => {
        dispatch(setLoading(true))
        try {
            const data = await convertAPI
                .getConvert(to, from, amount)
                .then((res) => res.data);
            dispatch(setConvertedData(data.result));
        } catch (e) {
            console.error(e)
        } finally {
            dispatch(setLoading(false))
        }

    }

    return (<div className={styles.container}>
            <div className={styles.inputs}>
                <div>
                    <label htmlFor='from'>From</label>
                    <select id='from' onChange={(e) => setFrom(e.target.value)} value={from}>
                        {CURRECIES.map(({id, currency}) => {
                            return <option key={id} value={currency}>{currency}</option>
                        })}
                    </select>
                </div>
                <div>
                    <label htmlFor='to'>From</label>
                    <select id='to' onChange={(e) => setTo(e.target.value)} value={to}>
                        {CURRECIES.map(({id, currency}) => {
                            return <option key={id} value={currency}>{currency}</option>
                        })}
                    </select>
                </div>
                <div>
                    <input onChange={(e) => setAmount(e.target.value)} type='number' value={amount}/>
                </div>
                {isLoading && <div>Loading ...</div>}
                {result && <Box><h2>RESULT: {result} {to}</h2></Box>}
                <button onClick={handleConvert} disabled={!amount}>CONVERT</button>
            </div>
        </div>
    );
};
