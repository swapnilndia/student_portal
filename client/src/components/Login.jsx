import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Box, Card, CardContent, Typography } from "@mui/material";
import { useNavigate } from "react-router";

export default function Login() {
  const navigate = useNavigate();
  return (
    <Box width={600} margin="auto" marginTop="5rem">
      <Card>
        <CardContent sx={{ padding: "1rem" }}>
          <Typography variant="h5" component="div">
            Login Form
          </Typography>
          <Typography variant="body2" color="text.secondary">
            To Login, Kindly provide the following details
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
            id="password"
            name="password"
            label="password"
            type="password"
            fullWidth
            variant="outlined"
          />
          <Button variant="contained" type="submit">
            Login
          </Button>
          <Box
            padding="1rem"
            width="100%"
            display="flex"
            justifyContent="space-between"
            alignItems="flex-start"
          >
            <Typography component="span">Don't Have an Account ?</Typography>{" "}
            <Button onClick={() => navigate("/register")}>Register</Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
