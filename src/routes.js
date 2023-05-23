import React from "react";

export const LINK_CUSTOMER_SEARCH = "/";
export const LINK_MEMBER_LIST = "/members";
export const LINK_CARD_LIST = "/members/card/detail";
export const LINK_NEW_CARD = "/members/new/card";

export const LINK_PRINT_CARD = "/print/card";

export const LINK_VIEW_CARD = "/view/card";

export const LINK_REPORTS = '/reports/delivery'

const HOME = React.lazy(() => import("./views/HomePage"));
const MEMBER_LIST = React.lazy(() => import("./views/MemberList"));
const CARD_LIST = React.lazy(() => import("./views/CardDetailList"));
const NEW_CARD = React.lazy(() => import("./views/NewCard"));
const PRINT_CARD = React.lazy(() => import("./views/PrintCard"));
const VIEW_CARD = React.lazy(() => import("./views/ViewCard"));
const REPORTS_DELIVERY = React.lazy(() => import("./views/Reports/Delivery"));

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
  {
    exact: true,
    path: LINK_NEW_CARD,
    component: NEW_CARD,
  },
  {
    exact: true,
    path: LINK_PRINT_CARD,
    component: PRINT_CARD,
  },
  {
    exact: true,
    path: LINK_VIEW_CARD,
    component: VIEW_CARD,
  },
  {
    exact: true,
    path: LINK_REPORTS,
    component: REPORTS_DELIVERY,
  },
];
export default routes;
