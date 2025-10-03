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
function AddUser({ closeForm, getUser }) {
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
      console.log(data);
      let res = await updateUserData("users", data, updatedObj?.id);
      if (res._id) {
        toast.success("user updated successfully");
        getUser();
        closeForm();
      }
    } else {
      let res = await saveUserData("users", data);
      if (res?._id) {
        toast.success("user saved successfully");
        getUser();
        closeForm();
      }
    }
  };
  useEffect(() => {
    if (updatedObj) {
      reset({
        first: updatedObj.first || "",
        last: updatedObj.last || "",
        email: updatedObj.email || "",
        country: updatedObj.country || "",
        city: updatedObj.city || "",
        address: updatedObj.address || "",
        contaco: updatedObj.contaco,
        is_admin: updatedObj.is_admin,
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
          Add User
          <Breadcrumbs aria-label="breadcrumb">
            <Typography sx={{ fontSize: "14px", fontWeight: 300 }}>
              <span
                style={{ color: "#000000", fontSize: "14px", fontWeight: 400 }}
              >
                Users
              </span>{" "}
              <RightOutlined /> Add User
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
          <Grid item xs={12} md={6} lg={6}>
            <InputLabel htmlFor="email-login">First Name</InputLabel>
            <FormControl sx={{ m: 1, width: "100%" }} variant="outlined">
              <OutlinedInput
                {...register("first")}
                id="outlined-adornment-weight"
                aria-describedby="outlined-weight-helper-text"
                inputProps={{
                  "aria-label": "weight",
                }}
              />
              {errors.first && (
                <FormHelperText style={{ color: "red", marginLeft: "0px" }}>
                  {"First Name is required"}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <InputLabel htmlFor="email-login">Last Name</InputLabel>
            <FormControl sx={{ m: 1, width: "100%" }} variant="outlined">
              <OutlinedInput
                {...register("last")}
                id="outlined-adornment-weight"
                aria-describedby="outlined-weight-helper-text"
                inputProps={{
                  "aria-label": "weight",
                }}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <InputLabel htmlFor="email-login">Email</InputLabel>
            <FormControl sx={{ m: 1, width: "100%" }} variant="outlined">
              <OutlinedInput
                {...register("email", { required: true })}
                id="outlined-adornment-weight"
                aria-describedby="outlined-weight-helper-text"
                inputProps={{
                  "aria-label": "weight",
                }}
              />
              {errors.email && (
                <FormHelperText style={{ color: "red", marginLeft: "0px" }}>
                  {"Email is required"}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
          {updatedObj == null && (
            <Grid item xs={12} md={6} lg={6}>
              <InputLabel htmlFor="email-login">Password</InputLabel>
              <FormControl sx={{ m: 1, width: "100%" }} variant="outlined">
                <OutlinedInput
                  type={showPassword ? "text" : "password"}
                  {...register("password", { required: true })}
                  id="outlined-adornment-weight"
                  aria-describedby="outlined-weight-helper-text"
                  inputProps={{
                    "aria-label": "weight",
                  }}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                        color="secondary"
                      >
                        {showPassword ? (
                          <EyeOutlined />
                        ) : (
                          <EyeInvisibleOutlined />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                {errors.password && (
                  <FormHelperText style={{ color: "red", marginLeft: "0px" }}>
                    {"Password is required"}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
          )}

          <Grid item xs={12} md={6} lg={6}>
            <InputLabel htmlFor="email-login">Country</InputLabel>
            <FormControl sx={{ m: 1, width: "100%" }} variant="outlined">
              <OutlinedInput
                {...register("country")}
                id="outlined-adornment-weight"
                aria-describedby="outlined-weight-helper-text"
                inputProps={{
                  "aria-label": "weight",
                }}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <InputLabel htmlFor="email-login">City</InputLabel>
            <FormControl sx={{ m: 1, width: "100%" }} variant="outlined">
              <OutlinedInput
                {...register("city")}
                id="outlined-adornment-weight"
                aria-describedby="outlined-weight-helper-text"
                inputProps={{
                  "aria-label": "weight",
                }}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <InputLabel htmlFor="email-login">Contact No</InputLabel>
            <FormControl sx={{ m: 1, width: "100%" }} variant="outlined">
              <OutlinedInput
                {...register("contact")}
                type="text"
                id="outlined-adornment-weight"
                aria-describedby="outlined-weight-helper-text"
                inputProps={{
                  "aria-label": "weight",
                }}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <InputLabel htmlFor="email-login">Admin</InputLabel>
            <FormControl sx={{ m: 1, width: "100%" }} variant="outlined">
              <select className="style-class" {...register("is_admin")}>
                <option value={true}>Yes</option>
                <option value={false}>No</option>
              </select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <InputLabel htmlFor="email-login">Address</InputLabel>
            <FormControl sx={{ m: 1, width: "100%" }} variant="outlined">
              <OutlinedInput
                {...register("address")}
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

export default AddUser;
