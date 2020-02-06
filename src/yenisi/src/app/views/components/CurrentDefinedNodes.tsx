import { CustomDefinedComplexServiceNodeProvider,  } from '../../../uBkrVeriOperasyonu/dataProviders/CustomDefinedComplexServiceNodeProvider';
import { EnumMathNodeType, } from '../../../uBkrVeriOperasyonu/enums/EnumMathNodeType';
import { GridOptions, GridSizeChangedEvent, SelectionChangedEvent, GridReadyEvent, } from 'ag-grid-community';
import { IMathNode, } from '../../../uBkrVeriOperasyonu/interfaces/IMathNode';
import { IOperandDefinition, } from '../../../uBkrVeriOperasyonu/interfaces/IOperandDefinition';
import { useState, useEffect, } from "react";
import { ZtDataGrid, IBaseProps, ZtButton, ZtAlphaEntry, IZtDataGridHandles, } from '@zt/base-components';
import * as React from "react";
import { MathNodeTreeFormuletor, } from '../../../uBkrVeriOperasyonu/MathNodeTreeFormuletor';
import { StringOps, ZtCaseStyles, } from '@zt/core-framework';
import { CustomDefinedDataServiceNodeProvider, } from '../../../uBkrVeriOperasyonu/dataProviders/CustomDefinedDataServiceNodeProvider';
import { ICustomDefinedDataServiceNode, } from '../../../uBkrVeriOperasyonu/interfaces/ICustomDefinedDataServiceNode';
import "../../styles/CurrentDefinedNodes.css";

export interface ICurrentDefinedNodesProps extends IBaseProps {
  ClassName?: string;
}
interface ICurrentDefinedNodesState {
    MathNodes?: IMathNode[];
    DataServiceNodes?: ICustomDefinedDataServiceNode[];
    SelectedMathNode?: IMathNode;
    SelectedDataServiceNode?: ICustomDefinedDataServiceNode;
    EditingMathNode?: IMathNode;
    EditingDataServiceNode?: ICustomDefinedDataServiceNode;
    MasterGridOptionsCurrentMathNodes?: GridOptions;
    GridOptionsCurrentDataServiceNodes?: GridOptions;
}

