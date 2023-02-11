import {Directions} from "./ExchangeRateTable.constants";

export const sortTableData = (array: string[], direction: Directions) => {
    return array.sort((a, b) => {
        if (a < b) return direction === Directions.ASCENDING ? -1 : 1;
        if (a > b) return direction === Directions.ASCENDING ? 1 : -1;
        return 0;
    });
};