import React, { useEffect } from "react";
import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  Grid,
  IconButton,
  Modal,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import { visuallyHidden } from "@mui/utils";
import { alpha } from "@mui/material/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import CardWrappers from "../../components/CardWrappers/CardWrappers";
import InventoryIcon from "@mui/icons-material/Inventory";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "../../axios";
import { logout } from "../../Features/UserSlice";
import Loading from "../../components/Loading/Loading";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import { useTheme } from "@mui/material/styles";
import { useDeleteProductMutation } from "../../Api/Api";
import { toast } from "react-toastify";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const descendingComparator = (a, b, orderBy) => {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
};

const getComparator = (order, orderBy) => {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
};

const stableSort = (array, comparator) => {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
};

const headCells = [
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "Product Name",
  },
  {
    id: "category",
    numeric: false,
    disablePadding: false,
    label: "Category",
  },
  {
    id: "price",
    numeric: true,
    disablePadding: false,
    label: "Price",
  },
  {
    id: "quantity",
    numeric: true,
    disablePadding: false,
    label: "Quantity",
  },
  {
    id: "totalSell",
    numeric: true,
    disablePadding: false,
    label: "Total Sales",
  },
  {
    id: "button",
    numeric: true,
    disablePadding: false,
    label: "A",
  },
];

