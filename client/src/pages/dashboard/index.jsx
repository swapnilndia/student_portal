import StudentDetails from "../../components/StudentDetails";
import { Grid2 } from "@mui/material";

const index = () => {
  return (
    <Grid2 container gap={2} justifyContent="center" alignItems="center" mt={2}>
      {" "}
      <Grid2
        size={{ sm: 12, md: 8 }}
        justifyContent="center"
        alignItems="center"
      >
        <StudentDetails />
      </Grid2>
    </Grid2>
  );
};

export default index;
