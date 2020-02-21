import { ZtMaster, } from "@zt/base-components";
import React from "react";
import routes from "../config/routes";
interface IHomeProps {}

const Login: React.FunctionComponent<IHomeProps> = () => {
  return <ZtMaster routes={routes} />;
};
export default Login;
