import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Box, Card, CardContent, Typography } from "@mui/material";
import { useNavigate } from "react-router";

export default function Register() {
  const navigate = useNavigate();
  return (
    <Box width={600} margin="auto" marginTop="5rem">
      <Card>
        <CardContent sx={{ padding: "1rem" }}>
          <Typography variant="h5" component="div">
            Student Register Form
          </Typography>
          <Typography variant="body2" color="text.secondary">
            To Register, Kindly provide the following details
          </Typography>

          <TextField
            autoFocus
            required
            margin="normal"
            id="email"
            name="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="outlined"
          />
          <TextField
            autoFocus
            required
            margin="normal"
            id="name"
            name="email"
            label="Student Name"
            type="text"
            fullWidth
            variant="outlined"
          />
          <TextField
            autoFocus
            required
            margin="normal"
            id="rollNumber"
            name="rollNumber"
            label="Student's Roll Number"
            type="text"
            fullWidth
            variant="outlined"
          />
          <TextField
            autoFocus
            required
            margin="normal"
            id="currentStandard"
            name="currentStandard"
            label="Current Standard"
            type="number"
            fullWidth
            variant="outlined"
          />
          <TextField
            autoFocus
            required
            margin="normal"
            id="password"
            name="password"
            label="password"
            type="password"
            fullWidth
            variant="outlined"
          />
          <Button variant="contained" type="submit">
            Register
          </Button>
          <Box
            padding="1rem"
            width="100%"
            display="flex"
            justifyContent="space-between"
            alignItems="flex-start"
          >
            <Typography component="span">Already have an Account?</Typography>{" "}
            <Button onClick={() => navigate("/login")}>Log In</Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
