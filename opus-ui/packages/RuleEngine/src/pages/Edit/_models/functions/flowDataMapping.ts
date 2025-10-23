const mapping = (data: { branchVOs: any[]; flowNodeVOs: any[] }, formId: string, toId: string) => {
  if (!data?.branchVOs?.length || !data?.flowNodeVOs?.length) return data;
  const newData = data;
  data.branchVOs.forEach((branch: any) => {
    const nodeIndex = data.flowNodeVOs.findIndex(
      (node: any) => node.nodeIdParent === branch[formId] && node.decisionBranchId === branch.id
    );
    if (nodeIndex > -1) {
      newData.flowNodeVOs[nodeIndex].nodeIdParent = branch[toId];
    }
  });
  return newData;
};

export const be2fe = (data: any) => {
  return mapping(data, 'nodeId', 'id');
};

export const fe2be = (data: any) => {
  return mapping(data, 'id', 'nodeId');
};
