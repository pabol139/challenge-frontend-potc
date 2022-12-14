function FormInput(props) {
  const {
    containerClassName,
    size,
    htmlfor,
    id,
    label,
    type,
    name,
    inputClassName,
    defaultValue,
    onChange,
    errors,
    disabled,
  } = props;

  return (
    <div className={`col-md-${size} ${containerClassName}`}>
      <label htmlFor={htmlfor} className="form-label">
        {label}
      </label>
      <input
        type={type}
        defaultValue={defaultValue}
        onChange={onChange}
        disabled={disabled}
        id={id}
        name={name}
        className={inputClassName}
      />
      <span className="errorMessage">{errors}</span>
    </div>
  );
}

export default FormInput;
