import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Button, Typography } from "@mui/material";
import { useEffect } from "react";
import { apiService } from "../utils/apiService";
import AddPreviousRecord from "./AddPreviousRecord";
import EditPreviousRecord from "./EditPreviousRecord";
import { useRecordDetails } from "../context/recordContext";
import { useUserDetails } from "../context/userContext";

export default function StudentDetails() {
  const { removeUserInfo } = useUserDetails();
  const { records, currentStandard, updateInfo } = useRecordDetails();
  const fetchPrevDetails = async () => {
    const response = await apiService.getPrevDetails();
    updateInfo(response);
  };
  const pendingRecords = currentStandard - records.length;
  useEffect(() => {
    fetchPrevDetails();
  }, []);

  return (
    <TableContainer component={Paper}>
      {pendingRecords > 1 ? (
        <AddPreviousRecord fetchPrevDetails={fetchPrevDetails} />
      ) : (
        <Box
          padding="1rem"
          display="flex"
          justifyContent="space-between"
          alignItems="flex-end"
          gap={2}
        >
          <Typography variant="h5" align="center">
            All records Added
          </Typography>
          <Button variant="outlined" onClick={() => removeUserInfo()}>
            Logout
          </Button>
        </Box>
      )}
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography variant="h6">Class Standard </Typography>{" "}
            </TableCell>
            <TableCell align="right">
              <Typography variant="h6">Status</Typography>{" "}
            </TableCell>
            <TableCell align="right">
              <Typography variant="h6">Percentage</Typography>{" "}
            </TableCell>
            <TableCell align="right">
              <Typography variant="h6">Action</Typography>{" "}
            </TableCell>
          </TableRow>
        </TableHead>
        {records.length > 0 ? (
          <TableBody>
            {records.map((row) => (
              <TableRow
                key={row._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.standard}
                </TableCell>
                <TableCell align="right">{row.remarks}</TableCell>
                <TableCell align="right">{row.percentage}</TableCell>
                <TableCell align="right">
                  <EditPreviousRecord
                    key={row._id}
                    row={row}
                    fetchPrevDetails={fetchPrevDetails}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        ) : (
          <TableBody>
            <TableRow>
              <TableCell colSpan={5} align="center">
                <Typography>Kindly update your Previous marks</Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        )}
      </Table>
    </TableContainer>
  );
}
