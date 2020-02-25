import { IZtRoute, } from "@zt/core-framework";
import * as Loadables from "./loadables";

const routes: IZtRoute[] = [
  {
    path: "/BKRRKAPA",
    name: "MathNodeManagement",
    component: Loadables.MathNodeManagement,
  },

];
export default routes;
