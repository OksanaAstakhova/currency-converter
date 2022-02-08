import "./Header.css";

export default function Header(props) {
  const { currencies } = props;

  return (
    <header className="header">
      <h1>Currency Converter</h1>
      <div className="currencies">
        {currencies?.map((currency) => (
          <span key={`${currency.name}Rate`}>
            <strong>{currency.name}</strong>: {currency.rate}
          </span>
        ))}
      </div>
    </header>
  );
}
