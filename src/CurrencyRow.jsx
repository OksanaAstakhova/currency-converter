import "./CurrencyRow.css";

export default function CurrencyRow(props) {
  const {
    currencyOptions,
    selectedCurrency,
    amount,
    onChangeCurrency,
    onChangeAmount,
  } = props;

  const value = typeof amount === "number" ? amount.toFixed(2) : amount || "";

  return (
    <div className="currency-row">
      <input
        type="number"
        className="amount-input"
        min={0}
        value={value}
        onChange={onChangeAmount}
      />
      <select value={selectedCurrency} onChange={onChangeCurrency}>
        {currencyOptions?.map((option) => (
          <option key={option.name} value={option.name}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
}
