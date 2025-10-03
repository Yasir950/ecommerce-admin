// assets
import {
  DashboardOutlined,
  UsergroupAddOutlined,
  PieChartOutlined,
  CarOutlined,
  SettingOutlined,
  CodeSandboxOutlined,
  DollarOutlined,
  LineChartOutlined,
  WalletOutlined,
  AccountBookOutlined,
} from "@ant-design/icons";
import { DotIcon } from "assets/images/users/Svg";
// icons
const icons = {
  DashboardOutlined,
  UsergroupAddOutlined,
  PieChartOutlined,
  CarOutlined,
  CodeSandboxOutlined,
  DollarOutlined,
  LineChartOutlined,
  WalletOutlined,
  AccountBookOutlined,
  SettingOutlined,
  DotIcon,
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //
let user = JSON?.parse(localStorage.getItem("user"));
const AdminDashboard = {
  id: "group-dashboard",
  type: "group",
  children: [
    {
      id: "dashboard",
      title: "Dashboard",
      type: "item",
      url: "/dashboard",
      icon: icons.DashboardOutlined,
      breadcrumbs: true,
    },

    {
      id: "users",
      title: "Users",
      type: "item",
      url: "/users",
      icon: icons.UsergroupAddOutlined,
      breadcrumbs: true,
    },
    {
      id: "cats",
      title: "Categories",
      type: "item",
      url: "/cats",
      icon: icons.CodeSandboxOutlined,
      breadcrumbs: true,
    },
    {
      id: "products",
      title: "Product",
      type: "item",
      url: "/products",
      icon: icons.WalletOutlined,
      breadcrumbs: true,
    },
    {
      id: "orders",
      title: "Orders",
      type: "item",
      url: "/orders",
      icon: icons.CarOutlined,
      breadcrumbs: true,
    },
  ],
};
const dashboard = AdminDashboard;
export default dashboard;
