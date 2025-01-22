import StudentDetails from "../../components/StudentDetails";
import { Grid2 } from "@mui/material";

const index = () => {
  return (
    <Grid2
      container
      spacing={6}
      sx={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Grid2 item>
        <StudentDetails />
      </Grid2>
      <Grid2 item>
        <StudentDetails />
      </Grid2>
    </Grid2>
  );
};

export default index;
