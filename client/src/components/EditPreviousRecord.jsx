import * as React from "react";
import Button from "@mui/material/Button";
import PropTypes from "prop-types";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useForm } from "react-hook-form";
import { Box } from "@mui/material";
import { apiService } from "../utils/apiService";
import EditIcon from "@mui/icons-material/Edit";

export default function EditPreviousRecord({ row }) {
  const [open, setOpen] = React.useState(false);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      standard: row.standard,
      remarks: row.remarks,
      percentage: row.percentage,
    },
  });
  const onSubmit = async (data) => {
    try {
      const response = await apiService.editDetails(data);
      if (response) {
        apiService.getPrevDetails();
        handleClose();
      } else {
        console.error("Failed to update details.");
      }
    } catch (error) {
      console.error("Error while updating:", error);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    reset();
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        {" "}
        <EditIcon />
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Previous Record</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please choose from the following standards:{" "}
          </DialogContentText>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              autoFocus
              required
              margin="normal"
              id="standard"
              name="standard"
              label="Standard"
              type="number"
              fullWidth
              variant="outlined"
              {...register("standard")}
              helperText={errors.standard?.message}
            />
            <TextField
              autoFocus
              required
              margin="normal"
              id="remarks"
              name="remarks"
              label="Remarks"
              type="text"
              fullWidth
              variant="outlined"
              {...register("remarks")}
              helperText={errors.remarks?.message}
            />
            <TextField
              autoFocus
              required
              margin="normal"
              id="percentage"
              name="percentage"
              label="Percentage in Standard"
              type="number"
              fullWidth
              variant="outlined"
              {...register("percentage")}
              helperText={errors.percentage?.message}
            />
            <Box
              padding="1rem"
              width="100%"
              display="flex"
              justifyContent="flex-end"
              alignItems="flex-end"
              gap={2}
            >
              <Button variant="contained" color="error" onClick={handleClose}>
                Cancel
              </Button>
              <Button type="submit" variant="contained">
                Save
              </Button>
            </Box>
          </form>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
EditPreviousRecord.propTypes = {
  row: PropTypes.shape({
    standard: PropTypes.number.isRequired,
    remarks: PropTypes.string.isRequired,
    percentage: PropTypes.number.isRequired,
  }).isRequired,
};
