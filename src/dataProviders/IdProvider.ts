import axios from "axios";

export class IdProvider {

    /** Gets new id for MathNode */
    public static async GetNewComplexMathNodeId () {
      const response = await axios.get("http://localhost:8080/IdSequences/ComplexMathNode");
      return `${response.data}`;
    }
    /** Gets new id for DataServiceNode */
    public static async GetNewDataServiceNodeId () {
      const response = await axios.get("http://localhost:8080/IdSequences/DataServiceNode");
      return `${response.data}`;
    }

}
