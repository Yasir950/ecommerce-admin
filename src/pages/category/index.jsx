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
import AddCategory from "./addCat";
import { useDispatch, useSelector } from "react-redux";
import { changeForm, clearData, updatedData } from "redux/slices/userSlice";
import { ReactTable } from "misc/ReactTable";
import { DeleteIcon, EditIcon } from "assets/images/users/Svg";
import { toast } from "react-toastify";
// import ChatWidget from "pages/chat";

// ===============================|| COMPONENT - COLOR ||=============================== //

function createData(id, name, description) {
  return {
    id,
    name,
    description,
  };
}
export default function CategoryComp() {
  const headCells = [
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
      name: "Description",
      selector: (row) => row.description,
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

  const handleEdit = (row) => {
    dispatch(updatedData(row));
  };

  const handleDelete = async (id) => {
    let res = await deleteItem("categories", id);
    console.log(res);
    if (res._id) {
      getUsers();
      toast.error("user deleted successfully");
    }
  };
  const isAddForm = useSelector((state) => state.user.isAddForm);
  const [state, setState] = useState({
    userData: [],
  });
  useEffect(() => {
    getUsers();
    return () => {};
  }, []);
  const getUsers = async () => {
    let res = await getUsersData("categories");

    const rowsData = res.map((item) =>
      createData(item._id, item.name, item.description)
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
        <AddCategory closeForm={handleAddOpen} getUser={getUsers} />
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
              Categories
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
                  <RightOutlined /> Categories
                </Typography>
              </Breadcrumbs>
            </Typography>
            <AddBtn onClick={handleAddOpen}>
              <PlusOutlined style={{ margin: 5 }} /> Add Category
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
                name={"Categories"}
                pending={pending}
              />
              {/* <MuiTable name={'Categories'} column={headCells} rows={state.userData} url={'auth/users'} getUsers={getUsers}/> */}
            </MainCard>
          </Grid>
        </>
      )}
    </>
  );
}
