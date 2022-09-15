import "./App.css";

import PartnerTest from "./pages/partner_test";
import ErrorPage from "./pages/error-page";

import {
  createBrowserRouter,
  RouterProvider,
  // Route,
  // Link,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ErrorPage />,
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
