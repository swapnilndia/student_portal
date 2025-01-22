import * as React from "react";
import Button from "@mui/material/Button";
import PropTypes from "prop-types";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useForm } from "react-hook-form";
import { Box, MenuItem } from "@mui/material";
import { apiService } from "../utils/apiService";
import { useRecordDetails } from "../context/recordContext";
import AddIcon from "@mui/icons-material/Add";
import { useUserDetails } from "../context/userContext";

export default function AddPreviousRecord({ fetchPrevDetails }) {
  const { removeUserInfo } = useUserDetails();
  const { records, currentStandard } = useRecordDetails();
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);

  const checkOptions = () => {
    const optionsArr = [];
    for (let i = 1; i < currentStandard; i++) {
      const standardIndex = records.findIndex((row) => row.standard === i);
      if (standardIndex > -1) {
        continue;
      } else {
        optionsArr.push(i);
      }
    }
    setOptions(optionsArr);
  };
  React.useEffect(() => {
    checkOptions();
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({});
  const onSubmit = async (data) => {
    try {
      const response = await apiService.addNewDetails(data);
      if (response) {
        fetchPrevDetails();
        reset();
        handleClose();
      } else {
        console.error("Failed to add details.");
      }
    } catch (error) {
      console.error("Error adding details:", error);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "1rem",
        }}
      >
        <Button variant="outlined" onClick={handleClickOpen}>
          <AddIcon /> Add New Record
        </Button>
        <Button variant="outlined" onClick={() => removeUserInfo()}>
          Logout
        </Button>
      </div>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Your Marks of Previous Standard</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              select
              required
              fullWidth
              margin="normal"
              id="standard"
              name="standard"
              label="Standard"
              variant="outlined"
              {...register("standard", {
                required: "Standard is required",
              })}
              helperText={errors.standard?.message}
            >
              {options.length > 0 ? (
                options.map((opt) => (
                  <MenuItem key={opt} value={opt}>
                    {Number(opt)}
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled>No standards available</MenuItem>
              )}
            </TextField>

            <TextField
              placeholder="Eg: Pass with outstanding performance"
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
              placeholder="Eg: 100%"
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
AddPreviousRecord.propTypes = {
  fetchPrevDetails: PropTypes.func.isRequired,
};
