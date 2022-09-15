import { useEffect, useState } from "react";

function Formulario() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState("");

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
    <div className="user-info">
      <h1>Información del usuario</h1>

      <form class="row g-3">
        <div class="col-md-4">
          <label for="inputEmail4" class="form-label">
            Nombre
          </label>
          <input
            type="text"
            value={name}
            disabled
            name="name"
            class="form-control"
          />
        </div>
        <div class="col-md-4">
          <label for="inputPassword4" class="form-label">
            Apellidos
          </label>
          <input
            type="text"
            value={surname}
            disabled
            name="surname"
            class="form-control"
            id="inputPassword4"
          />
        </div>
        <div class="col-md-4">
          <label for="inputPassword4" class="form-label">
            Email
          </label>
          <input
            type="mail"
            value={email}
            disabled
            name="email"
            class="form-control"
            id="inputPassword4"
          />
        </div>
        <div class="col-md-6">
          <label for="inputAddress" class="form-label">
            Teléfono
          </label>
          <input
            type="number"
            value={phone}
            name="number"
            class="form-control"
            id="inputAddress"
            placeholder="1234 Main St"
          />
        </div>
        <div class="col-md-6">
          <label for="inputAddress2" class="form-label">
            Edad
          </label>
          <input
            type="number"
            value={age}
            min="18"
            max="140"
            name="age"
            class="form-control"
            id="inputAddress2"
            placeholder="Apartment, studio, or floor"
          />
        </div>
        <div class="col-md-4">
          <label for="inputCity" class="form-label">
            Préstamo
          </label>
          <input
            type="number"
            min="11"
            max="1000"
            name="loan_amount"
            class="form-control"
            id="inputCity"
          />
        </div>
        <div class="col-md-4">
          <label for="inputState" class="form-label">
            Fecha a conseguir el préstamo
          </label>
          <select id="inputState" class="form-select">
            <option selected>Choose...</option>
            <option>...</option>
          </select>
        </div>
        <div class="col-md-4">
          <label for="inputZip" class="form-label">
            Tiempo a devolver
          </label>
          <input type="date" class="form-control" id="inputZip" />
        </div>
        <div class="col-12">
          <div class="form-check">
            <input class="form-check-input" type="checkbox" id="gridCheck" />
            <label class="form-check-label" for="gridCheck">
              Aceptar los términos.
            </label>
          </div>
        </div>
        <div class="col-12" id="submit-button">
          <button type="submit" class="btn btn-primary">
            Enviar
          </button>
        </div>
      </form>
    </div>

    /*<form>
      <h1>Información del usuario</h1>

      <label>
        Nombre
        <input type="text" value={name} disabled name="name" />
      </label>
      <label>
        Apellidos
        <input type="text" value={surname} disabled name="surname" />
      </label>
      <label>
        Email
        <input type="mail" value={email} disabled name="email" />
      </label>
      <label>
        Teléfono
        <input type="tel" name="number" />
      </label>
      <label>
        Edad
        <input type="number" min="18" max="140" name="age" />
      </label>
      <label>
        Préstamo
        <input type="number" min="11" max="1000" name="loan_amount" />
      </label>
      <label>
        Fecha a conseguir el préstamo
        <input type="date" name="loan_date" />
      </label>
      <label>
        Tiempo a devolver
        <input type="number" name="loan_weeks" />
      </label>
      <label>
        Aceptar los términos
        <input type="checkbox" name="check" />
      </label>

      <button>Enviar</button>
    </form>*/
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
