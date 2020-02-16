import "../css/MathNodeManagement.css";

import * as React from "react";
import { useState } from "react";

import { GuidProvider } from "../dataProviders/GuidProvider";
import { ICustomDefinedComplexServiceNode } from "../interfaces/ICustomDefinedComplexServiceNode";
import { IMathNode } from "../interfaces/IMathNode";
import { CurrentDefinedNodes } from "./CurrentDefinedNodes";

export interface IMathNodeManagementProps {}
export interface IMathNodeManagementState {
  CustomDefinedComplexServiceNodes?: IMathNode[];
  SelectedCustomDefinedComplexServiceNode?: ICustomDefinedComplexServiceNode;
  ResultData?: any;
}

export function MathNodeManagement (props: IMathNodeManagementProps) {
  const [ guid, setGuid, ] = useState<string>("");

  return (
    <div className="math-node-management-root">
      <div className="guid-generator-container">
        <button className="guid-generate" onClick={async () => {
          const newGuid = GuidProvider.GetGuid();
          setGuid(newGuid);
        }}>Generate Guid</button>
        <label className="guid">{guid}</label>
      </div>
      <CurrentDefinedNodes></CurrentDefinedNodes>
    </div>
  );
}
