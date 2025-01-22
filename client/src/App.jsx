import Login from "./pages/login";
import Register from "./pages/register";

import Dashboard from "./pages/dashboard";
import RedirectIfAuthenticated from "./components/RedirectIfAuthenticated";
import RequireAuth from "./components/RequireAuth";
import { Route, Routes } from "react-router";
import UserDetailsContextProvider from "./context/userContext";
import RecordContextProvider from "./context/recordContext";
import Navbar from "./components/Navbar";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useState } from "react";

const App = () => {
  const [mode, setMode] = useState("light");
  const darkTheme = createTheme({
    palette: {
      mode: mode,
    },
  });
  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <UserDetailsContextProvider>
          <Navbar mode={mode} setMode={setMode} />
          <Routes>
            <Route element={<RedirectIfAuthenticated />}>
              <Route path="/login" element={<Login />}></Route>
              <Route path="/register" element={<Register />}></Route>
            </Route>
            <Route element={<RequireAuth />}>
              <Route
                path="/"
                element={
                  <RecordContextProvider>
                    <Dashboard />{" "}
                  </RecordContextProvider>
                }
              ></Route>
            </Route>
          </Routes>
        </UserDetailsContextProvider>
      </ThemeProvider>
    </>
  );
};

export default App;
