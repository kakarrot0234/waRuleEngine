import { IZtRoute, } from "@zt/core-framework";
import * as Loadables from "./loadables";

const routes: IZtRoute[] = [
  {
    path: "/BKRTCUSE",
    name: "MathNodeManagement",
    component: Loadables.MathNodeManagement,
  },

];
export default routes;
