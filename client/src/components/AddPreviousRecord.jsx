import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useForm } from "react-hook-form";
import { Box } from "@mui/material";
import { apiService } from "../utils/apiService";

export default function AddPreviousRecord({ list, currentStandard }) {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);

  const checkOptions = () => {
    const optionsArr = [];
    for (let i = 1; i < currentStandard; i++) {
      const standardIndex = list.findIndex((row) => row.standard === i);
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
    formState: { errors },
  } = useForm({
    defaultValues: {
      standard: 4,
      remarks: "Pass",
      percentage: 98,
    },
  });
  const onSubmit = async (data) => {
    console.log(data);
    const response = await apiService.addNewDetails(data);
    console.log(response);
    if (response) {
      apiService.getPrevDetails();
      handleClose();
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
      <Button variant="outlined" onClick={handleClickOpen}>
        Open form dialog
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please choose from the following standards:{" "}
            {`${options.toString()}`}
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
              gap={5}
            >
              <Button variant="contained" color="error">
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
