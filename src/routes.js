import React from "react";

export const LINK_CUSTOMER_SEARCH = "/";
export const LINK_MEMBER_LIST = "/members";
export const LINK_CARD_LIST = "/members/card/detail";

const HOME = React.lazy(() => import("./views/HomePage"));
const MEMBER_LIST = React.lazy(() => import("./views/MemberList"));
const CARD_LIST = React.lazy(() => import("./views/CardDetailList"));

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
  {
    exact: true,
    path: LINK_CARD_LIST,
    component: CARD_LIST,
  },
];
export default routes;
