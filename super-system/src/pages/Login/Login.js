import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Formik } from "formik";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useLoginMutation } from "../../Api/Api";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import Loading from "../../components/Loading/Loading";

const Login = () => {
  const [login, { error, isLoading, data, isError, isSuccess }] =
    useLoginMutation();
  const navigate = useNavigate();
  const user = useSelector((state) => state?.user);
  const [checked, setChecked] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, []);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const onSubmit = (data) => {
    const { email, password } = data;
    login({ email, password });
  };

  if (isLoading) {
    return <Loading />;
  }

  if (data?.token) {
    Cookies.set("token", data?.token, { expires: 1 });
  }

  if (isSuccess) {
    navigate("/dashboard");
  }

  return (
    <>
      <Grid
        container
        direction="column"
        justifyContent="flex-end"
        sx={{ minHeight: "100vh", background: "#e3f2fd" }}
      >
        <Grid item xs={12}>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            sx={{ minHeight: "calc(100vh - 68px)" }}
          >
            <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
              <Box
                sx={{
                  width: "350px",
                  padding: "30px 25px",
                  background: "#FFF",
                  borderRadius: "12px",
                }}
              >
                <Grid
                  container
                  spacing={2}
                  alignItems="center"
                  justifyContent="center"
                >
                  <Grid item>
                    <Link
                      to="/"
                      style={{
                        textDecoration: "none",
                      }}
                    >
                      <Typography color="#673ab7" variant={"h5"}>
                        Super System
                      </Typography>
                    </Link>
                  </Grid>
                  <Grid item xs={12}>
                    <Grid
                      container
                      direction={"column-reverse"}
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Grid item>
                        <Stack
                          alignItems="center"
                          justifyContent="center"
                          spacing={1}
                        >
                          <Typography
                            color="#673ab7"
                            gutterBottom
                            variant={"h5"}
                          >
                            Hi, Welcome Back
                          </Typography>
                        </Stack>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <Formik
                      initialValues={{
                        email: "admin@gmail.com",
                        password: "123456",
                      }}
                      validationSchema={Yup.object().shape({
                        email: Yup.string()
                          .email("Must be a valid email")
                          .max(255)
                          .required("Email is required"),
                        password: Yup.string()
                          .min(6)
                          .max(255)
                          .required("Password is required"),
                      })}
                      onSubmit={async (values) => {
                        onSubmit(values);
                      }}
                    >
                      {({
                        errors,
                        handleBlur,
                        handleChange,
                        handleSubmit,
                        isSubmitting,
                        touched,
                        values,
                      }) => (
                        <form noValidate onSubmit={handleSubmit}>
                          <FormControl
                            fullWidth
                            error={Boolean(touched.email && errors.email)}
                            sx={{
                              marginBottom: "20px",
                              background: "#fafafa",
                              borderRadius: "12px",
                              color: "#212121",
                              border: 0,
                            }}
                          >
                            <InputLabel htmlFor="outlined-adornment-email-login">
                              Email Address
                            </InputLabel>
                            <OutlinedInput
                              id="outlined-adornment-email-login"
                              type="email"
                              value={values.email}
                              name="email"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              label="Email Address"
                              inputProps={{}}
                            />
                            {touched.email && errors.email && (
                              <FormHelperText
                                error
                                id="standard-weight-helper-text-email-login"
                              >
                                {errors.email}
                              </FormHelperText>
                            )}
                          </FormControl>

                          <FormControl
                            fullWidth
                            error={Boolean(touched.password && errors.password)}
                            sx={{
                              marginBottom: "15px",
                              background: "#fafafa",
                              borderRadius: "12px",
                              color: "#212121",
                              border: 0,
                            }}
                          >
                            <InputLabel htmlFor="outlined-adornment-password-login">
                              Password
                            </InputLabel>
                            <OutlinedInput
                              id="outlined-adornment-password-login"
                              type={showPassword ? "text" : "password"}
                              value={values.password}
                              name="password"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              endAdornment={
                                <InputAdornment position="end">
                                  <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                    size="large"
                                  >
                                    {showPassword ? (
                                      <Visibility />
                                    ) : (
                                      <VisibilityOff />
                                    )}
                                  </IconButton>
                                </InputAdornment>
                              }
                              label="Password"
                              // inputProps={{}}
                            />
                            {touched.password && errors.password && (
                              <FormHelperText
                                error
                                id="standard-weight-helper-text-password-login"
                              >
                                {errors.password}
                              </FormHelperText>
                            )}
                            {isError && (
                              <FormHelperText error sx={{ fontSize: 15 }}>
                                {error.data}
                              </FormHelperText>
                            )}
                          </FormControl>
                          <Stack
                            direction="row"
                            alignItems="center"
                            justifyContent="space-between"
                            spacing={1}
                          >
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={checked}
                                  onChange={(event) =>
                                    setChecked(event.target.checked)
                                  }
                                  name="checked"
                                  color="primary"
                                />
                              }
                              label="Remember me"
                            />
                            <Typography
                              variant="subtitle1"
                              color="secondary"
                              sx={{ textDecoration: "none", cursor: "pointer" }}
                            >
                              Forgot Password?
                            </Typography>
                          </Stack>
                          {errors.submit && (
                            <Box sx={{ mt: 3 }}>
                              <FormHelperText error>
                                {errors.submit}
                              </FormHelperText>
                            </Box>
                          )}

                          <Box sx={{ mt: 2 }}>
                            <Button
                              disableElevation
                              disabled={isSubmitting}
                              fullWidth
                              size="large"
                              type="submit"
                              variant="contained"
                              color="secondary"
                            >
                              Sign in
                            </Button>
                          </Box>
                        </form>
                      )}
                    </Formik>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Login;
