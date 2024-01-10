import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import OrderPage from "../pages/OrderPage/OrderPage";
import ProductPage from "../pages/ProductPage/ProductPage";
import LoginPage from "../pages/LoginPage/LoginPage";
import SignupPage from "../pages/SignupPage/SignupPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "productpage",
        element: <ProductPage />,
      },
      {
        path: "orderpage",
        element: <OrderPage />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
    errorElement: <ErrorPage />,
  },
]);
export default router;
