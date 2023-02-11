import React, {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {RootState} from "../../store";
import {Directions, INITIAL_CURRENCIES} from "./ExchangeRateTable.constants";
import {sortTableData} from "./ExchangeRateTable.utils";
import {latestCurseAPI, ratesByDateAPI} from "../../api";
import {setLatestRatesData, setLatestRatesDataLoading} from "../../reducers/exchangeRates/exchangeRates.actions";
// @ts-ignore
import styles from "./ExchangeRateTable.module.css";

export const ExchangeRateTable = () => {
    const [currency, setCurrency] = useState<string>("USD");
    const [currencies, setCurrencies] = useState<string[]>(INITIAL_CURRENCIES);
    const [direction, setDirection] = useState<Directions>(Directions.DESCENDING);
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

    const dispatch = useAppDispatch();
    const {rates, isLoading} = useAppSelector(
        (state: RootState) => state.rates
    );

    useEffect(() => {
        (async () => {
            dispatch(setLatestRatesDataLoading(true))
            try {
                const data = await latestCurseAPI
                    .getLatestRates(undefined, currency)
                    .then((res) => res.data);
                dispatch(setLatestRatesData(data.rates));
            } catch (e) {
                console.error(e)
            } finally {
                dispatch(setLatestRatesDataLoading(false))
            }

        })()
    }, [currency, dispatch]);

    useEffect(() => {
        setCurrencies(sortTableData(currencies, direction));
    }, [direction, currencies]);

    const handleRequestOnDataChange = async (currentDate: string) => {
        dispatch(setLatestRatesDataLoading(true))
        try {
            const data = await ratesByDateAPI
                .getRatesByDate(currentDate)
                .then((res) => res.data);
            dispatch(setLatestRatesData(data.rates));
        } catch (e) {
            console.error(e)
        } finally {
            dispatch(setLatestRatesDataLoading(false))
        }

    }

    const dateChangeHandler =
        (newDate: any) => {
            if (newDate) {
                const parsedDate = Date.parse(newDate.target.value)
                setDate(newDate.target.value);
                const dated = new Date(parsedDate);
                const day = dated.getUTCDate();
                const month = dated.getUTCMonth() + 1; //months from 1-12
                const year = dated.getUTCFullYear();

                const currentDate = `${year}-${month < 10 ? "0" + month : month}-${
                    day < 10 ? "0" + day : day
                }`
                handleRequestOnDataChange(currentDate)
            }
        };

    const handleConvert = () => {
        setDirection(direction === Directions.DESCENDING ? Directions.ASCENDING : Directions.DESCENDING)
    }

    return (
        <div className={styles.container}>
            <div className={styles.inputs}>
                <div>
                    <input type='date' onChange={dateChangeHandler} value={date}/>
                </div>
                <div>
                    <label htmlFor='to'>From</label>
                    <select id='to' onChange={(e) => setCurrency(e.target.value)} value={currency}>
                        {INITIAL_CURRENCIES.map((currency) => {
                            return <option key={currency} value={currency}>{currency}</option>
                        })}
                    </select>
                </div>
                <button onClick={handleConvert}>Sort by name</button>
                {isLoading && <div>Loading ...</div>}
                <table>
                    <tbody>
                    <tr className={styles.header}>
                        <td>Currency</td>
                        <td>Rate</td>
                    </tr>
                    {currencies.map((cur: string, i: number) => (
                        <tr key={cur} onClick={() => setCurrency(currencies[i])}>
                            <td onClick={()=>setCurrency(cur)} className={cur===currency&&styles.active}>
                                {cur}
                            </td>
                            <td>
                                {rates?.[cur] || ''}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
