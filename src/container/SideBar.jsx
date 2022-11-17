import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CardMembershipIcon from "@mui/icons-material/CardMembership";
import HomeIcon from "@mui/icons-material/Home";
import PrintIcon from "@mui/icons-material/Print";
import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import { redirectToOdishaOneFromCancel } from "../api/rationcard";
import * as routes from "../routes";
const ITEMS = [
  {
    icon: HomeIcon,
    label: "Home",
    path: routes.LINK_CUSTOMER_SEARCH,
  },
  {
    icon: PrintIcon,
    label: "Print Card",
    path: routes.LINK_PRINT_CARD,
  },
  {
    icon: CardMembershipIcon,
    label: "View Card",
    path: routes.LINK_VIEW_CARD,
  },
];

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
      {ITEMS.map((data, index) => {
        return (
          <Link
            className="fw-bold d-flex align-items-center my-2 text-black "
            key={index}
            to={data.path}
          >
            <data.icon /> {data.label}
          </Link>
        );
      })}
    </div>
  );
}

export default SideBar;
