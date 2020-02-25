import axios from "axios";

import { ICustomDefinedDataServiceNode, } from "../interfaces/ICustomDefinedDataServiceNode";
import { GuidProvider, } from "./GuidProvider";
import { IdProvider, } from "./IdProvider";

export class CustomDefinedDataServiceNodeProvider {

  async GetAllCustomDefinedDataServiceNodes (): Promise<ICustomDefinedDataServiceNode[]> {
    const response = await axios.get("http://10.75.5.36:8080/DefinedDataServiceMathNodes");
    const datas = response.data as ICustomDefinedDataServiceNode[];
    return datas;
  }
  async GetCustomDefinedDataServiceNode (id?: string, dataKey?: string): Promise<ICustomDefinedDataServiceNode | undefined> {
    if (id != null) {
      const response = await axios.get(`http://10.75.5.36:8080/DefinedDataServiceMathNodes/GetById/${id}`);
      const datas = response.data as ICustomDefinedDataServiceNode[];
      if (datas != null) {
        return datas[0];
      }
    } else if (dataKey != null) {
      const response = await axios.get(`http://10.75.5.36:8080/DefinedDataServiceMathNodes/GetByDataKey/${dataKey}`);
      const datas = response.data as ICustomDefinedDataServiceNode[];
      if (datas != null) {
        return datas[0];
      }
    }
  }
  async SaveCustomDefinedDataServiceNodes (node: ICustomDefinedDataServiceNode) {
    const dataServiceNode: ICustomDefinedDataServiceNode = {
      FollowId: node.FollowId != null ? node.FollowId : await IdProvider.GetNewDataServiceNodeId(),
      Guid: node.Guid != null ? node.Guid : await GuidProvider.GetGuid(),
      DataKey: node.DataKey,
      Description: node.Description,
      ActiveCd: node.ActiveCd,
    };
    await axios.post("http://10.75.5.36:8080/DefinedDataServiceMathNodes", dataServiceNode);
    return dataServiceNode;
  }

}
