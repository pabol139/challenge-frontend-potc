import { useEffect } from "react";

function callApi(url) {
  const response = fetch(
    `https://api7.cloudframework.io/recruitment/fullstack/users?id=${url.get(
      "id"
    )}`,
    {
      method: "GET",
      headers: { "X-WEB-KEY": "development" },
    }
  )
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.error(error));
}

function PartnerTest() {
  const url = new URLSearchParams(window.location.search);

  const response = callApi(url);

  console.log(response);

  useEffect(() => {
    callApi(url);
  }, []);

  return (
    <div className="App">
      {" "}
      SUUU {}
      <p>pepe</p>
    </div>
  );
}

export default PartnerTest;