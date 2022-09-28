import React, { useState } from "react";
import "./NewProduct.scss";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";

const New = ({ title }) => {
  const [file, setFile] = useState("");

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>

              <div className="formInput">
                <label>Title</label>
                <input type="text" placeholder="" />
              </div>

              <div className="formInput">
                <label></label>
                <input type="" placeholder="product name" />
              </div>

              <div className="formInput">
                <label>Description</label>
                <input type="text" placeholder="Description" />
              </div>

              <div className="formInput">
                <label>Category</label>
                <input type="text" placeholder="Category" />
              </div>

              <div className="formInput">
                <label>Price</label>
                <input type="number" placeholder="Price" />
              </div>

              {/* <div className="formInput">
                <label>Quantity</label>
                <input type="number" placeholder="Quantity" />
              </div> */}

              <button>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;
