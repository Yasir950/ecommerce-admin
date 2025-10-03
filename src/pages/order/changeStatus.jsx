import {
  Breadcrumbs,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { RightOutlined } from "@ant-design/icons";
import { updateUserData } from "apiservices";
import MainCard from "components/MainCard";
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import { AddBtn } from "styled/styled";

function ChangeStatus({ closeForm, getUser, rowData }) {
  const [status, setStatus] = useState("");

  const handleChange = (event) => {
    setStatus(event.target.value);
  };

  const submit = async () => {
    if (rowData) {
      console.log({ ...rowData, status: status });
      console.log(rowData);
      try {
        let res = await updateUserData(
          "orders",
          { ...rowData, status: status }, // ✅ only send status
          rowData.id // ✅ make sure you're using the right key
        );
        if (res.data._id) {
          toast.success("Status updated successfully");
          getUser();
          closeForm();
        }
      } catch (error) {
        toast.error("Failed to update status");
        console.error(error);
      }
    }
  };

  useEffect(() => {
    if (rowData) {
      setStatus(rowData.status);
    }
  }, [rowData]);

  return (
    <>
      <Stack justifyContent={"space-between"} flexDirection={"row"}>
        <Typography
          sx={{ fontWeight: 600, fontSize: "30px", color: "#09090B" }}
        >
          Change Status
          <Breadcrumbs aria-label="breadcrumb">
            <Typography sx={{ fontSize: "14px", fontWeight: 300 }}>
              <span
                style={{ color: "#000000", fontSize: "14px", fontWeight: 400 }}
              >
                Status
              </span>{" "}
              <RightOutlined /> Change Status
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
          <Grid item xs={12}>
            <InputLabel>Status</InputLabel>
            <FormControl sx={{ m: 1, width: "100%" }} variant="outlined">
              <Select value={status} onChange={handleChange}>
                <MenuItem value="">
                  <em>Select Status</em>
                </MenuItem>
                <MenuItem value="pending">Pending</MenuItem>
                <MenuItem value="approved">Approved</MenuItem>
                <MenuItem value="shipped">Shipped</MenuItem>
                <MenuItem value="deliver">Delivered</MenuItem>
                <MenuItem value="cancelled">Cancelled</MenuItem>
              </Select>

              {!status && (
                <Typography color="error" fontSize={12}>
                  Status is required
                </Typography>
              )}
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
            <AddBtn onClick={submit}>Submit</AddBtn>
          </Stack>
        </Stack>
      </MainCard>
    </>
  );
}

export default ChangeStatus;
