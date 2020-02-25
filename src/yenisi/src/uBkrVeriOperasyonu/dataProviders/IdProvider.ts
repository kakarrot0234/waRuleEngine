import axios from 'axios';
export class IdProvider {

  /** Gets new id for MathNode */
  public static async GetNewMathNodeId () {
    const response = await axios.get("http://10.75.5.36:8080/IdSequences/ComplexMathNode");
    return response.data;
  }
  /** Gets new id for DataServiceNode */
  public static async GetNewDataServiceNodeId () {
    const response = await axios.get("http://10.75.5.36:8080/IdSequences/DataServiceMathNode");
    return response.data;
  }

}
