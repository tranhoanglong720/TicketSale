import ListTicket from "../pages/listTicket/PageListTicket";

import Home from "../pages/home/Home";
import ServicePack from "../pages/servicepack/ServicePack";
import CheckTicket from "../pages/checkTicket/CheckTicket";

const publicRoutes = [
  { path: "/", component: ListTicket },
  { path: "/setting", component: ServicePack },
  { path: "/checkTicket", component: CheckTicket },
  { path: "/home", component: Home },
];

const privateRoutes: any = [];

export { publicRoutes, privateRoutes };
