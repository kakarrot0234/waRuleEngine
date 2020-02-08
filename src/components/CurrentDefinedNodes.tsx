import "../css/CurrentDefinedNodes.css";

import { GridOptions, GridReadyEvent, GridSizeChangedEvent, SelectionChangedEvent } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { useEffect, useState } from "react";
import * as React from "react";

import { CustomDefinedComplexServiceNodeProvider } from "../dataProviders/CustomDefinedComplexServiceNodeProvider";
import { CustomDefinedDataServiceNodeProvider } from "../dataProviders/CustomDefinedDataServiceNodeProvider";
import { EnumMathNodeType } from "../enums/EnumMathNodeType";
import { MathNodeTreeFormuletor } from "../Helpers/MathNodeTreeFormuletor";
import { StringOptions } from "../Helpers/StringOptions";
import { ICustomDefinedDataServiceNode } from "../interfaces/ICustomDefinedDataServiceNode";
import { IMathNode } from "../interfaces/IMathNode";
import { IOperandDefinition } from "../interfaces/IOperandDefinition";
import CustomTextArea from "./TextArea";

export interface ICurrentDefinedNodesProps {
  ClassName?: string;
}
interface ICurrentDefinedNodesState {
    MathNodes?: IMathNode[];
    DataServiceNodes?: ICustomDefinedDataServiceNode[];
    SelectedMathNode?: IMathNode;
    SelectedDataServiceNode?: ICustomDefinedDataServiceNode;
    EditingMathNode?: IMathNode;
    EditingDataServiceNode?: ICustomDefinedDataServiceNode;
    GridOptionsCurrentMathNodes?: GridOptions;
    GridOptionsCurrentDataServiceNodes?: GridOptions;
}

