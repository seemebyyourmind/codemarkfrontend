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
// import ProductType from "../components/Products/ProductType";

import PetProduct from "../components/Products/PetProduct";
import StuffProduct from "../components/Products/StuffProduct";

import PetProductDetail from "../components/Products/PetProduct/PetProductDetail";
import StuffProductDetail from "../components/Products/StuffProduct/StuffProductDetail";
import AdminDashboard from "../pages/Admin/AdminDashboard";
import Dashboard from "../components/Admin/Dashboard";
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <ProductPage /> },
      {
        path: "productpage",
        element: <ProductPage />,
        children: [
          // { index: true, element: <ProductType /> },
          {
            path: "pet/:specieid/",
            element: <PetProduct />,
          },
          {
            path: "pet/:specieid/:id",
            element: <PetProduct />,
          },
          {
            path: "stuff/:catalogid/:id",
            element: <StuffProduct />,
          },
          {
            path: "stuff/:catalogid/",
            element: <StuffProduct />,
          },
        ],
      },
      {
        path: "orderpage",
        element: <OrderPage />,
      },
      {
        path: "petdetail/:id",
        element: <PetProductDetail />,
      },
      {
        path: "stuffdetail/:id",
        element: <StuffProductDetail />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminDashboard />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "dashboard", element: <Dashboard /> },
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
