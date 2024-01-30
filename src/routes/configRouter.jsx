import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import OrderPage from "../pages/OrderPage/OrderPage";
import ProductPage from "../pages/ProductPage/ProductPage";
import LoginPage from "../pages/LoginPage/LoginPage";
import SignupPage from "../pages/SignupPage/SignupPage";
import ProfilePage from "../pages/ProfilePage/ProfilePage";
import Profile from "../pages/ProfilePage/Profile";
import Order from "../pages/ProfilePage/Order";
import PetAdopt from "../pages/ProfilePage/PetAdopt";
import PetAdoptRequire from "../pages/ProfilePage/PetAdoptRequire";
import UpdateProfile from "../pages/ProfilePage/UpdateProfile";

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
  {
    path: "/profilepage",
    element: <ProfilePage />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "order",
        element: <Order />,
      },
      {
        path: "petadopt",
        element: <PetAdopt />,
      },
      {
        path: "petrequire",
        element: <PetAdoptRequire />,
      },
      {
        path: "updateprofile",
        element: <UpdateProfile />,
      },
    ],
  },
]);
export default router;
