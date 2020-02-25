import "../styles/MathNodeManagement.css";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import { GuidProvider, } from '../../uBkrVeriOperasyonu/dataProviders/GuidProvider';
import { IBaseProps, } from "@zt/base-components";
import { ICustomDefinedComplexServiceNode, } from '../../uBkrVeriOperasyonu/interfaces/ICustomDefinedComplexServiceNode';
import React, { useState, } from "react";
import { CurrentDefinedNodes, } from "./components/CurrentDefinedNodes";
import { IMathNode, } from '../../uBkrVeriOperasyonu/interfaces/IMathNode';

export interface IMathNodeManagementProps extends IBaseProps {}
export interface IMathNodeManagementState {
  CustomDefinedComplexServiceNodes?: IMathNode[];
  SelectedCustomDefinedComplexServiceNode?: ICustomDefinedComplexServiceNode;
  ResultData?: any;
}

export function MathNodeManagement (props: IMathNodeManagementProps) {
  const [ guid, setGuid, ] = useState<string>("");

  return (
    <div className="math-node-management-root">
      <h1>{props.screenName}</h1>
      <div className="guid-generator-container">
        <button className="guid-generate" onClick={async () => {
          const newGuid = await GuidProvider.GetGuid();
          setGuid(newGuid);
        }}>Generate Guid</button>
        <label className="guid">{guid}</label>
      </div>
      <CurrentDefinedNodes screenName={props.screenName} uniqueID={props.uniqueID}></CurrentDefinedNodes>
    </div>
  );
};
