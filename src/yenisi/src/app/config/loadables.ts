import { ZtLoadable, } from "@zt/core-framework";

export const Home = ZtLoadable({
  loader: () => {
    return import(/* webpackChunkName: "Home" */ "../components/Home");
  },
});
export const Login = ZtLoadable({
  loader: () => {
    return import(/* webpackChunkName: "Login" */ "../components/Login");
  },
});
export const MathNodeManagement = ZtLoadable({
  loader: () => {
    return import(/* webpackChunkName: "MathNodeManagement" */ "../views/MathNodeManagement");
  },
});
