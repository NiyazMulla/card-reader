import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import { Link } from "react-router-dom";
import * as routes from "../routes";
const ITEMS = [
  {
    icon: HomeIcon,
    label: "Home",
    path: routes.LINK_CUSTOMER_SEARCH,
  },
];
function SideBar(props) {
  return (
    <div className="">
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
