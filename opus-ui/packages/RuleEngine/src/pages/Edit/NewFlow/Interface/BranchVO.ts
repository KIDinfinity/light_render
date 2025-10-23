interface Condition {
  atomCode?: string;
  atomFlag?: string;
  comparisonValueType?: string;
  id?: string;
  operator?: string;
  value?: string;
}
interface BranchVO {
  branchDescription: string;
  branchName: string
  branchNo: string;
  conditionSetId: string;
  id: string;
  nodeId: string;
  conditions?: Condition;
  first?: boolean;
}

export default BranchVO;
export {
  Condition
}
