import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Box, Card, CardContent, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { apiService } from "../utils/apiService";
import { useUserDetails } from "../context/userContext";

export default function Login() {
  const navigate = useNavigate();
  const { saveUserInfo } = useUserDetails();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "swapnil1@gmail.com",
      password: "123456",
    },
  });
  const onSubmit = async (data) => {
    const response = await apiService.studentLogin(data);

    if (response.status === 200) {
      saveUserInfo(response.data);
      navigate("/");
    }
  };
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
          <form onSubmit={handleSubmit(onSubmit)}>
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
              {...register("email")}
              helperText={errors.email?.message}
            />
            <TextField
              autoFocus
              required
              margin="normal"
              id="password"
              name="password"
              label="Password"
              type="password"
              fullWidth
              variant="outlined"
              {...register("password")}
              helperText={errors.password?.message}
            />
            <Button variant="contained" type="submit">
              Login
            </Button>
          </form>

          <Box
            padding="1rem"
            width="100%"
            display="flex"
            justifyContent="space-between"
            alignItems="flex-start"
          >
            <Typography component="span">Do not Have an Account ?</Typography>{" "}
            <Button onClick={() => navigate("/register")}>Register</Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
