import { useEffect, useState } from "react";
import "./App.css";
import Header from "./Header";
import CurrencyRow from "./CurrencyRow";

const currencyUrl =
  "https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json";

function App() {
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency, setToCurrency] = useState();
  const [exchangeRate, setExchangeRate] = useState();
  const [amount, setAmount] = useState(1);
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);

  const baseCurrency = { name: "UAH", rate: 1 };
  const currenciesNames = ["USD", "EUR"];

  let toAmount, fromAmount;

  if (amountInFromCurrency) {
    fromAmount = amount;
    toAmount = amount / exchangeRate;
  } else {
    toAmount = amount;
    fromAmount = amount * exchangeRate;
  }

  useEffect(async () => {
    try {
      const response = await fetch(currencyUrl);
      const data = await response.json();
      const currencies = data
        .filter(({ cc }) => currenciesNames.includes(cc))
        .map(({ cc, rate }) => ({ name: cc, rate }));
      setCurrencyOptions([baseCurrency, ...currencies]);
      setFromCurrency(baseCurrency.name);
      setToCurrency(currencies[0].name);
      setExchangeRate(currencies[0].rate);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    const fromRate = currencyOptions.find(
      (currency) => currency.name === fromCurrency
    )?.rate;
    const toRate = currencyOptions.find(
      (currency) => currency.name === toCurrency
    )?.rate;
    setExchangeRate(
      toRate / fromRate
    );
  }, [fromCurrency, toCurrency]);

  function handleFromAmountChange(e) {
    setAmount(e.target.value);
    setAmountInFromCurrency(true);
  }

  function handleToAmountChange(e) {
    setAmount(e.target.value);
    setAmountInFromCurrency(false);
  }

  function handleFromCurrencyChange(e) {
    setFromCurrency(e.target.value);
  }

  function handleToCurrencyChange(e) {
    setToCurrency(e.target.value);
  }

  return (
    <div className="App">
      <Header 
      currencies={currencyOptions.filter(currency => currency.name !== baseCurrency.name)}
      />
      <main className="main">
        <div className="converter">
          <CurrencyRow
            currencyOptions={currencyOptions}
            selectedCurrency={fromCurrency}
            amount={fromAmount}
            onChangeCurrency={handleFromCurrencyChange}
            onChangeAmount={handleFromAmountChange}
          />
          <span className="equals">=</span>
          <CurrencyRow
            currencyOptions={currencyOptions}
            selectedCurrency={toCurrency}
            amount={toAmount}
            onChangeCurrency={handleToCurrencyChange}
            onChangeAmount={handleToAmountChange}
          />
        </div>
      </main>
    </div>
  );
}

export default App;
