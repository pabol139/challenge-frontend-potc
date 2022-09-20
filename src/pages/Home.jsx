import { useEffect, useState } from "react";
import Formulario from "./Formulario";
import Error from "./Error";
import { TailSpin } from "react-loader-spinner";

function Home() {
  const [validUrl, setValidUrl] = useState(<Error />);
  const [isBusy, setBusy] = useState(true);

  useEffect(() => {
    const url = new URLSearchParams(window.location.search);
    const id = url.get("id");

    if (id && id > 0 && id < 3) {
      fetch(
        `https://api7.cloudframework.io/recruitment/fullstack/users?id=${url.get(
          "id"
        )}`,
        {
          method: "GET",
          headers: { "X-WEB-KEY": "development" },
        }
      )
        .then((response) => {
          if (response.ok) {
            response.json().then((data) => {
              setValidUrl(<Formulario userData={data.data} />);
              setBusy(false);
            });
          }
        })
        .catch((error) => console.error(error));
    } else {
      setBusy(false);
    }
  }, []);

  return (
    <div className="App">
      {isBusy ? <TailSpin color="#0d6efd" /> : validUrl}
    </div>
  );
}

export default Home;
