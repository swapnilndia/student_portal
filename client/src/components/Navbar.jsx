import AppBar from "@mui/material/AppBar";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Avatar } from "@mui/material";
import { useUserDetails } from "../context/userContext";
import { useLocation, useNavigate } from "react-router";

import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

export default function Navbar({ mode, setMode }) {
  const { user, removeUserInfo } = useUserDetails();
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar style={{ display: "flex", gap: "1rem" }}>
          <Avatar alt="student portal logo" src="../../public/student.svg" />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Student Portal
          </Typography>
          {mode === "light" ? (
            <DarkModeIcon onClick={() => setMode("dark")}>Dark</DarkModeIcon>
          ) : (
            <LightModeIcon onClick={() => setMode("light")}></LightModeIcon>
          )}

          {user ? (
            <Button onClick={() => removeUserInfo()} color="inherit">
              Logout
            </Button>
          ) : (
            <>
              {location.pathname === "/register" ? (
                <Button onClick={() => navigate("/login")} color="inherit">
                  Login
                </Button>
              ) : (
                <Button onClick={() => navigate("/register")} color="inherit">
                  Register
                </Button>
              )}
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

Navbar.propTypes = {
  mode: PropTypes.string.isRequired, // Corrected this part
  setMode: PropTypes.func.isRequired, // Corrected this part
};
