import ListTicket from "../pages/listTicket/ListTicket";
import Home from "../pages/home/Home";

const publicRoutes = [
  { path: "/", component: ListTicket },
  { path: "/home", component: Home },
];

const privateRoutes: any = [];

export { publicRoutes, privateRoutes };
