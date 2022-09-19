import "./App.css";
import "./pages/pages.css";

import Error from "./pages/Error";
import Home from "./pages/Home";

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
    errorElement: <Error />,
  },
  {
    path: "partner_test",
    element: <Home />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
