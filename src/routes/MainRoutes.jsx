import { lazy } from "react";

// project import
import Loadable from "components/Loadable";
import Dashboard from "layout/Dashboard";
import UsersComp from "pages/users";
import AddUser from "pages/users/AddUser";
import { Navigate } from "react-router";
import CategoryComp from "pages/category";
import AddCategory from "pages/category/addCat";
import ProductComp from "pages/product";
import AddProduct from "pages/product/addProduct";
import OrderComp from "pages/order";
import ViewOrder from "pages/order/view";

const DashboardDefault = Loadable(lazy(() => import("pages/dashboard/index")));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: "/",
  element: <Dashboard />,
  children: [
    {
      path: "/",
      element: <DashboardDefault />,
    },
    {
      path: "/dashboard",
      element: <DashboardDefault />,
    },
    {
      path: "users",
      element: <UsersComp />,
    },
    {
      path: "users/add",
      element: <AddUser />,
    },
    {
      path: "cats",
      element: <CategoryComp />,
    },
    {
      path: "cats/add",
      element: <AddCategory />,
    },
    {
      path: "products",
      element: <ProductComp />,
    },
    {
      path: "products/add",
      element: <AddProduct />,
    },
    {
      path: "orders",
      element: <OrderComp />,
    },
    {
      path: "orders/add",
      element: <ViewOrder />,
    },
    { path: "*", element: <Navigate to="/dashboard" /> },
  ],
};

export default MainRoutes;
