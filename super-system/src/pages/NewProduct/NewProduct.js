import React, { useState } from "react";
import "./NewProduct.scss";
import {
  Autocomplete,
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import * as Yup from "yup";
import { Formik } from "formik";
import { useCreateProductMutation } from "../../Api/Api";
import axios from "../../axios";
import DeleteIcon from "@mui/icons-material/Delete";
import UploadIcon from "../../img/upload-icon.png";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loading from "../../components/Loading/Loading";

const NewProduct = () => {
  const [createProduct, { isError, error, isLoading }] =
    useCreateProductMutation();
  const [images, setImages] = useState([]);
  const [imgToRemove, setImgToRemove] = useState(null);
  const navigate = useNavigate();

  // get Bearer token from Cookie
  const token = `Bearer ${Cookies.get("token")}`;

  const showWidget = () => {
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: "dbnaeem",
        uploadPreset: "l7km97n1",
      },
      (error, result) => {
        if (!error && result.event === "success") {
          setImages((prev) => [
            ...prev,
            { url: result.info.url, public_id: result.info.public_id },
          ]);
        }
      }
    );
    widget.open();
  };

  const handleRemoveImg = (imgObj) => {
    setImgToRemove(imgObj.public_id);
    axios
      .delete(`/images/${imgObj.public_id}/`, {
        headers: { Authorization: token },
      })
      .then((res) => {
        setImgToRemove(null);
        setImages((prev) =>
          prev.filter((img) => img.public_id !== imgObj.public_id)
        );
      })
      .catch((e) => console.log(e));
  };

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    toast.error(error.message);
  }

  const onSubmit = (data) => {
    const { name, description, price, quantity, category } = data;
    createProduct({
      name,
      description,
      price: parseInt(price),
      quantity: parseInt(quantity),
      category,
      images,
    }).then((res) => {
      console.log(res);
      if (res.data.success) {
        setTimeout(() => {
          navigate("/products");
          toast.success("Product Created");
        }, 1500);
      }
    });
  };

  const options = () => [
    { label: "Phones", value: "phones" },
    { label: "Technology", value: "technology" },
    { label: "Laptop", value: "laptop" },
  ];
  return (
    <>
      <Box>
        <Typography variant="h4" sx={{ mb: 5 }} gutterBottom>
          Add new product
        </Typography>

        <Card>
          <CardContent>
            <Formik
              initialValues={{
                name: "",
                price: "",
                quantity: "",
                category: "",
                description: "",
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
                        <Autocomplete
                          disablePortal
                          id="outlined-adornment-category-login"
                          options={options()}
                          name="category"
                          onChange={(event, v) => (values.category = v?.value)}
                          fullWidth
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Category"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              error={Boolean(
                                touched.category && errors.category
                              )}
                            />
                          )}
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
                      name="description"
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

                  <Grid container spacing={2}>
                    <Grid item md={3}>
                      <Box type="button" onClick={showWidget}>
                        <img
                          src={UploadIcon}
                          style={{
                            width: "80%",
                            height: "auto",
                            padding: "0 15px",
                            cursor: "pointer",
                          }}
                          alt="UploadIcon"
                        />
                        {!images.length && (
                          <p style={{ color: "red" }}>image is required.</p>
                        )}
                      </Box>
                    </Grid>
                    {images.map((image, i) => (
                      <Grid key={(i += 1)} item md={3}>
                        <img
                          src={image?.url}
                          style={{ width: "100%", height: "auto" }}
                          alt=""
                          onClick={() => handleRemoveImg(image)}
                        />
                        {imgToRemove !== image.public_id && (
                          <DeleteIcon
                            sx={{
                              position: "relative",
                              top: "-30px",
                              color: "red",
                              cursor: "pointer",
                            }}
                            onClick={() => handleRemoveImg(image)}
                          />
                        )}
                      </Grid>
                    ))}
                  </Grid>

                  <Box sx={{ mt: 2 }}>
                    <Button
                      disableElevation
                      disabled={isSubmitting || !images.length}
                      fullWidth
                      size="large"
                      type="submit"
                      variant="contained"
                      color="secondary"
                    >
                      Create Product
                    </Button>
                  </Box>
                </form>
              )}
            </Formik>
          </CardContent>
        </Card>
      </Box>
    </>
  );
};

export default NewProduct;
