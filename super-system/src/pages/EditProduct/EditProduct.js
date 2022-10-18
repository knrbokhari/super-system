import axios from "../../axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../Features/UserSlice";
import Loading from "../../components/Loading/Loading";

const EditProduct = () => {
  const admin = useSelector((state) => state.user);
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
        console.log(data.product);
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

  if (pageLoading) {
    return <Loading />;
  }

  return <>EditProduct</>;
};

export default EditProduct;
