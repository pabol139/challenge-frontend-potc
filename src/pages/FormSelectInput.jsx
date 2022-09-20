const LOAN_WEEKS = 20;

function FormSelectInput(props) {
  const {
    containerClassName,
    size,
    htmlfor,
    id,
    label,
    name,
    inputClassName,
    defaultValue,
    onChange,
    errors,
    disabled,
  } = props;

  const content = [];

  for (let i = 1; i <= LOAN_WEEKS; i++) {
    let text = "años";
    if (i === 1) text = "año";

    content.push(
      <option value={i} key={i}>
        {i} {text}
      </option>
    );
  }

  return (
    <div className={`col-md-${size} ${containerClassName}`}>
      <label htmlFor={htmlfor} className="form-label">
        {label}
      </label>
      <select
        disabled={disabled}
        onChange={onChange}
        id={id}
        className={inputClassName}
        name={name}
      >
        <option value={""}> {defaultValue}</option>
        {content}
      </select>
      <span className="errorMessage">{errors}</span>
    </div>
  );
}

export default FormSelectInput;
