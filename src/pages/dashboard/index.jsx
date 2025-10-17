import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import MainCard from "components/MainCard";
import DashboardCards from "components/cards/DashboardCards";
import { BoldTypo } from "styled/styled";
import {
  ArrowIcon,
  DashIcon1,
  DashIcon2,
  DashIcon3,
} from "assets/images/users/Svg";
import { useEffect, useState } from "react";
import SalesChart from "./SalesChart";
import Header from "layout/Dashboard/Header";
import Drawer from "layout/Dashboard/Drawer";
import { getUsersData } from "apiservices";

// ==============================|| DASHBOARD - DEFAULT ||============================== //

export default function DashboardDefault() {
  const [state, setState] = useState({
    selected: "all",
    storeOverview: {},
    graphData: [],
    vehiclesData: [],
    locationData: [],
    vehicle_overview: [],
  });
  useEffect(() => {
    getDashboard();
    getGraphData();
    return () => {};
  }, []);

  const getDashboard = async () => {
    let res = await getUsersData("dashboard");
    setState((prev) => ({ ...prev, storeOverview: res.counts }));
  };
  const getGraphData = async () => {
    let res = await getUsersData("graph", "2025/09/15", "2025/10/15");
    setState((prev) => ({ ...prev, graphData: res.graphData }));
  };
  return (
    <>
      <Header />
      <Drawer />
      <Stack justifyContent={"space-between"} flexDirection={"row"}>
        <Typography
          sx={{ fontWeight: 300, fontSize: "30px", color: "#09090B" }}
        >
          Welcome <span style={{ fontWeight: 600 }}>Super!</span>
        </Typography>
      </Stack>
      <Grid container rowSpacing={4.5} columnSpacing={2.75}>
        <Grid item xs={12} md={12} lg={12}>
          <MainCard
            sx={{
              mt: 2,
              padding: "32px",
              minHeight: "358px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
            content={false}
          >
            <Stack>
              <BoldTypo sx={{ fontSize: "20px", color: "#05004E" }}>
                Store OverView
              </BoldTypo>
            </Stack>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={4} lg={2}>
                <DashboardCards
                  title={state.storeOverview && state.storeOverview.userCount}
                  icon={<DashIcon1 />}
                  content={"Users"}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={2}>
                <DashboardCards
                  title={
                    state.storeOverview && state.storeOverview.categoryCount
                  }
                  icon={<DashIcon2 />}
                  content={"Categories"}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={2}>
                <DashboardCards
                  title={
                    state.storeOverview && state.storeOverview.productCount
                  }
                  icon={<DashIcon3 />}
                  content={"Products"}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={2}>
                <DashboardCards
                  title={state.storeOverview && state.storeOverview.ordeCount}
                  icon={<DashIcon2 />}
                  content={"Orders"}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={2}>
                <DashboardCards
                  title={state.storeOverview && state.storeOverview.totalSales}
                  icon={<DashIcon3 />}
                  content={"Total Amount"}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={2}>
                <DashboardCards
                  title={
                    state.storeOverview && state.storeOverview.totalProductSales
                  }
                  icon={<DashIcon3 />}
                  content={"Total Products Quantity"}
                />
              </Grid>
            </Grid>
          </MainCard>
        </Grid>

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
            <Stack
              flexDirection={"row"}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <BoldTypo sx={{ fontSize: "20px", color: "#05004E" }}>
                Monthly Orders & Sales Overview
              </BoldTypo>
              <ArrowIcon />
            </Stack>
            <SalesChart data={state.graphData} />
          </MainCard>
        </Grid>
      </Grid>
    </>
  );
}
