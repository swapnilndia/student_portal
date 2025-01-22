import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import { Box, Card, CardContent, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import { apiService } from "../utils/apiService";
import { yupResolver } from "@hookform/resolvers/yup";
import { signupSchema } from "../utils/schema";

export default function Register() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      name: "",
      rollNumber: "",
      currentStandard: 0,
      password: "",
    },
    resolver: yupResolver(signupSchema),
  });
  const onSubmit = async (data) => {
    const response = await apiService.studentRegister(data);
    if (response.status === 201) {
      reset();
      navigate("/login");
    }
  };
  return (
    <Box margin="auto" marginTop="5rem">
      <Card>
        <CardContent sx={{ padding: "1rem" }}>
          <Typography variant="h5" component="div">
            Student Register Form
          </Typography>
          <Typography variant="body2" color="text.secondary">
            To Register, Kindly provide the following details
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              autoFocus
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
              margin="normal"
              id="name"
              name="name"
              label="Student Name"
              type="text"
              fullWidth
              variant="outlined"
              {...register("name")}
              helperText={errors.name?.message}
            />
            <TextField
              margin="normal"
              id="rollNumber"
              name="rollNumber"
              label="Student's Roll Number"
              type="text"
              fullWidth
              variant="outlined"
              {...register("rollNumber")}
              helperText={errors.rollNumber?.message}
            />
            <TextField
              margin="normal"
              id="currentStandard"
              name="currentStandard"
              label="Current Standard"
              type="number"
              fullWidth
              variant="outlined"
              {...register("currentStandard")}
              helperText={errors.currentStandard?.message}
            />
            <TextField
              margin="normal"
              id="password"
              name="password"
              label="password"
              type="password"
              fullWidth
              variant="outlined"
              {...register("password")}
              helperText={errors.password?.message}
            />
            <Button variant="contained" type="submit">
              Register
            </Button>
          </form>

          <Box
            marginTop="1rem"
            display="flex"
            justifyContent="space-between"
            alignItems="flex-start"
          >
            <Typography component="span">Already have an Account?</Typography>{" "}
            <Button variant="outlined" onClick={() => navigate("/login")}>
              Log In
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