export function CurrentDefinedNodes (props: ICurrentDefinedNodesProps) {
  const [ state, setState, ] = useState<ICurrentDefinedNodesState>({
    MasterGridOptionsCurrentMathNodes: getMasterGridOptionsCurrentMathNodes(),
    GridOptionsCurrentDataServiceNodes: getGridOpstionsCurrentDataServiceNodes(),
  });
  const ucGrdCurrentDefinedComplexNodes = React.useRef<IZtDataGridHandles>(null);
  useEffect(() => {
    load().then(() => {}, () => {});
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
  function getMasterGridOptionsCurrentMathNodes () {
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
      masterDetail: true,
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
        if (state.EditingMathNode != null && !StringOps.isNullOrEmpty(state.EditingMathNode.ComplexMathExpression)) {
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
        <ZtDataGrid
          ref={ucGrdCurrentDefinedComplexNodes}
          rowData={state.MathNodes}
          columnDefs={state.MasterGridOptionsCurrentMathNodes!.columnDefs}
          masterDetail={state.MasterGridOptionsCurrentMathNodes!.masterDetail}
          isRowMaster={state.MasterGridOptionsCurrentMathNodes!.isRowMaster}
          suppressCellSelection={state.MasterGridOptionsCurrentMathNodes!.suppressCellSelection}
          rowSelection={state.MasterGridOptionsCurrentMathNodes!.rowSelection}
          onGridLoaded={state.MasterGridOptionsCurrentMathNodes!.onGridReady}
          onSelectionChanged={state.MasterGridOptionsCurrentMathNodes!.onSelectionChanged}
          onGridSizeChanged={state.MasterGridOptionsCurrentMathNodes!.onGridSizeChanged}></ZtDataGrid>
        <textarea
          style={{
            width: "100%",
          }}
          value={state.EditingMathNode != null ? state.EditingMathNode.ComplexMathExpression : ""}
          onChange={(changeEvent) => {
            setState({ ...state, EditingMathNode: { ...state.EditingMathNode, ComplexMathExpression: changeEvent.target.value, }, });
          }}></textarea>
        <ZtAlphaEntry
          title="Description"
          caseStyle={ZtCaseStyles.freeCase}
          charsetConsonant={true}
          charsetConsonantExtra1={true}
          charsetConsonantExtra2={true}
          charsetNumber={true}
          charsetSpecial={true}
          charsetVowal={true}
          charsetVowalExtra1={true}
          charsetVowalExtra2={true}
          maxChar={4000}
          multiLine={true}
          rows={5}
          useEnterInMultiLine={true}
          text={state.EditingMathNode != null ? state.EditingMathNode.Description : ""}
          onValueChanged={(previous, current) => {
            setState((previousState) => {
              return {
                ...previousState,
                EditingMathNode: {
                  ...previousState.EditingMathNode,
                  Description: current,
                },
              };
            });
          }}></ZtAlphaEntry>
        <ZtButton
          text="Update"
          block={true}
          enabled={state.SelectedMathNode != null}
          onClick={async () => {
            await updateMathNode();
          }}></ZtButton>
        <ZtButton
          text="Add"
          block={true}
          enabled={state.EditingMathNode != null && !StringOps.isNullOrEmpty(state.EditingMathNode.ComplexMathExpression)}
          onClick={async () => {
            await addMathNode();
          }}></ZtButton>
      </div>
      <div className="math-node-editor">
        <ZtDataGrid
          rowData={state.DataServiceNodes}
          columnDefs={state.GridOptionsCurrentDataServiceNodes!.columnDefs}
          suppressCellSelection={state.MasterGridOptionsCurrentMathNodes!.suppressCellSelection}
          rowSelection={state.MasterGridOptionsCurrentMathNodes!.rowSelection}
          onGridLoaded={state.GridOptionsCurrentDataServiceNodes!.onGridReady}
          onSelectionChanged={state.GridOptionsCurrentDataServiceNodes!.onSelectionChanged}
          onGridSizeChanged={state.GridOptionsCurrentDataServiceNodes!.onGridSizeChanged}></ZtDataGrid>
        <ZtAlphaEntry
          title="Data Key"
          caseStyle={ZtCaseStyles.freeCase}
          charsetConsonant={true}
          charsetConsonantExtra1={true}
          charsetConsonantExtra2={true}
          charsetNumber={true}
          charsetSpecial={true}
          charsetVowal={true}
          charsetVowalExtra1={true}
          charsetVowalExtra2={true}
          maxChar={200}
          text={state.EditingDataServiceNode != null ? state.EditingDataServiceNode.DataKey : ""}
          onValueChanged={(previous, current) => {
            setState((previousState) => {
              return {
                ...previousState,
                EditingDataServiceNode: {
                  ...state.EditingDataServiceNode,
                  DataKey: current,
                },
              };
            });
          }}></ZtAlphaEntry>
        <ZtAlphaEntry
          title="Description"
          caseStyle={ZtCaseStyles.freeCase}
          charsetConsonant={true}
          charsetConsonantExtra1={true}
          charsetConsonantExtra2={true}
          charsetNumber={true}
          charsetSpecial={true}
          charsetVowal={true}
          charsetVowalExtra1={true}
          charsetVowalExtra2={true}
          maxChar={4000}
          multiLine={true}
          useEnterInMultiLine={true}
          rows={5}
          text={state.EditingDataServiceNode != null ? state.EditingDataServiceNode.Description : ""}
          onValueChanged={(previous, current) => {
            setState((previousState) => {
              return {
                ...previousState,
                EditingDataServiceNode: {
                  ...state.EditingDataServiceNode,
                  Description: current,
                },
              };
            });
          }}></ZtAlphaEntry>
        <ZtButton
          text="Update"
          block={true}
          enabled={state.SelectedDataServiceNode != null}
          onClick={async () => {
            await updateDataServiceNode();
          }}></ZtButton>
        <ZtButton
          text="Add"
          block={true}
          enabled={state.EditingDataServiceNode != null && !StringOps.isNullOrEmpty(state.EditingDataServiceNode.DataKey)}
          onClick={async () => {
            await addDataServiceNode();
          }}></ZtButton>
      </div>
    </div>
  );
}
