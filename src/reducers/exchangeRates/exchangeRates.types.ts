export interface ExchangeRatesActionType {
    type: string;
    payload: Record<string, number>;
}

 export interface ExchangeRatesLoadingType {
     type: string;
     payload: Record<string, number>;
 }

 export interface RatesType {
     [key: string]: number
 }

 export interface InitialStateType {
     rates:  RatesType;
     isLoading:boolean
 }
