import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import MainCard from "components/MainCard";
import { AddBtn } from "styled/styled";
import { useEffect, useState } from "react";
import { deleteItem, getUsersData } from "apiservices";
import {
  PlusOutlined,
  RightOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import { Breadcrumbs } from "@mui/material";
import AddProduct from "./addProduct";
import { useDispatch, useSelector } from "react-redux";
import { changeForm, clearData, updatedData } from "redux/slices/userSlice";
import { ReactTable } from "misc/ReactTable";
import { DeleteIcon, EditIcon } from "assets/images/users/Svg";
import { toast } from "react-toastify";
// import ChatWidget from "pages/chat";

// ===============================|| COMPONENT - COLOR ||=============================== //

function createData(id, name, description, price, discount, category, images) {
  return {
    id,
    name,
    description,
    price,
    category,
    discount,
    images,
  };
}
export default function ProductComp() {
  const headCells = [
    {
      name: "Photo",

      cell: (row) => (
        <>
          <img
            src={row?.images.length !== 0 ? row?.images[0] : ""}
            alt="photo"
            width={"50"}
            height={"50"}
            style={{ borderRadius: "6px", border: "1px solid", margin: "10px" }}
          />
        </>
      ),
      sortable: true,
      style: {
        fontSize: "14px",
        fontWeight: 400,
        color: "#667085",
        width: "500px",
        // override the row height
      },
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
      style: {
        fontSize: "14px",
        fontWeight: 400,
        color: "#667085",
        // override the row height
      },
    },
    {
      name: "Category",
      selector: (row) => getCategory(row.category),
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
      name: "discount",
      selector: (row) => row.discount,
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
            onClick={() => handleDelete(row.id)}
            style={{ background: "none", border: "0px" }}
          >
            <DeleteIcon />
          </button>
          <button
            className="cursor-pointer"
            onClick={() => handleEdit(row)}
            style={{ background: "none", border: "0px" }}
          >
            <EditIcon />
          </button>
        </>
      ), // Use `cell` instead of `selector` for rendering JSX
    },
  ];
  const [pending, setPending] = useState(true);
  const dispatch = useDispatch();
  const isAddForm = useSelector((state) => state.user.isAddForm);
  const [state, setState] = useState({
    userData: [],
    catsData: [],
  });

  const handleEdit = (row) => {
    dispatch(updatedData(row));
  };
  const getCategories = async (id) => {
    let res = await getUsersData("categories");
    setState((prev) => ({ ...prev, catsData: res }));
  };
  const getCategory = (id) => {
    const found = state.catsData.find((item) => item._id === id);
    return found ? found.name : "Unknown";
  };
  const handleDelete = async (id) => {
    let res = await deleteItem("products", id);
    if (res.data._id) {
      getUsers();
      toast.error("user deleted successfully");
    }
  };
  useEffect(() => {
    getUsers();
    getCategories();
    return () => {};
  }, []);
  const getUsers = async () => {
    let res = await getUsersData("products");
    const rowsData = res.map((item) =>
      createData(
        item._id,
        item.name,
        item.description,
        item.price,
        item.discount,
        item.category,
        item.images
      )
    );
    setState((prev) => ({ ...prev, userData: rowsData }));
    setPending(false);
  };

  const handleAddOpen = () => {
    dispatch(changeForm());
    dispatch(clearData());
  };
  return (
    <>
      {isAddForm ? (
        <AddProduct
          closeForm={handleAddOpen}
          getUser={getUsers}
          catsData={state.catsData}
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
              Products
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
                  <RightOutlined /> Products
                </Typography>
              </Breadcrumbs>
            </Typography>
            <AddBtn onClick={handleAddOpen}>
              <PlusOutlined style={{ margin: 5 }} /> Add Product
            </AddBtn>
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
                rows={state.userData}
                name={"Products"}
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
