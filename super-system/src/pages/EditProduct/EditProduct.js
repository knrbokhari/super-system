/* eslint-disable react-hooks/rules-of-hooks */
import axios from "../../axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../Features/UserSlice";
import Loading from "../../components/Loading/Loading";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import * as Yup from "yup";
import { Formik } from "formik";
import { useUpdateProductMutation } from "../../Api/Api";
import { toast } from "react-toastify";

const EditProduct = () => {
  const admin = useSelector((state) => state.user);
  const [updateProduct, { error, isLoading, isError, isSuccess }] =
    useUpdateProductMutation();
  const { id } = useParams();
  const [product, setProduct] = useState();
  const [pageLoading, setLoading] = React.useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`/products/${id}`, {
        headers: {
          Authorization: `Bearer ${admin.token}`,
        },
      })
      .then(({ data }) => {
        setLoading(false);
        setProduct(data.product);
      })
      .catch((e) => {
        setLoading(false);
        console.log(e);
        if (e.response.status === 401 || e.response.status === 403) {
          dispatch(logout());
          navigate("/");
        }
      });
  }, []);

  useEffect(() => {
    if (isSuccess) {
      navigate("/products");
      toast.success("Product update successfully");
    }
  }, [isSuccess]);

  if (pageLoading || isLoading) {
    return <Loading />;
  }

  const onSubmit = (data) => {
    updateProduct(data);
  };

  if (isError) {
    if (error.status === 401 || error.status === 403) {
      dispatch(logout());
      navigate("/");
    }
  }

  return (
    <>
      <Box>
        <Formik
          initialValues={{
            id: product?._id,
            name: product?.name,
            price: product?.price,
            quantity: product?.quantity,
            category: product?.category,
            description: product?.description,
            images: product?.images,
          }}
          validationSchema={Yup.object().shape({
            name: Yup.string()
              .min(6)
              .max(255)
              .required("Product name is required"),
            price: Yup.number().min(10).required("Price is required"),
            quantity: Yup.number()
              .min(1)
              .max(255)
              .required("Quantity is required"),
            category: Yup.string()
              .min(5)
              .max(255)
              .required("Category is required"),
            description: Yup.string()
              .min(50)
              .required("description is required"),
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
                error={Boolean(touched.name && errors.name)}
                sx={{
                  marginBottom: "20px",
                  background: "#fafafa",
                  borderRadius: "12px",
                  color: "#212121",
                  border: 0,
                }}
              >
                <InputLabel htmlFor="outlined-adornment-name-login">
                  Product name
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-name-login"
                  type="text"
                  value={values.name}
                  name="name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  label="Product name"
                  inputProps={{}}
                />
                {touched.name && errors.name && (
                  <FormHelperText
                    error
                    id="standard-weight-helper-text-name-login"
                  >
                    {errors.name}
                  </FormHelperText>
                )}
              </FormControl>

              <Grid container spacing={2}>
                <Grid item md={4}>
                  <FormControl
                    fullWidth
                    error={Boolean(touched.price && errors.price)}
                    sx={{
                      marginBottom: "20px",
                      background: "#fafafa",
                      borderRadius: "12px",
                      color: "#212121",
                      border: 0,
                    }}
                  >
                    <InputLabel htmlFor="outlined-adornment-price-login">
                      Price
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-price-login"
                      type="number"
                      value={values.price}
                      name="price"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      label="Price"
                      inputProps={{}}
                    />
                    {touched.price && errors.price && (
                      <FormHelperText
                        error
                        id="standard-weight-helper-text-price-login"
                      >
                        {errors.price}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item md={4}>
                  <FormControl
                    fullWidth
                    error={Boolean(touched.quantity && errors.quantity)}
                    sx={{
                      marginBottom: "20px",
                      background: "#fafafa",
                      borderRadius: "12px",
                      color: "#212121",
                      border: 0,
                    }}
                  >
                    <InputLabel htmlFor="outlined-adornment-quantity-login">
                      Quantity
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-quantity-login"
                      type="number"
                      value={values.quantity}
                      name="quantity"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      label="Quantity"
                      inputProps={{}}
                    />
                    {touched.quantity && errors.quantity && (
                      <FormHelperText
                        error
                        id="standard-weight-helper-text-quantity-login"
                      >
                        {errors.quantity}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item md={4}>
                  <FormControl
                    fullWidth
                    error={Boolean(touched.category && errors.category)}
                    sx={{
                      marginBottom: "20px",
                      background: "#fafafa",
                      borderRadius: "12px",
                      color: "#212121",
                      border: 0,
                    }}
                  >
                    <InputLabel htmlFor="outlined-adornment-category-login">
                      Category
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-category-login"
                      type="text"
                      value={values.category}
                      name="category"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      label="Category"
                      inputProps={{}}
                      disabled
                    />
                    {touched.category && errors.category && (
                      <FormHelperText
                        error
                        id="standard-weight-helper-text-category-login"
                      >
                        {errors.category}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
              </Grid>

              <FormControl
                fullWidth
                error={Boolean(touched.description && errors.description)}
                sx={{
                  marginBottom: "20px",
                  background: "#fafafa",
                  borderRadius: "12px",
                  color: "#212121",
                  border: 0,
                }}
              >
                <InputLabel htmlFor="outlined-adornment-description-login">
                  Description
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-description-login"
                  type="text"
                  value={values.description}
                  name="name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  label="Description"
                  inputProps={{}}
                  multiline
                  rows={8}
                />
                {touched.description && errors.description && (
                  <FormHelperText
                    error
                    id="standard-weight-helper-text-description-login"
                  >
                    {errors.description}
                  </FormHelperText>
                )}
              </FormControl>

              <Box>
                <Grid container spacing={2}>
                  {product?.images.map((img, i) => (
                    <>
                      <Grid key={i} item md={4}>
                        <img
                          src={img?.url}
                          style={{ width: "100%", height: "auto" }}
                          alt="img"
                        />
                      </Grid>
                    </>
                  ))}
                </Grid>
              </Box>

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
                  Submit
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    </>
  );
};

export default EditProduct;
