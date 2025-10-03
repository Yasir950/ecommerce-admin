import PropTypes from "prop-types";

// material-ui
import { useTheme } from "@mui/material/styles";

// project import
import DrawerHeaderStyled from "./DrawerHeaderStyled";
import Logo from "components/logo";
import logo from "../../../../asset/logo.jpg";
// ==============================|| DRAWER HEADER ||============================== //

export default function DrawerHeader({ open }) {
  const theme = useTheme();

  return (
    <DrawerHeaderStyled theme={theme} open={!!open}>
      <img
        src={logo}
        height={"40"}
        style={{ borderRadius: "4px", marginRight: 5 }}
      />
      <h3>NAAB ORGANICA</h3>
      {/* <Logo isIcon={!open} sx={{ width: open ? 'auto' : 35, height: 35 }} /> */}
    </DrawerHeaderStyled>
  );
}

DrawerHeader.propTypes = { open: PropTypes.bool };
