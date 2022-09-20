import CurrencyInput from "react-currency-input-field";

function FormCurrencyInput(props) {
  const { intlConfig, onChange, onSelect, value, errors, options } = props;

  return (
    <div className="col-md-4 loan_amount">
      <label htmlFor="inputCity" className="form-label">
        Préstamo <span>*</span>
      </label>
      <div className="input-group mb-3">
        <CurrencyInput
          id="validationCustom04"
          name="loan_amount"
          intlConfig={intlConfig}
          className={`form-control  ${errors ? "error-input" : ""}`}
          onValueChange={onChange}
          allowDecimals={false}
          placeholder="Cantidad..."
          value={value}
          step={1}
        />
        <select
          className={`btn btn-outline-secondary dropdown-toggle ${
            errors ? "error-input" : ""
          }`}
          id="intlConfigSelect"
          onChange={onSelect}
        >
          {options.map((config, i) => {
            if (config) {
              const { locale, currency, symbol } = config;
              return (
                <option key={`${locale}${currency}`} value={i}>
                  {symbol}
                </option>
              );
            }
            return null;
          })}
        </select>
      </div>
      <span className="errorMessage">{errors}</span>
    </div>
  );
}

export default FormCurrencyInput;
