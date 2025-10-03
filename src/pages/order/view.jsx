import { useSelector } from "react-redux";
import {
  Stack,
  Typography,
  Divider,
  Box,
  Chip,
  Paper,
  Grid,
  Button,
} from "@mui/material";
import MainCard from "components/MainCard";

export default function ViewOrder({ closeForm, data }) {
  const order = useSelector((state) => state.user.updatedObj);

  if (!order) {
    return <Typography>No order selected</Typography>;
  }

  // Status Color Mapping
  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "primary";
      case "approved":
        return "secondary";
      case "shipped":
        return "warning";
      case "completed":
        return "success";
      case "cancelled":
        return "error";
      default:
        return "default";
    }
  };
  const getuserById = (id) => {
    const found = data.find((item) => item._id === id);
    return found ? found.first + found.last : "Unknown";
  };
  return (
    <MainCard
      sx={{
        mt: 2,
        padding: "32px",
        display: "flex",
        flexDirection: "column",
        gap: 3,
        borderRadius: "16px",
      }}
    >
      {/* Header */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h5" sx={{ fontWeight: 700, fontSize: "18px" }}>
          Order Details
        </Typography>
        <Button
          onClick={closeForm}
          className="naab-green-outline"
          sx={{ borderRadius: "8px", fontWeight: 600 }}
        >
          Back to Orders
        </Button>
      </Stack>

      {/* General Info Section */}
      <Paper
        elevation={0}
        sx={{
          p: 3,
          borderRadius: "12px",
          background: "#fafafa",
          border: "1px solid #e0e0e0",
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography variant="body1" sx={{ margin: 2 }}>
              <strong>Order ID: </strong> {order.id}
            </Typography>
            <Typography variant="body1" sx={{ margin: 2 }}>
              <strong>UserName: </strong> {getuserById(order.user)}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="body1" sx={{ margin: 2 }}>
              <strong>Total Price: </strong>{" "}
              <span style={{ fontWeight: 600, color: "#234E41" }}>
                PKR {order.price}
              </span>
            </Typography>
            <Typography variant="body1" sx={{ margin: 2 }}>
              <strong>Status: </strong>{" "}
              <Chip
                label={order.status}
                color={getStatusColor(order.status)}
                sx={{ fontWeight: 600 }}
              />
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      {/* Product List */}
      <Typography
        variant="h6"
        sx={{ fontWeight: 600, mt: 2, mb: 2, fontSize: "18px" }}
      >
        Products
      </Typography>
      <Grid container spacing={2}>
        {Array.isArray(order.product) &&
          order.product.map((p) => (
            <Grid item xs={12} md={6} key={p._id}>
              <Paper
                elevation={2}
                sx={{
                  p: 2,
                  borderRadius: "12px",
                  background: "#ffffff",
                  border: "1px solid #f0f0f0",
                  transition: "0.2s",
                }}
              >
                <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
                  {p.name}
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  Quantity: {p.quantity}
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  Price: PKR {p.price} / product
                </Typography>
                <Typography variant="body1">
                  Total Price: PKR {p.price * p.quantity}
                </Typography>
              </Paper>
            </Grid>
          ))}
      </Grid>
    </MainCard>
  );
}
