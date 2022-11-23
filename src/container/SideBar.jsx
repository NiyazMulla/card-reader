import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import React from "react";
import { redirectToOdishaOneFromCancel } from "../api/rationcard";

function SideBar(props) {
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
              .post(url, formData)
              .then((res) => {
                console.log(res);
              })
              .catch((err) => {
                console.log(err);
              });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      alert("In Valid Session");
    }
  };
  return (
    <div className="">
      <div
        onClick={onCancel}
        className="fw-bold d-flex align-items-center my-2 text-black text-decoration-underline"
      >
        <ArrowBackIcon /> Back to Odisha One
      </div>
    </div>
  );
}

export default SideBar;
