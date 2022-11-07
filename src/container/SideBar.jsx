import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CardMembershipIcon from "@mui/icons-material/CardMembership";
import HomeIcon from "@mui/icons-material/Home";
import PrintIcon from "@mui/icons-material/Print";
import React from "react";
import { Link } from "react-router-dom";
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
  return (
    <div className="">
      <a href="" className="fw-bold d-flex align-items-center my-2 text-black ">
        <ArrowBackIcon /> Back to Odisha One
      </a>
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
