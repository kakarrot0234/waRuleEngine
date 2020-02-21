import { createZtContext, ZtContext, } from "@zt/core-framework";
import React from "react";
import { BrowserRouter, } from "react-router-dom";
import * as Loadables from "./config/loadables";
import { MathNodeManagement, } from "./views/MathNodeManagement";

interface IAppProps {}

const App: React.FunctionComponent<IAppProps> = () => {
  const context = createZtContext();
  return (
    <ZtContext.Provider value={context}>
      <BrowserRouter>
        {context.authenticated ? <MathNodeManagement screenName="BKRTCUSE" uniqueID="app" /> : <Loadables.Login />}
      </BrowserRouter>
    </ZtContext.Provider>
  );
};
export default App;
