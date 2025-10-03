import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import MainCard from "components/MainCard";
import { AddBtn } from "styled/styled";
import { useEffect, useState } from "react";
import { deleteItem, getUsersData } from "apiservices";
import { RightOutlined, ReloadOutlined } from "@ant-design/icons";
import { Breadcrumbs } from "@mui/material";
import ViewOrder from "./view";
import { useDispatch, useSelector } from "react-redux";
import { changeForm, clearData, updatedData } from "redux/slices/userSlice";
import { ReactTable } from "misc/ReactTable";
import { BulkIcon, EyeIcon } from "assets/images/users/Svg";
import { toast } from "react-toastify";
import ChangeStatus from "./changeStatus";
// import ChatWidget from "pages/chat";

// ===============================|| COMPONENT - COLOR ||=============================== //

function createData(id, product, user, quantity, price, status) {
  return {
    id,
    product,
    user,
    quantity,
    status,
    price,
  };
}
export default function OrderComp() {
  const headCells = [
    {
      name: "Order No",
      selector: (row) => row.id,
      sortable: true,
      style: {
        fontSize: "14px",
        fontWeight: 400,
        color: "#667085",
        // override the row height
      },
    },
    {
      name: "User",
      selector: (row) => getuserById(row.user),
      sortable: true,
      style: {
        fontSize: "14px",
        fontWeight: 400,
        color: "#667085",
        // override the row height
      },
    },

    {
      name: "Price",
      selector: (row) => row.price,
      sortable: true,
      style: {
        fontSize: "14px",
        fontWeight: 400,
        color: "#667085",
        // override the row height
      },
    },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
      style: {
        fontSize: "14px",
        fontWeight: 400,
        color: "#667085",
        // override the row height
      },
    },

    {
      name: "Actions",
      style: {
        fontSize: "14px",
        fontWeight: 400,
        color: "#667085",
        // override the row height
      },
      cell: (row) => (
        <>
          <button
            className="cursor-pointer"
            onClick={() => handleEdit(row)}
            style={{ background: "none", border: "0px" }}
          >
            <EyeIcon />
          </button>
          <button
            className="cursor-pointer"
            onClick={() => handleChange(row)}
            style={{
              background: "none",
              border: "0px",
              color: "#414246b2",
            }}
          >
            <ReloadOutlined />
          </button>
        </>
      ), // Use `cell` instead of `selector` for rendering JSX
    },
  ];
  const [pending, setPending] = useState(true);
  const [state, setState] = useState({
    orderData: [],
    productData: [],
    userData: [],
    changeStatus: false,
    rowData: {},
  });
  const dispatch = useDispatch();

  const handleEdit = (row) => {
    dispatch(updatedData(row));
  };

  const handleChange = (row) => {
    setState((prev) => ({
      ...prev,
      changeStatus: !prev.changeStatus,
      rowData: row,
    }));
  };
  const isAddForm = useSelector((state) => state.user.isAddForm);

  useEffect(() => {
    getProducts();
    getOrders();
    getUsers();
    return () => {};
  }, []);
  const getOrders = async () => {
    let res = await getUsersData("orders");
    const rowsData = res.map((item) =>
      createData(
        item._id,
        item.products,
        item.user,
        item.quantity,
        item.price,
        item.status
      )
    );
    setState((prev) => ({ ...prev, orderData: rowsData }));
    setPending(false);
  };
  const getProducts = async () => {
    let res = await getUsersData("products");
    setState((prev) => ({ ...prev, productData: res }));
    setPending(false);
  };
  const getUsers = async () => {
    let res = await getUsersData("users");
    setState((prev) => ({ ...prev, userData: res }));
    setPending(false);
  };
  const getuserById = (id) => {
    const found = state.userData.find((item) => item._id === id);
    return found ? found.first + found.last : "Unknown";
  };
  const handleAddOpen = () => {
    dispatch(changeForm());
    dispatch(clearData());
  };
  return (
    <>
      {isAddForm ? (
        <ViewOrder
          closeForm={handleAddOpen}
          getUser={getOrders}
          data={state.userData}
        />
      ) : state.changeStatus ? (
        <ChangeStatus
          closeForm={handleChange}
          getUser={getOrders}
          rowData={state.rowData}
        />
      ) : (
        <>
          {/* <ChatWidget /> */}
          <Stack
            justifyContent={"space-between"}
            flexDirection={{ xs: "column", sm: "row" }}
            alignItems={"center"}
          >
            <Typography
              sx={{ fontWeight: 600, fontSize: "30px", color: "#09090B" }}
            >
              Orders
              <Breadcrumbs aria-label="breadcrumb">
                <Typography sx={{ fontSize: "14px", fontWeight: 300 }}>
                  <span
                    style={{
                      color: "#000000",
                      fontSize: "14px",
                      fontWeight: 400,
                    }}
                  >
                    Dashboard
                  </span>{" "}
                  <RightOutlined /> Orders
                </Typography>
              </Breadcrumbs>
            </Typography>
          </Stack>
          <Grid item xs={12} md={12} lg={12}>
            <MainCard
              sx={{
                mt: 2,
                padding: "32px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
              content={false}
            >
              <ReactTable
                column={headCells}
                rows={state.orderData}
                name={"Orders"}
                pending={pending}
              />
              {/* <MuiTable name={'Users'} column={headCells} rows={state.userData} url={'auth/users'} getUsers={getUsers}/> */}
            </MainCard>
          </Grid>
        </>
      )}
    </>
  );
}
