import { RightOutlined } from "@ant-design/icons";
import {
  Breadcrumbs,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
} from "@mui/material";
import { saveUserData, updateUserData, uploadToCloudinary } from "apiservices";
import MainCard from "components/MainCard";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { AddBtn } from "styled/styled";
function AddProduct({ closeForm, getUser, catsData }) {
  const updatedObj = useSelector((state) => state.user.updatedObj);
  const [loading, setLoading] = React.useState(false);
  const [files, setFiles] = useState([]);
  const fileSelectedHandler = (e) => {
    setFiles([...files, ...Array.from(e.target.files)]);
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);

    if (updatedObj) {
      const existingImages = files.filter((img) => typeof img === "string");
      const newFiles = files.filter((img) => img instanceof File);

      // Convert only new files
      const uploadedUrls = await Promise.all(
        newFiles.map((file) => uploadToCloudinary(file))
      );

      const payload = {
        ...data,
        images: [...existingImages, ...uploadedUrls], // merge both
      };
      let res = await updateUserData("products", payload, updatedObj?.id);
      if (res.data._id) {
        toast.success("product updated successfully");
        getUser();
        closeForm();
        setLoading(false);
      }
    } else {
      const uploadedUrls = await Promise.all(
        files.map((file) => uploadToCloudinary(file))
      );

      const payload = {
        ...data,
        images: uploadedUrls,
      };
      let res = await saveUserData("products", payload);
      if (res?.data._id) {
        toast.success("product saved successfully");
        getUser();
        closeForm();
        setLoading(false);
      }
    }
  };
  useEffect(() => {
    if (updatedObj) {
      reset({
        name: updatedObj.name || "",
        description: updatedObj.description || "",
        price: updatedObj.price || "",
        discount: updatedObj.discount || "",
        quantity: updatedObj.quantity || "",
        category: updatedObj.category || "",
      });
      setFiles(updatedObj.images);
    }
    return () => {};
  }, [updatedObj]);
  const removeFile = (index) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };
  return (
    <>
      <Stack justifyContent={"space-between"} flexDirection={"row"}>
        <Typography
          sx={{ fontWeight: 600, fontSize: "30px", color: "#09090B" }}
        >
          Add Product
          <Breadcrumbs aria-label="breadcrumb">
            <Typography sx={{ fontSize: "14px", fontWeight: 300 }}>
              <span
                style={{ color: "#000000", fontSize: "14px", fontWeight: 400 }}
              >
                Products
              </span>{" "}
              <RightOutlined /> Add Product
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
            <InputLabel htmlFor="email-login"> Name</InputLabel>
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
                  {" Name is required"}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <InputLabel htmlFor="email-login">Category</InputLabel>
            <FormControl sx={{ m: 1, width: "100%" }} variant="outlined">
              <select className="style-class" {...register("category")}>
                {catsData.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.name}
                  </option>
                ))}
              </select>
              {errors.category && (
                <FormHelperText style={{ color: "red", marginLeft: "0px" }}>
                  {"Select Category"}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <InputLabel htmlFor="email-login">Price</InputLabel>
            <FormControl sx={{ m: 1, width: "100%" }} variant="outlined">
              <OutlinedInput
                {...register("price", { required: true })}
                id="outlined-adornment-weight"
                aria-describedby="outlined-weight-helper-text"
                inputProps={{
                  "aria-label": "weight",
                }}
              />
              {errors.price && (
                <FormHelperText style={{ color: "red", marginLeft: "0px" }}>
                  {"Email is required"}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <InputLabel htmlFor="email-login">Discount</InputLabel>
            <FormControl sx={{ m: 1, width: "100%" }} variant="outlined">
              <OutlinedInput
                {...register("discount")}
                id="outlined-adornment-weight"
                aria-describedby="outlined-weight-helper-text"
                inputProps={{
                  "aria-label": "weight",
                }}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <InputLabel htmlFor="email-login">Description</InputLabel>
            <FormControl sx={{ m: 1, width: "100%" }} variant="outlined">
              <OutlinedInput
                multiline
                // rows={2}
                {...register("description")}
                id="outlined-adornment-weight"
                aria-describedby="outlined-weight-helper-text"
                inputProps={{
                  "aria-label": "weight",
                }}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <InputLabel htmlFor="email-login">Quantity</InputLabel>
            <FormControl sx={{ m: 1, width: "100%" }} variant="outlined">
              <OutlinedInput
                {...register("quantity", { required: true })}
                id="outlined-adornment-weight"
                aria-describedby="outlined-weight-helper-text"
                inputProps={{
                  "aria-label": "weight",
                }}
              />
              {errors.quantity && (
                <FormHelperText style={{ color: "red", marginLeft: "0px" }}>
                  {"Email is required"}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <InputLabel>Add Images</InputLabel>
            <input
              className="style-class"
              type="file"
              multiple
              onChange={fileSelectedHandler}
            />
          </Grid>
          <Grid item xs={12}>
            {files &&
              files.map((file, index) => (
                <div
                  key={index}
                  style={{
                    display: "inline-block",
                    position: "relative",
                    margin: "10px",
                  }}
                >
                  <span
                    onClick={() => removeFile(index)}
                    style={{
                      position: "absolute",
                      top: "-8px",
                      right: "-8px",
                      background: "red",
                      color: "white",
                      borderRadius: "50%",
                      width: "15px",
                      height: "15px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      fontSize: "14px",
                      fontWeight: "bold",
                    }}
                  >
                    ×
                  </span>
                  <img
                    key={index}
                    src={
                      typeof file === "string"
                        ? file
                        : URL.createObjectURL(file)
                    }
                    alt=""
                    width={"100px"}
                    height={"100px"}
                    style={{ borderRadius: "6px" }}
                  />
                </div>
              ))}
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
            <AddBtn onClick={handleSubmit(onSubmit)} disabled={loading}>
              {!loading ? (updatedObj ? "Update" : "Add") : "loading"}
            </AddBtn>
          </Stack>
        </Stack>
      </MainCard>
    </>
  );
}

export default AddProduct;
