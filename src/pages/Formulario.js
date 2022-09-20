import { useState } from "react";
import FormCurrencyInput from "./FormCurrencyInput";
import Swal from "sweetalert2";
import FormInput from "./FormInput";
import FormSelectInput from "./FormSelectInput";
import FormCheckInput from "./FormCheckInput";

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

  const handleOnValueChange = (value) => {
    setValues({ ...values, loan_amount: value });
  };

  const handleIntlSelect = (event) => {
    const config = options[Number(event.target.value)];
    if (config) {
      setIntlConfig(config);
    }
  };

  const validateForm = () => {
    const { phone, age, loan_amount, loan_date, loan_weeks, check } = values;

    // Contamos los dígitos que tiene el año Ex: 2022 -> 4 dígitos
    const minDate = calculateMinimumDate();
    const errors = {};
    const yearDigits = loan_date.split("-")[0].length;

    const phoneValidator = new RegExp("^[0-9]{9,15}$");
    const ageValidator = new RegExp("^[0-9]{1,3}$");

    const phoneIsValid = phoneValidator.test(phone);
    const ageIsValid = ageValidator.test(age);

    // Validación teléfono
    if (!phoneIsValid) errors.phone = "Introduce un teléfono válido.";

    // Validación edad
    if (!ageIsValid || age > 140) errors.age = "Introduce una edad válida.";
    else if (age < 18) errors.age = "Debes tener 18 años o más.";

    // Validación cantidad del préstamo
    if (!loan_amount) errors.loan_amount = "Introduce una cantidad válida.";
    else if (loan_amount <= 10) errors.loan_amount = "Debe ser mayor a 10€";
    else if (loan_amount > 1000)
      errors.loan_amount = "Debe ser menor o igual a 1000€";

    // Validación fecha a conseguir
    if (!loan_date || yearDigits > 4)
      errors.loan_date = "Introduce una fecha válida.";
    else if (minDate > loan_date) {
      errors.loan_date = "La fecha debe ser una fecha a futuro.";
    }
    // Validación fecha a devolver
    if (!loan_weeks) errors.loan_weeks = "Introduce un tiempo válido.";

    // Validación check de terminos y condiciones
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
              <p> <b>Préstamo:</b> ${data.data.loan_amount} ${intlConfig.symbol} </p>
              <p> <b>Fecha a conseguir:</b> ${values.loan_date} </p>
              <p> <b>Tiempo a devolver:</b> ${data.data.loan_weeks} año(s) </p>
              </div>`,
              footer: `<b>Nos pondremos en contacto con usted lo antes posible.</b>`,
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
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  return (
    <form className="row g-3 needs-validation" onSubmit={updateUserData}>
      <h2>Datos del préstamo</h2>

      <div className="info-requirements">
        <h3>Requerimientos</h3>
        <ul>
          <li>Debes ser mayor de 18 años.</li>
          <li>
            Sólo se puede solicitar una cantidad mayor a 10 e inferior o igual a
            1000 en su respectiva moneda.
          </li>
          <li>La fecha a conseguir solo puede ser una fecha a futuro.</li>
        </ul>
      </div>

      <FormInput
        containerClassName={""}
        size={3}
        htmlfor={"inputPassword4"}
        id={"inputPassword4"}
        label={"Nombre"}
        type={"text"}
        name={"name"}
        defaultValue={values.name}
        onChange={""}
        errors={[]}
        disabled={true}
        inputClassName={`form-control`}
      />
      <FormInput
        containerClassName={""}
        size={3}
        htmlfor={"inputPassword4"}
        id={"inputPassword4"}
        label={"Apellidos"}
        type={"text"}
        name={"name"}
        defaultValue={values.surname}
        onChange={""}
        errors={[]}
        disabled={true}
        inputClassName={`form-control`}
      />
      <FormInput
        containerClassName={""}
        size={6}
        htmlfor={"inputPassword4"}
        id={"inputPassword4"}
        label={"Email"}
        type={"mail"}
        name={"email"}
        defaultValue={values.email}
        onChange={""}
        errors={[]}
        disabled={true}
        inputClassName={`form-control`}
      />
      <FormInput
        containerClassName={""}
        size={6}
        htmlfor={"inputAddress"}
        id={"inputAddress"}
        label={["Teléfono ", <span>*</span>]}
        type={"tel"}
        name={"phone"}
        defaultValue={values.phone}
        onChange={onChange}
        errors={errors.phone}
        disabled={false}
        inputClassName={`form-control  ${errors.phone ? "error-input" : ""}`}
      />
      <FormInput
        containerClassName={"age"}
        size={6}
        htmlfor={"inputAddress2"}
        id={"inputAddress2"}
        label={["Edad ", <span>*</span>]}
        type={"text"}
        name={"age"}
        defaultValue={values.age}
        onChange={onChange}
        errors={errors.age}
        disabled={false}
        inputClassName={`form-control  ${errors.age ? "error-input" : ""}`}
      />

      <FormCurrencyInput
        intlConfig={intlConfig}
        onChange={handleOnValueChange}
        onSelect={handleIntlSelect}
        value={values.loan_amount}
        errors={errors.loan_amount}
        options={options}
      />

      <FormSelectInput
        containerClassName={"loan_weeks"}
        size={4}
        htmlfor={"inputState"}
        id={"inputState"}
        label={["Tiempo a devolver ", <span>*</span>]}
        name={"loan_weeks"}
        defaultValue={"Elige una opción..."}
        onChange={onChange}
        errors={errors.loan_weeks}
        disabled={false}
        inputClassName={`form-control  ${
          errors.loan_weeks ? "error-input" : ""
        }`}
      />

      <FormInput
        containerClassName={"loan_date"}
        size={4}
        htmlfor={"inputZip"}
        id={"inputZip"}
        label={["Fecha a conseguir ", <span>*</span>]}
        type={"date"}
        name={"loan_date"}
        defaultValue={""}
        onChange={onChange}
        errors={errors.loan_date}
        disabled={false}
        inputClassName={`form-control  ${
          errors.loan_date ? "error-input" : ""
        }`}
      />

      <FormCheckInput
        size={12}
        htmlfor={"gridCheck"}
        id={"gridCheck"}
        label={[
          <span>*</span>,
          " Aceptar los ",
          <a
            href="https://cloudframework.io/terminos-y-condiciones/"
            rel="noreferrer"
            target="_blank"
          >
            términos y condiciones.
          </a>,
        ]}
        name={"check"}
        onChange={onChange}
        errors={errors.check}
        disabled={false}
        inputClassName={`form-control  ${errors.check ? "error-input" : ""}`}
      />

      <div className="col-12" id="submit-button">
        <button type="submit" className="btn btn-primary">
          Enviar
        </button>
      </div>
    </form>
  );
}

export default Formulario;
