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

function Formulario({ userData }) {
  console.log(userData);

  const [intlConfig, setIntlConfig] = useState(options[0]);
  const [value, setValue] = useState("");

  const handleOnValueChange = (value) => {
    setValue(value);

    console.log(value);
  };

  const handleIntlSelect = (event) => {
    const config = options[Number(event.target.value)];
    if (config) {
      console.log(config);
      setIntlConfig(config);
    }
  };

  const updateUserData = (event) => {
    event.preventDefault();

    const data = {
      phone: "34616161616",
      age: event.target.age.value,
      loan_amount: "90",
      loan_date: event.target.loan_date.value,
      loan_weeks: "16",
      check: event.target.check.checked,
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
            <p> <b>Nombre:</b> ${data.data.name}</p>
            <p> <b>Apellidos:</b> ${data.data.surname}</p>
            <p> <b>Email:</b> ${data.data.email}</p>
            <p> <b>Teléfono:</b> ${data.data.phone}</p>
            <p> <b>Edad:</b> ${data.data.age}</p>
            <p> <b>Préstamo:</b> ${data.data.loan_amount} </p>
            <p> <b>Fecha a conseguir:</b> ${data.data.name} </p>
            <p> <b>Tiempo a devolver:</b> ${data.data.loan_weeks} </p>`,
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
  };

  let content = [];

  for (let i = 1; i <= LOAN_WEEKS; i++) {
    content.push(<option key={i}>{i} años</option>);
  }

  return (
    <form className="row g-3" onSubmit={updateUserData}>
      <h2>Datos del préstamo</h2>
      <div className="col-md-4">
        <label htmlFor="inputEmail4" className="form-label">
          Nombre
        </label>
        <input
          type="text"
          defaultValue={userData.name}
          disabled
          name="name"
          className="form-control"
        />
      </div>
      <div className="col-md-4">
        <label htmlFor="inputPassword4" className="form-label">
          Apellidos
        </label>
        <input
          type="text"
          defaultValue={userData.surname}
          disabled
          name="surname"
          className="form-control"
          id="inputPassword4"
        />
      </div>
      <div className="col-md-4">
        <label htmlFor="inputPassword4" className="form-label">
          Email
        </label>
        <input
          type="mail"
          defaultValue={userData.email}
          disabled
          name="email"
          className="form-control"
          id="inputPassword4"
        />
      </div>
      <div className="col-md-6">
        <label htmlFor="inputAddress" className="form-label">
          Teléfono <span>*</span>
        </label>
        <input
          type="number"
          defaultValue={userData.phone}
          name="number"
          className="form-control"
          id="inputAddress"
          placeholder="1234 Main St"
        />
      </div>
      <div className="col-md-6">
        <label htmlFor="inputAddress2" className="form-label">
          Edad <span>*</span>
        </label>
        <input
          type="number"
          defaultValue={userData.age}
          min="18"
          max="140"
          name="age"
          className="form-control"
          id="inputAddress2"
          placeholder="Apartment, studio, or floor"
        />
      </div>

      <div className="col-md-4">
        <label htmlFor="inputCity" className="form-label">
          Préstamo <span>*</span>
        </label>
        <div className="input-group mb-3">
          <CurrencyInput
            id="validationCustom04"
            name="input-1"
            intlConfig={intlConfig}
            className={`form-control`}
            onValueChange={handleOnValueChange}
            allowDecimals={false}
            placeholder="Introduzca la cantidad..."
            value={value}
            step={1}
          />
          <select
            className="btn btn-outline-secondary dropdown-toggle"
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
      </div>
      <div className="col-md-4">
        <label htmlFor="inputZip" className="form-label">
          Fecha a conseguir <span>*</span>
        </label>
        <input
          type="date"
          name="loan_date"
          className="form-control"
          id="inputZip"
        />
      </div>
      <div className="col-md-4">
        <label htmlFor="inputState" className="form-label">
          Tiempo a devolver <span>*</span>
        </label>
        <select id="inputState" className="form-select">
          <option> Elige un valor</option>
          {content}
        </select>
      </div>
      <div className="col-12">
        <div className="form-check">
          <input
            className="form-check-input"
            name="check"
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
