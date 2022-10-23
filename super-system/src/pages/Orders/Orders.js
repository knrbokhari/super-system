import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Grid,
  IconButton,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
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
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "../../axios";
import Loading from "../../components/Loading/Loading";
import { logout } from "../../Features/UserSlice";
import moment from "moment";
import { toast } from "react-toastify";
import OrderBarChart from "../../components/BarChart/BarChart";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

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
  const stabilizedThis = array?.map((el, index) => [el, index]);
  stabilizedThis?.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis?.map((el) => el[0]);
};

const headCells = [
  {
    id: "email",
    numeric: false,
    disablePadding: true,
    label: "Email",
  },
  {
    id: "createdAt",
    numeric: false,
    disablePadding: false,
    label: "Date",
  },
  {
    id: "count",
    numeric: true,
    disablePadding: false,
    label: "Quantitys",
  },
  {
    id: "total",
    numeric: true,
    disablePadding: false,
    label: "Total Price",
  },
  {
    id: "status",
    numeric: true,
    disablePadding: false,
    label: "Status",
  },
  {
    id: "actions",
    numeric: true,
    disablePadding: false,
    label: "Actions",
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
          All Orders
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

const Orders = () => {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("calories");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [allOrders, setAllOrders] = useState(null);
  const [singalOrder, setSingelOrder] = useState(null);
  const [pageLoading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const token = `Bearer ${Cookies.get("token")}`;

  useEffect(() => {
    setLoading(true);
    axios
      .get(`/orders`, {
        headers: {
          Authorization: token,
        },
      })
      .then(({ data }) => {
        setLoading(false);
        setAllOrders(data);
        // console.log(data[0]);
      })
      .catch((e) => {
        setLoading(false);
        if (e.response.status === 401 || e.response.status === 403) {
          dispatch(logout());
          navigate("/");
        }
      });
  }, [isSuccess]);

  if (pageLoading) {
    return <Loading />;
  }

  const approvedOrder = allOrders?.filter(
    (order) => order.status === "shipped"
  ).length;

  const processingOrder = allOrders?.filter(
    (order) => order.status === "processing"
  ).length;

  const handleShippedOrder = async (id, ownerId) => {
    setLoading(true);
    await axios
      .patch(
        `/orders/${id}/mark-shipped`,
        { ownerId: ownerId },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((res) => {
        setLoading(false);
        setIsSuccess(!isSuccess);
        if (res.data) toast.success("Order has been shipped successfully.");
      })
      .catch((e) => {
        setLoading(false);
        console.log(e);
        if (e.response.status === 401 || e.response.status === 403) {
          dispatch(logout());
          navigate("/");
          Cookies.remove("token");
        }
      });
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = allOrders?.map((n) => n.name);
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
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - allOrders?.length) : 0;

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Grid container spacing={2}>
          <Grid item md={4}>
            <Box sx={{ mb: 4 }}>
              <CardWrappers
                text="Totals Orders"
                items={allOrders?.length}
                icon={<LocalShippingIcon />}
              />
            </Box>
          </Grid>
          <Grid item md={4}>
            <Box sx={{ mb: 4 }}>
              <CardWrappers
                text="Approved  Orders"
                items={approvedOrder}
                icon={<LocalShippingIcon />}
              />
            </Box>
          </Grid>
          <Grid item md={4}>
            <Box>
              <CardWrappers
                text="Pending  Orders"
                items={processingOrder}
                icon={<LocalShippingIcon />}
              />
            </Box>
          </Grid>
          <Grid item md={12}>
            <OrderBarChart title={"Last 7 day's Order"} />
          </Grid>
        </Grid>

        <Paper sx={{ width: "100%", mb: 2, mt: 5 }}>
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
                rowCount={allOrders?.length}
              />
              <TableBody>
                {stableSort(allOrders, getComparator(order, orderBy))
                  ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  ?.map((row, index) => {
                    const isItemSelected = isSelected(row.name);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        hover
                        onClick={(event) => handleClick(event, row.name)}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.name}
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
                          {row?.owner?.email}
                        </TableCell>
                        <TableCell align="left">
                          {moment(row?.createdAt).format("ll")}
                        </TableCell>
                        <TableCell align="right">{row?.count}</TableCell>
                        <TableCell align="right">{row?.total}</TableCell>
                        <TableCell align="right">
                          <Button
                            variant="contained"
                            color="secondary"
                            disabled={row?.status !== "processing"}
                            onClick={() =>
                              handleShippedOrder(row?._id, row?.owner?._id)
                            }
                          >
                            {row?.status}
                          </Button>
                        </TableCell>
                        <TableCell
                          align="right"
                          onClick={() => setSingelOrder(row)}
                        >
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={handleOpen}
                          >
                            View
                          </Button>
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
            count={allOrders?.length}
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
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Order Details
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 1 }}>
            Name: {singalOrder?.owner?.name}
          </Typography>
          <Typography id="modal-modal-description">
            Email: {singalOrder?.owner?.email}
          </Typography>
          {singalOrder?.products?.map((pro) => (
            <Typography id="modal-modal-description">
              Item: {pro?.cartId?.product?.name}
            </Typography>
          ))}
          <Typography id="modal-modal-description">
            Quantity: {singalOrder?.count}
          </Typography>
          <Typography id="modal-modal-description">
            Total: {singalOrder?.total}
          </Typography>
          <Typography id="modal-modal-description">
            Address: {singalOrder?.address}, {singalOrder?.country}.
          </Typography>
          <Typography id="modal-modal-description">
            Status: {singalOrder?.status}
          </Typography>
        </Box>
      </Modal>
    </>
  );
};

export default Orders;
