import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { apiService } from "../utils/apiService";
import AddPreviousRecord from "./AddPreviousRecord";
import EditIcon from "@mui/icons-material/Edit";
import EditPreviousRecord from "./EditPreviousRecord";

export default function StudentDetails() {
  const [list, setList] = useState([]);
  const [pendingRecords, setPendingRecords] = useState(0);
  const [currentStandard, setCurrentStandard] = useState(0);
  const fetchPrevDetails = async () => {
    const response = await apiService.getPrevDetails();
    console.log(response);
    setList(response.previousDetails);
    setCurrentStandard(response.currentStandard);
    setPendingRecords(response.currentStandard - 1 - list.length);
  };
  useEffect(() => {
    fetchPrevDetails();
  }, []);
  return (
    <TableContainer component={Paper}>
      {pendingRecords > 0 && (
        <AddPreviousRecord list={list} currentStandard={currentStandard} />
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
        {list.length > 0 ? (
          <TableBody>
            {list.map((row) => (
              <TableRow
                key={row.standard}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.standard}
                </TableCell>
                <TableCell align="right">{row.remarks}</TableCell>
                <TableCell align="right">{row.percentage}</TableCell>
                <TableCell align="right">
                  <EditPreviousRecord row={row} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        ) : (
          <TableBody>
            <TableCell colSpan={5} align="center">
              <Typography>Kindly update your Previous marks</Typography>
            </TableCell>
          </TableBody>
        )}
      </Table>
    </TableContainer>
  );
}
