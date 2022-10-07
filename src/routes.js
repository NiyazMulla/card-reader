import React from "react";

export const LINK_CUSTOMER_SEARCH = "/";
export const LINK_MEMBER_LIST = "/members";

const HOME = React.lazy(() => import("./views/HomePage"));
const MEMBER_LIST = React.lazy(() => import("./views/MemberList"));

const routes = [
  {
    exact: true,
    path: LINK_CUSTOMER_SEARCH,
    component: HOME,
  },
  {
    exact: true,
    path: LINK_MEMBER_LIST,
    component: MEMBER_LIST,
  },
];
export default routes;
