function FormCheckInput(props) {
  const { size, htmlfor, id, label, name, onChange, errors, disabled } = props;

  return (
    <div className={`col-${size}`}>
      <div className="form-check">
        <input
          className="form-check-input"
          name={name}
          onChange={onChange}
          type="checkbox"
          id={id}
          disabled={disabled}
        />
        <label className="form-check-label" htmlFor={htmlfor}>
          {label}
        </label>
      </div>
      <p className="errorContainer">
        <span className="errorMessage">{errors}</span>
      </p>
    </div>
  );
}

export default FormCheckInput;
