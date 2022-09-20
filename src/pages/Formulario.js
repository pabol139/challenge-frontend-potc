import { useState } from "react";
import CurrencyInput from "react-currency-input-field";
import Swal from "sweetalert2";

const LOAN_WEEKS = 20;

const options = [
  {
    locale: "de-DE",
    currency: "EUR",
    symbol: "€",
  },
  {
    locale: "en-US",
    currency: "USD",
    symbol: "$",
  },
  {
    locale: "en-GB",
    currency: "GBP",
    symbol: "£",
  },
  {
    locale: "ja-JP",
    currency: "JPY",
    symbol: "¥",
  },
  {
    locale: "en-IN",
    currency: "INR",
    symbol: "₹",
  },
];

function padTo2Digits(num) {
  return num.toString().padStart(2, "0");
}

function formatDate(date) {
  return [
    date.getFullYear(),
    padTo2Digits(date.getMonth() + 1),
    padTo2Digits(date.getDate()),
  ].join("-");
}

/* Función para calcular la fecha mínima para hacer el préstamo*/
function calculateMinimumDate() {
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  return formatDate(tomorrow);
}

function Formulario({ userData }) {
  const [intlConfig, setIntlConfig] = useState(options[0]);
  const [errors, setErrors] = useState({});

  const [values, setValues] = useState({
    name: userData.name,
    surname: userData.surname,
    email: userData.email,
    phone: userData.phone,
    age: userData.age,
    loan_amount: "",
    loan_weeks: "",
    loan_date: "",
    check: "",
  });

  const onChange = (event) => {
    setValues({
      ...values,
      [event.target.name]:
        event.target.name === "check"
          ? event.target.checked
          : event.target.value,
    });
  };

  console.log(values);
  const handleOnValueChange = (value) => {
    setValues({ ...values, loan_amount: value });
  };

  const handleIntlSelect = (event) => {
    const config = options[Number(event.target.value)];
    if (config) {
      console.log(config);
      setIntlConfig(config);
    }
  };

  const validateForm = () => {
    const { phone, age, loan_amount, loan_date, loan_weeks, check } = values;
    const minDate = calculateMinimumDate();
    const errors = {};

    if (!phone || phone.length < 9)
      errors.phone = "Introduce un teléfono válido.";

    if (!age) errors.age = "Introduce tu edad.";
    else if (age < 18) errors.age = "Debes tener 18 años o más.";

    if (!loan_amount) errors.loan_amount = "Introduce una cantidad válida.";
    else if (loan_amount <= 10) errors.loan_amount = "Debe ser mayor a 10€";
    else if (loan_amount > 1000)
      errors.loan_amount = "Debe ser menor o igual a 1000€";

    if (!loan_date) errors.loan_date = "Introduce una fecha válida.";
    else if (minDate > loan_date) {
      errors.loan_date = "La fecha debe ser una fecha a futuro.";
    }
    if (!loan_weeks) errors.loan_weeks = "Introduce un tiempo válido.";
    if (!check) errors.check = "Por favor, acepta los términos y condiciones.";

    return errors;
  };

  const updateUserData = (event) => {
    event.preventDefault();

    const formErrors = validateForm();

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      const data = {
        phone: values.phone,
        age: values.age.toString(),
        loan_amount: values.loan_amount,
        loan_date: values.loan_date,
        loan_weeks: values.loan_weeks,
        check: values.check,
      };

      fetch(`https://api7.cloudframework.io/recruitment/fullstack/users/1`, {
        method: "POST",
        headers: { "X-WEB-KEY": "development" },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            Swal.fire({
              heightAuto: false,
              icon: "success",
              title: "Operación realizada con éxito",
              html: `
              <div>
              <p> <b>Nombre:</b> ${data.data.name}</p>
              <p> <b>Apellidos:</b> ${data.data.surname}</p>
              <p> <b>Email:</b> ${data.data.email}</p>
              <p> <b>Teléfono:</b> ${data.data.phone}</p>
              <p> <b>Edad:</b> ${data.data.age}</p>
              <p> <b>Préstamo:</b> ${data.data.loan_amount} </p>
              <p> <b>Fecha a conseguir:</b> ${values.loan_date} </p>
              <p> <b>Tiempo a devolver:</b> ${data.data.loan_weeks} año(s) </p>
              </div>`,
              footer: "Nos pondremos en contacto con usted lo antes posible.",
            }).then(function () {
              window.location.reload();
            });
          } else {
            Swal.fire({
              heightAuto: false,
              icon: "error",
              title: "No se puedo realizar la operación",
              text: "Por favor, inténtelo de nuevo o más tarde.",
            });
          }
          console.log(data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

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
    <form className="row g-3 needs-validation" onSubmit={updateUserData}>
      <h2>Datos del préstamo</h2>

      <div className="info-requirements">
        <h3>Requerimientos</h3>
        <ul>
          <li>Debes ser mayor de 18 años.</li>
          <li>
            Sólo se puede solicitar una cantidad mayor a 10€ e inferior o igual
            a 1000€.
          </li>
          <li>La fecha a conseguir solo puede ser una fecha a futuro.</li>
        </ul>
      </div>

      <div className="col-md-3">
        <label htmlFor="inputEmail4" className="form-label">
          Nombre
        </label>
        <input
          type="text"
          defaultValue={values.name}
          disabled
          name="name"
          className="form-control"
        />
      </div>
      <div className="col-md-3">
        <label htmlFor="inputPassword4" className="form-label">
          Apellidos
        </label>
        <input
          type="text"
          defaultValue={values.surname}
          disabled
          name="surname"
          className="form-control"
          id="inputPassword4"
        />
      </div>
      <div className="col-md-6">
        <label htmlFor="inputPassword4" className="form-label">
          Email
        </label>
        <input
          type="mail"
          defaultValue={values.email}
          disabled
          name="email"
          className="form-control"
          id="inputPassword4"
        />
      </div>
      <div className=" col-md-6">
        <label htmlFor="inputAddress" className="form-label">
          Teléfono <span>*</span>
        </label>
        <input
          type="number"
          onChange={onChange}
          defaultValue={values.phone}
          name="phone"
          className={`form-control  ${errors.phone ? "error-input" : ""}`}
          id="inputAddress"
        />
        <span className="errorMessage">{errors.phone}</span>
      </div>

      <div className="col-md-6 age">
        <label htmlFor="inputAddress2" className="form-label">
          Edad <span>*</span>
        </label>
        <input
          type="number"
          defaultValue={values.age}
          onChange={onChange}
          name="age"
          className={`form-control  ${errors.age ? "error-input" : ""}`}
          id="inputAddress2"
        />
        <span className="errorMessage">{errors.age}</span>
      </div>
      <div className="col-md-4 loan_amount">
        <label htmlFor="inputCity" className="form-label">
          Préstamo <span>*</span>
        </label>
        <div className="input-group mb-3">
          <CurrencyInput
            id="validationCustom04"
            name="loan_amount"
            intlConfig={intlConfig}
            className={`form-control  ${
              errors.loan_amount ? "error-input" : ""
            }`}
            onValueChange={handleOnValueChange}
            allowDecimals={false}
            placeholder="Cantidad..."
            value={values.loan_amount}
            step={1}
          />
          <select
            className={`btn btn-outline-secondary dropdown-toggle ${
              errors.loan_amount ? "error-input" : ""
            }`}
            id="intlConfigSelect"
            onChange={handleIntlSelect}
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
        <span className="errorMessage">{errors.loan_amount}</span>
      </div>
      <div className="col-md-4 loan_weeks">
        <label htmlFor="inputState" className="form-label">
          Tiempo a devolver <span>*</span>
        </label>
        <select
          onChange={onChange}
          id="inputState"
          className={`form-control  ${errors.loan_weeks ? "error-input" : ""}`}
          name="loan_weeks"
        >
          <option value={""}> Elige un valor</option>
          {content}
        </select>
        <span className="errorMessage">{errors.loan_weeks}</span>
      </div>
      <div className="col-md-4 loan_date">
        <label htmlFor="inputZip" className="form-label">
          Fecha a conseguir <span>*</span>
        </label>
        <input
          type="date"
          name="loan_date"
          className={`form-control  ${errors.loan_date ? "error-input" : ""}`}
          id="inputZip"
          onChange={onChange}
        />
        <span className="errorMessage">{errors.loan_date}</span>
      </div>

      <div className="col-12">
        <div className="form-check">
          <input
            className="form-check-input"
            name="check"
            onChange={onChange}
            type="checkbox"
            id="gridCheck"
          />
          <label className="form-check-label" htmlFor="gridCheck">
            <span>*</span> Aceptar los{" "}
            <a
              href="https://cloudframework.io/terminos-y-condiciones/"
              rel="noreferrer"
              target="_blank"
            >
              términos y condiciones.
            </a>
          </label>
        </div>
        <p className="errorContainer">
          <span className="errorMessage">{errors.check}</span>
        </p>
      </div>
      <div className="col-12" id="submit-button">
        <button type="submit" className="btn btn-primary">
          Enviar
        </button>
      </div>
    </form>
  );
}

export default Formulario;
