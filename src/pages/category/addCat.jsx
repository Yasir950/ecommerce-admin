import {
  EyeInvisibleOutlined,
  EyeOutlined,
  RightOutlined,
} from "@ant-design/icons";
import {
  Breadcrumbs,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
} from "@mui/material";
import { saveUserData, updateUserData } from "apiservices";
import MainCard from "components/MainCard";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { AddBtn } from "styled/styled";
function AddCategory({ closeForm, getUser }) {
  const updatedObj = useSelector((state) => state.user.updatedObj);
  const [showPassword, setShowPassword] = React.useState(false);
  const [file, setFile] = useState(null);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    if (updatedObj) {
      let res = await updateUserData("categories", data, updatedObj?.id);
      if (res._id) {
        toast.success("category updated successfully");
        getUser();
        closeForm();
      }
    } else {
      let res = await saveUserData("categories", data);
      if (res?._id) {
        toast.success("category saved successfully");
        getUser();
        closeForm();
      }
    }
  };
  useEffect(() => {
    if (updatedObj) {
      reset({
        name: updatedObj.name || "",
        description: updatedObj.description || "",
      });
    }
    return () => {};
  }, [updatedObj]);

  return (
    <>
      <Stack justifyContent={"space-between"} flexDirection={"row"}>
        <Typography
          sx={{ fontWeight: 600, fontSize: "30px", color: "#09090B" }}
        >
          Add Category
          <Breadcrumbs aria-label="breadcrumb">
            <Typography sx={{ fontSize: "14px", fontWeight: 300 }}>
              <span
                style={{ color: "#000000", fontSize: "14px", fontWeight: 400 }}
              >
                Categories
              </span>{" "}
              <RightOutlined /> Add Category
            </Typography>
          </Breadcrumbs>
        </Typography>
      </Stack>
      <MainCard
        sx={{
          mt: 2,
          padding: "50px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
        content={false}
      >
        <Grid container rowSpacing={3} columnSpacing={15}>
          <Grid item xs={12} md={12} lg={12}>
            <InputLabel htmlFor="email-login">Name</InputLabel>
            <FormControl sx={{ m: 1, width: "100%" }} variant="outlined">
              <OutlinedInput
                {...register("name")}
                id="outlined-adornment-weight"
                aria-describedby="outlined-weight-helper-text"
                inputProps={{
                  "aria-label": "weight",
                }}
              />
              {errors.name && (
                <FormHelperText style={{ color: "red", marginLeft: "0px" }}>
                  {"First Name is required"}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <InputLabel htmlFor="email-login">Description</InputLabel>
            <FormControl sx={{ m: 1, width: "100%" }} variant="outlined">
              <OutlinedInput
                {...register("description")}
                multiline
                rows={2}
                id="outlined-adornment-weight"
                aria-describedby="outlined-weight-helper-text"
                inputProps={{
                  "aria-label": "weight",
                }}
              />
            </FormControl>
          </Grid>
        </Grid>
        <Stack
          justifyContent={"space-between"}
          flexDirection={"row-reverse"}
          sx={{ mt: 10 }}
        >
          <Stack direction={"row"} spacing={2}>
            <AddBtn
              sx={{
                background: "#fff",
                border: "1px solid #FF8900",
                color: "#FF8900",
              }}
              onClick={closeForm}
            >
              Cancel
            </AddBtn>
            <AddBtn onClick={handleSubmit(onSubmit)}>Add</AddBtn>
          </Stack>
        </Stack>
      </MainCard>
    </>
  );
}

export default AddCategory;
