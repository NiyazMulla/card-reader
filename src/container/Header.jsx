import React from "react";
import AppLogo from "../assets/img/logo.jpg";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { redirectToOdishaOneFromCancel } from "../api/rationcard";
import axios from "axios";
import { getHeaders } from "../api/config";
function Header(props) {
  const onCancel = () => {
    let requestId = sessionStorage.getItem("REQUESTID");
    if (requestId) {
      redirectToOdishaOneFromCancel(requestId)
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            let url = `${res.data.ENDPOINT_URL}`;

            const formData = new FormData();
            formData.append("encData", res.data.encData);
            axios
              .post(url, formData, getHeaders())
              .then((res) => {
                console.log(res);
              })
              .catch((err) => {
                console.log(err);
                alert("Odish One API Error: " + err.message);
              });
          }
        })
        .catch((err) => {
          console.log(err);
          alert("BSKY API ERROR: " + err.message);
        });
    } else {
      alert("In Valid Session");
    }
  };
  return (
    <div className="header">
      <img src={AppLogo} />
      <div
        onClick={onCancel}
        className="fw-bold d-flex align-items-center my-2 text-white text-decoration-underline"
      >
        <ArrowBackIcon /> Back to Odisha One
      </div>
    </div>
  );
}

export default Header;
