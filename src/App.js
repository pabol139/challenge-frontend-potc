import "./App.css";
import "./pages/pages.css";

import PartnerTest from "./pages/Formulario";
import ErrorPage from "./pages/error-page";

import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  // Route,
  // Link,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "*",
    element: <Navigate to="partner_test" />,
    errorElement: <ErrorPage />,
  },
  {
    path: "partner_test",
    element: <PartnerTest />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