export function CurrentDefinedNodes (props: ICurrentDefinedNodesProps) {
  const [ state, setState, ] = useState<ICurrentDefinedNodesState>({
    GridOptionsCurrentMathNodes: getGridOptionsCurrentMathNodes(),
    GridOptionsCurrentDataServiceNodes: getGridOpstionsCurrentDataServiceNodes(),
  });
  useEffect(() => {
    console.log("loaded");
    load().then(() => {}, (reason) => {console.log(reason);});
  }, []);

  async function load (): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      try {
        const currentMathNodeProvider = new CustomDefinedComplexServiceNodeProvider();
        const initMathNodes = await currentMathNodeProvider.GetAllCustomDefinedComplexServiceNodes();
        const currentDataServiceNodeProvider = new CustomDefinedDataServiceNodeProvider();
        const initDataServiceNodes = await currentDataServiceNodeProvider.GetAllCustomDefinedDataServiceNodes();
        setState((previousState) => {
          return {
            ...previousState,
            MathNodes: initMathNodes,
            DataServiceNodes: initDataServiceNodes,
          };
        });
        return resolve();
      } catch (error) {
        return reject(error);
      }
    });
  }
  function getGridOptionsCurrentMathNodes () {
    const gridOptions: GridOptions = {
      columnDefs: [
        {
          headerName: "Id",
          field: "Id",
          width: 75,
          suppressAutoSize: true,
        },
        {
          headerName: "Node Tipi",
          field: "EnumMathNodeType",
          valueFormatter: (valueFormatterParams) => {
            if (valueFormatterParams.value != null) {
              const currentValue: EnumMathNodeType = valueFormatterParams.value;
              return EnumMathNodeType[currentValue].toString();
            }
            return valueFormatterParams.value;
          },
        },
        {
          headerName: "Operand Key",
          field: "Operand",
          valueFormatter: (valueFormatterParams) => {
            if (valueFormatterParams.value != null) {
              const currentValue: IOperandDefinition = valueFormatterParams.value;
              return currentValue.Key;
            }
            return valueFormatterParams.value;
          },
        },
        {
          headerName: "Complex Math Expression",
          field: "ComplexMathExpression",
        },
        {
          headerName: "Açıklaması",
          field: "Description",
        },
      ],
      masterDetail: false,
      isRowMaster: (dataItem: IMathNode) => {
        return dataItem.OperandParameters != null && dataItem.OperandParameters.count > 0;
      },
      suppressCellSelection: true,
      rowSelection: "single",
      onGridReady,
      onSelectionChanged: onSelectionChangedCurrentMathNodes,
      onGridSizeChanged,
    };
    return gridOptions;
  }
  function getGridOpstionsCurrentDataServiceNodes () {
    const gridOptions: GridOptions = {
      columnDefs: [
        {
          headerName: "Id",
          field: "Id",
          width: 75,
          suppressAutoSize: true,
        },
        {
          headerName: "Data Key",
          field: "DataKey",
        },
        {
          headerName: "Description",
          field: "Description",
        },
      ],
      suppressCellSelection: true,
      rowSelection: "single",
      onSelectionChanged: onSelectionChangedDataServiceNode,
      onGridReady,
      onGridSizeChanged,
    };
    return gridOptions;
  }
  function onGridReady (gridReadyEvent: GridReadyEvent) {
    gridReadyEvent.api.sizeColumnsToFit();
  }
  function onGridSizeChanged (gridSizeChangedEvent: GridSizeChangedEvent) {
    gridSizeChangedEvent.api.sizeColumnsToFit();
  }
  function onSelectionChangedCurrentMathNodes (selectionChangedEvent: SelectionChangedEvent) {
    const selectedNodes: IMathNode[] = selectionChangedEvent.api.getSelectedRows();
    if (selectedNodes != null && selectedNodes.count > 0) {
      setState((previousState) => {
        return { ...previousState, SelectedMathNode: selectedNodes[0], EditingMathNode: {
          ComplexMathExpression: selectedNodes[0].ComplexMathExpression,
          Description: selectedNodes[0].Description,
        }, };
      });
    }
  }
  function onSelectionChangedDataServiceNode (selectionChangedEvent: SelectionChangedEvent) {
    const selectedNodes: ICustomDefinedDataServiceNode[] = selectionChangedEvent.api.getSelectedRows();
    if (selectedNodes != null && selectedNodes.count > 0) {
      setState((previousState) => {
        return {
          ...previousState,
          SelectedDataServiceNode: selectedNodes[0],
          EditingDataServiceNode: { ...selectedNodes[0], },
        };
      });
    }
  }
  async function updateMathNode (): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      try {
        const nodeToBeUpdate = state.SelectedMathNode!;
        const newMathDefinition = state.EditingMathNode!.ComplexMathExpression;
        const newDescription = state.EditingMathNode!.Description;

        const formuletor = new MathNodeTreeFormuletor();
        const updatedNode = await formuletor.UpdateMathNode(nodeToBeUpdate, newMathDefinition, newDescription);
        if (updatedNode != null) {
          const serviceNodeProvider = new CustomDefinedComplexServiceNodeProvider();
          await serviceNodeProvider.SaveCustomDefinedCompexServiceNodes(updatedNode, nodeToBeUpdate.ParentNode);
          const currentNodeProvider = new CustomDefinedComplexServiceNodeProvider();
          const newNodes = await currentNodeProvider.GetAllCustomDefinedComplexServiceNodes();
          setState((previousState) => {
            return {
              ...previousState,
              MathNodes: newNodes,
            };
          });
        }
        return resolve();
      } catch (error) {
        return reject(error);
      }
    });
  }
  async function addMathNode (): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      try {
        if (state.EditingMathNode != null && !StringOptions.isNullOrEmpty(state.EditingMathNode.ComplexMathExpression)) {
          const formuletor = new MathNodeTreeFormuletor();
          const createdNode = await formuletor.CreateMathNode(state.EditingMathNode.ComplexMathExpression!, state.EditingMathNode.Description);
          if (createdNode != null) {
            const serviceNodeProvider = new CustomDefinedComplexServiceNodeProvider();
            await serviceNodeProvider.SaveCustomDefinedCompexServiceNodes(createdNode);
            const currentNodeProvider = new CustomDefinedComplexServiceNodeProvider();
            const newNodes = await currentNodeProvider.GetAllCustomDefinedComplexServiceNodes();
            setState((previousState) => {
              return {
                ...previousState,
                MathNodes: newNodes,
              };
            });
          }
        }
        return resolve();
      } catch (error) {
        return reject(error);
      }
    });
  }
  async function updateDataServiceNode (): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      try {
        const nodeToUpdate = state.SelectedDataServiceNode;
        if (nodeToUpdate != null && state.EditingDataServiceNode != null) {
          const dataServiceNodeProvider = new CustomDefinedDataServiceNodeProvider();
          await dataServiceNodeProvider.SaveCustomDefinedDataServiceNodes(state.EditingDataServiceNode);
          const newNodes = await dataServiceNodeProvider.GetAllCustomDefinedDataServiceNodes();
          setState((previousState) => {
            return {
              ...previousState,
              DataServiceNodes: newNodes,
            };
          });
        }
        return resolve();
      } catch (error) {
        return reject(error);
      }
    });
  }
  async function addDataServiceNode (): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      try {
        const nodeToBeAdd = state.EditingDataServiceNode;
        if (nodeToBeAdd != null) {
          const dataServiceNodeProvider = new CustomDefinedDataServiceNodeProvider();
          await dataServiceNodeProvider.SaveCustomDefinedDataServiceNodes({
            ...nodeToBeAdd,
            Guid: undefined,
            Id: undefined,
            ActiveCd: "A",
          });
          const newNodes = await dataServiceNodeProvider.GetAllCustomDefinedDataServiceNodes();
          setState((previousState) => {
            return {
              ...previousState,
              DataServiceNodes: newNodes,
            };
          });
        }
        return resolve();
      } catch (error) {
        return reject(error);
      }
    });
  }

  return (
    <div className={`current-defined-nodes-root ${props.ClassName != null ? props.ClassName : ""}`}>
      <div className="math-nodes">
        <div className="grid-container">
          <AgGridReact
            gridOptions={state.GridOptionsCurrentMathNodes}
            rowData={state.MathNodes}></AgGridReact>
        </div>
        <CustomTextArea
          description="Math Expression"
          value={state.EditingMathNode != null ? state.EditingMathNode.ComplexMathExpression : ""}
          onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
            setState((previousState) => {
              return {
                ...previousState,
                EditingMathNode: {
                  ...previousState.EditingMathNode,
                  ComplexMathExpression: event.target.value,
                },
              };
            });
          }}></CustomTextArea>
        <CustomTextArea
          description="Description"
          value={state.EditingMathNode != null ? state.EditingMathNode.Description : ""}
          onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
            event.persist();
            setState((previousState) => {
              return {
                ...previousState,
                EditingMathNode: {
                  ...previousState.EditingMathNode,
                  Description: event.target.value,
                },
              };
            });
          }}></CustomTextArea>
        <button
          disabled={state.SelectedMathNode == null}
          onClick={async () => {
            await updateMathNode();
          }}>Update</button>
        <button
          disabled={state.EditingMathNode == null || StringOptions.isNullOrEmpty(state.EditingMathNode.ComplexMathExpression)}
          onClick={async () => {
            await addMathNode();
          }}>Add</button>
      </div>
      <div className="math-node-editor">
        <div className="grid-container">
          <AgGridReact
            gridOptions={state.GridOptionsCurrentDataServiceNodes}
            rowData={state.DataServiceNodes}></AgGridReact>
        </div>
        <CustomTextArea
          description="Data Key"
          value={state.EditingDataServiceNode != null ? state.EditingDataServiceNode.DataKey : ""}
          onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
            event.persist();
            setState((previousState) => {
              return {
                ...previousState,
                EditingDataServiceNode: {
                  ...state.EditingDataServiceNode,
                  DataKey: event.target.value,
                },
              };
            });
          }}></CustomTextArea>
        <CustomTextArea
          description="Description"
          value={state.EditingDataServiceNode != null ? state.EditingDataServiceNode.Description : ""}
          onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
            event.persist();
            setState((previousState) => {
              return {
                ...previousState,
                EditingDataServiceNode: {
                  ...state.EditingDataServiceNode,
                  Description: event.target.value,
                },
              };
            });
          }}></CustomTextArea>
        <button
          disabled={state.SelectedDataServiceNode == null}
          onClick={async () => {
            await updateDataServiceNode();
          }}>Update</button>
        <button
          disabled={state.EditingDataServiceNode == null || StringOptions.isNullOrEmpty(state.EditingDataServiceNode.DataKey)}
          onClick={async () => {
            await addDataServiceNode();
          }}>Add</button>
      </div>
    </div>
  );
}
