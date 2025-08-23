/**
 * 数据处理 - 删除ruleSet
 */
import lodash from 'lodash';
import { NodeType } from '../Enum';

export default ({ item, id, flowNodeVOs, branchVOs }: any) => {
  const { nodeId, nodeIdParent } = item;

  // 找到父节点
  const parentArr = lodash.filter(flowNodeVOs, (flowVo: any) => flowVo.nodeId === nodeIdParent);
  // 找到子节点
  const childrenItem = lodash.find(flowNodeVOs, (flowVo: any) => flowVo.nodeIdParent === nodeId);

  // 存在汇合节点
  if (!lodash.isEmpty(parentArr) && parentArr.length > 1) {
    return {
      flowNodeVOs:
        lodash
          .chain(flowNodeVOs)
          .map((flowVo: any) => ({
            ...flowVo,
            isEmpty:
              lodash.find(
                parentArr,
                (parentItem: any) => parentItem.nodeIdParent === flowVo.nodeId
              ) && flowVo.nodeType !== NodeType.DecisionNode
                ? true
                : item.isEmpty,
          }))
          .filter((flowVO: any) => flowVO.nodeId !== id && flowVO.nodeId !== nodeIdParent)
          .value() || [],
      branchVOs: lodash.map(branchVOs, (branchVo: any) => ({
        ...branchVo,
        isEmpty: lodash.find(parentArr, (parentItem: any) => parentItem.nodeId === branchVo.nodeId)
          ? false
          : branchVo.isEmpty,
      })),
    };
  }

  return {
    flowNodeVOs:
      lodash
        .chain(flowNodeVOs)
        .map((flowVo: any) => ({
          ...flowVo,
          isEmpty: !childrenItem && flowVo.nodeId === nodeIdParent ? true : flowVo.isEmpty,
          nodeIdParent: flowVo.nodeIdParent === nodeId ? parentArr[0].nodeId : flowVo.nodeIdParent,
        }))
        .filter((flowVO: any) => flowVO.nodeId !== id)
        .value() || [],
  };
};
