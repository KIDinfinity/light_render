/**
 * 数据处理 - 删除branch
 */
import lodash from 'lodash';
import { NodeType } from '../Enum';

export default ({ branchVOs, flowNodeVOs, item, id }: any) => {
  const parentItem =
    lodash
      .chain(flowNodeVOs)
      .find((el: any) => {
        const flowItem = lodash.find(flowNodeVOs, (flowVo: any) => flowVo.nodeId === item.nodeId);
        return el.nodeId === flowItem?.nodeIdParent;
      })
      .value() || {};
  const diffBranchVOs = lodash.filter(branchVOs, (branchVo: any) => branchVo.id !== id);
  const sameNewBranchVos = lodash.filter(
    diffBranchVOs,
    (branchVo: any) => branchVo.nodeId === item.nodeId
  );

  return {
    branchVOs: [
      ...diffBranchVOs.map((branchVo: any) => ({
        ...branchVo,
        isEmpty:
          parentItem.nodeType === NodeType.DecisionNode && branchVo.nodeId === parentItem.nodeId
            ? true
            : branchVo.isEmpty,
      })),
    ],
    flowNodeVOs: lodash.isEmpty(sameNewBranchVos)
      ? lodash
          .chain(flowNodeVOs)
          .filter((el: any) => el.nodeId !== item.nodeId)
          .map((flowVo: any) => ({
            ...flowVo,
            isEmpty:
              parentItem.nodeType !== NodeType.DecisionNode && flowVo.nodeId === parentItem.nodeId
                ? true
                : flowVo.isEmpty,
          }))
          .value()
      : flowNodeVOs,
  };
};
