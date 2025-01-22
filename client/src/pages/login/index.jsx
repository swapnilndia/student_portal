import { Grid2 } from "@mui/material";
import Login from "../../components/Login";

const index = () => {
  return (
    <Grid2 container justifyContent="center">
      {" "}
      <Grid2 size={{ xs: 12, sm: 10, md: 8, lg: 6 }}>
        <Login></Login>
      </Grid2>
    </Grid2>
  );
};

export default index;
