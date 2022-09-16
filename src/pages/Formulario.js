import { useEffect, useState } from "react";
import CurrencyInput from "react-currency-input-field";

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

function Formulario() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState("");

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

  useEffect(() => {
    const url = new URLSearchParams(window.location.search);

    fetch(
      `https://api7.cloudframework.io/recruitment/fullstack/users?id=${url.get(
        "id"
      )}`,
      {
        method: "GET",
        headers: { "X-WEB-KEY": "development" },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setName(data.data.name);
        setSurname(data.data.surname);
        setEmail(data.data.email);
        setPhone(data.data.phone);
        setAge(data.data.age);
        console.log(data.data);
      })
      .catch((error) => console.error(error));
  }, []);

  /*const updateUserData = (event) => {
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
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  };*/

  return (
    <form className="row g-3">
      <h2>Datos del préstamo</h2>
      <div className="col-md-4">
        <label htmlFor="inputEmail4" className="form-label">
          Nombre
        </label>
        <input
          type="text"
          defaultValue={name}
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
          defaultValue={surname}
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
          defaultValue={email}
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
          defaultValue={phone}
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
          defaultValue={age}
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
        <label htmlFor="inputState" className="form-label">
          Fecha a conseguir <span>*</span>
        </label>
        <input type="date" className="form-control" id="inputZip" />
      </div>
      <div className="col-md-4">
        <label htmlFor="inputZip" className="form-label">
          Tiempo a devolver <span>*</span>
        </label>
        <select id="inputState" className="form-select">
          <option> Elige un valor</option>
          <option> 1 año</option>
          <option> 2 años</option>
          <option> 3 años</option>
          <option> 4 años</option>
          <option> 5 años</option>
          <option> 6 años</option>
        </select>
      </div>
      <div className="col-12">
        <div className="form-check">
          <input className="form-check-input" type="checkbox" id="gridCheck" />
          <label className="form-check-label" htmlFor="gridCheck">
            <span>*</span> Aceptar los{" "}
            <a href="https://cloudframework.io/terminos-y-condiciones/">
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

function PartnerTest() {
  return (
    <div className="App">
      <Formulario />
    </div>
  );
}

export default PartnerTest;
