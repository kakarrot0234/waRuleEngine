export class IdProvider {

    private static m_MathNodeIdSequence: number = 8;
    private static m_DataServiceNodeIdSequence: number = 4;

    /** Gets new id for MathNode */
    public static GetNewMathNodeId () {
      const newId = IdProvider.m_MathNodeIdSequence.toString();
      IdProvider.m_MathNodeIdSequence++;
      return newId;
    }
    /** Gets new id for DataServiceNode */
    public static GetNewDataServiceNodeId () {
      const newId = IdProvider.m_DataServiceNodeIdSequence.toString();
      IdProvider.m_DataServiceNodeIdSequence++;
      return newId;
    }

}