const EnhancedTableHead = (props) => {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const EnhancedTableToolbar = (props) => {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          All Products
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "12px",
  boxShadow: 24,
  p: 4,
};

const Products = () => {
  const admin = useSelector((state) => state.user);
  const [deletProduct, { isLoading, isSuccess }] = useDeleteProductMutation();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [products, setProducts] = React.useState([]);
  const [singleProduct, setSingleProduct] = React.useState(null);
  const [pageLoading, setLoading] = React.useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [openDelectModal, setOpenDelectModal] = React.useState(false);
  const [delectProduct, setDelectProduct] = React.useState(null);
  const [viewProduct, setViewProduct] = React.useState(null);
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpenDelectModal = () => setOpenDelectModal(true);
  const handleCloseDelectModal = () => setOpenDelectModal(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`/products`, {
        headers: {
          Authorization: `Bearer ${admin.token}`,
        },
      })
      .then(({ data }) => {
        setLoading(false);
        setProducts(data);
      })
      .catch((e) => {
        setLoading(false);
        console.log(e);
        if (e.response.status === 401 || e.response.status === 403) {
          dispatch(logout());
          navigate("/");
        }
      });
  }, [isSuccess]);

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  console.log(viewProduct);

  if (pageLoading || isLoading) {
    return <Loading />;
  }

  const handleDeleteProduct = (id, name) => {
    deletProduct({ product_id: id });
    toast(`${name} has been Deleted`);
    handleCloseDelectModal();
  };

  const handleEditProduct = (id) => {
    navigate(`/product/${id}`);
  };

  const handleSingleProduct = (name) => {
    const product = products.find((p) => p.name === name);
    if (!!product) {
      setSingleProduct([product]);
    } else {
      setSingleProduct(null);
    }
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = (singleProduct ? singleProduct : products).map(
        (n) => n.name
      );
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - products.length) : 0;

  console.log(viewProduct?.images);
  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Grid container spacing={2}>
          <Grid item md={4}>
            <Box sx={{ mb: 5 }}>
              <CardWrappers
                text="All Products"
                items={products.length}
                icon={<InventoryIcon />}
              />
            </Box>
          </Grid>
          <Grid item md={4}>
            <Box sx={{ mb: 5 }}>
              <CardWrappers
                text="Available"
                items={
                  products.filter((product) => product?.quantitys !== 0).length
                }
                icon={<InventoryIcon />}
              />
            </Box>
          </Grid>
          <Grid item md={4}>
            <Box sx={{ mb: 5 }}>
              <CardWrappers
                text="Stock Out"
                items={
                  products.filter((product) => product?.quantitys === 0).length
                }
                icon={<InventoryIcon />}
              />
            </Box>
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item md={8}>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={products?.map((i) => i.name)}
              onChange={(event, value) => handleSingleProduct(value)}
              fullWidth
              renderInput={(params) => (
                <TextField {...params} label="Product" />
              )}
            />
          </Grid>
          <Grid item md={4}>
            <Button
              variant="contained"
              color="success"
              sx={{ height: "55px", fontSize: "18px" }}
              fullWidth
              onClick={() => navigate("/product/create")}
            >
              Add Product
            </Button>
          </Grid>
        </Grid>

        <Paper sx={{ width: "100%", mb: 2, mt: 3 }}>
          <EnhancedTableToolbar numSelected={selected.length} />
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size={dense ? "small" : "medium"}
            >
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={
                  singleProduct ? singleProduct.length : products.length
                }
              />
              <TableBody>
                {stableSort(
                  singleProduct ? singleProduct : products,
                  getComparator(order, orderBy)
                )
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const isItemSelected = isSelected(row?.name);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        hover
                        onClick={(event) => handleClick(event, row?.name)}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row?.name}
                        selected={isItemSelected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            color="primary"
                            checked={isItemSelected}
                            inputProps={{
                              "aria-labelledby": labelId,
                            }}
                          />
                        </TableCell>
                        <TableCell
                          component="th"
                          id={labelId}
                          scope="row"
                          padding="none"
                        >
                          {row?.name}
                        </TableCell>
                        <TableCell align="left">{row?.category}</TableCell>
                        <TableCell align="right">{row?.price}</TableCell>
                        <TableCell align="right">{row?.quantity}</TableCell>
                        <TableCell align="right">{row?.totalSell}</TableCell>
                        <TableCell align="right">
                          <Stack direction="row" spacing={1}>
                            <IconButton
                              aria-label="view"
                              onClick={() => setViewProduct(row)}
                            >
                              <VisibilityIcon onClick={handleOpen} />
                            </IconButton>
                            <IconButton
                              aria-label="edit"
                              color="primary"
                              onClick={() => handleEditProduct(row?._id)}
                            >
                              <EditIcon />
                            </IconButton>

                            <IconButton
                              sx={{ color: "red" }}
                              aria-label="delete"
                              onClick={() => setDelectProduct(row)}
                            >
                              <DeleteIcon onClick={handleOpenDelectModal} />
                            </IconButton>
                          </Stack>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: (dense ? 33 : 53) * emptyRows,
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={products.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} style={{ width: "800px" }}>
          <Grid container spacing={2}>
            <Grid item md={6}>
              <AutoPlaySwipeableViews
                axis={theme.direction === "rtl" ? "x-reverse" : "x"}
                index={activeStep}
                onChangeIndex={handleStepChange}
                enableMouseEvents
              >
                {viewProduct?.images?.map((step, index) => (
                  <div key={index}>
                    {Math.abs(activeStep - index) <= 2 ? (
                      <Box
                        component="img"
                        sx={{
                          height: 255,
                          display: "block",
                          maxWidth: 400,
                          overflow: "hidden",
                          width: "100%",
                        }}
                        src={step.url}
                        alt="img"
                      />
                    ) : null}
                  </div>
                ))}
              </AutoPlaySwipeableViews>
            </Grid>
            <Grid item md={6}>
              <Typography>Name: {viewProduct?.name}</Typography>
              <Typography>Price: ${viewProduct?.price}</Typography>
              <Typography>Category: {viewProduct?.category}</Typography>
              <Typography>Quantity: {viewProduct?.quantity}</Typography>
              <Typography>Total Sell: {viewProduct?.totalSell}</Typography>
            </Grid>
          </Grid>
          <Typography sx={{ mt: 1 }}>
            Description: {viewProduct?.description}
          </Typography>
        </Box>
      </Modal>

      <Modal
        open={openDelectModal}
        onClose={handleCloseDelectModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Are you sure?
          </Typography>
          <Typography id="modal-modal-description">
            Do you want to Delete {delectProduct?.name}?
          </Typography>
          <Grid container spacing={2} sx={{ mt: 1, justifyContent: "center" }}>
            <Grid item sx={6}>
              <Button
                variant="contained"
                color="info"
                onClick={handleCloseDelectModal}
              >
                cancel
              </Button>
            </Grid>
            <Grid item sx={6}>
              <Button
                variant="contained"
                color="error"
                onClick={() =>
                  handleDeleteProduct(delectProduct?._id, delectProduct?.name)
                }
              >
                delete
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </>
  );
};

export default Products;
