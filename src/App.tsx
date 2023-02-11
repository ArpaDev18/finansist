import React from "react";
import { CurrencyConverter } from "./components/CurrencyConverter/CurrencyConverter";
import { ExchangeRateTable } from "./components/ExchangeRateTable/ExchangeRateTable";
import { Provider } from "react-redux";
import store from "./store";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <CurrencyConverter />
        <ExchangeRateTable />
      </div>
    </Provider>
  );
}

export default App;
