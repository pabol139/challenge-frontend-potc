export default function Error() {
  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <h3>Has introducido una URL errónea.</h3>
      <p>
        <i>Por favor, introduce una URL válida:&nbsp;</i>
      </p>
      <p>
        <i>
          <b>
            {window.location.href}
            ?id=<span>número</span>
          </b>
        </i>
      </p>

      <p>
        <i>
          *El{" "}
          <b>
            <span>número</span>
          </b>{" "}
          debe ser 1 o 2.
        </i>
      </p>
    </div>
  );
}
