interface FlowVo {
  id?: string;
  decisionBranchId?: string;
  first?: boolean;// branch第一项(前端用)
  nodeDescription: string;
  nodeId: string;
  nodeIdParent: string;
  nodeName: string;
  nodeType: string;
  ruleSetId?: string;
  ruleReferenceId?: string;
  isEmpty?: string;
}

export default FlowVo;
