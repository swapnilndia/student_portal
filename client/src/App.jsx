import Login from "./pages/login";
import Register from "./pages/register";

import Dashboard from "./pages/dashboard";
import RedirectIfAuthenticated from "./components/RedirectIfAuthenticated";
import RequireAuth from "./components/RequireAuth";
import { Route, Routes } from "react-router";
import UserDetailsContextProvider from "./context/userContext";
const App = () => {
  return (
    <>
      <UserDetailsContextProvider>
        <Routes>
          <Route element={<RedirectIfAuthenticated />}>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
          </Route>
          <Route element={<RequireAuth />}>
            <Route path="/" element={<Dashboard />}></Route>
          </Route>
        </Routes>
      </UserDetailsContextProvider>
    </>
  );
};

export default App;
