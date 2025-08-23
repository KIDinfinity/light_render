/**
 * 数据处理 - 删除ruleSet
 */
import lodash from "lodash";

export default ({ item, id, flowNodeVOs }: any) => {
  const { nodeId, nodeIdParent } = item;

  // 找到父节点
  const parentItem = lodash.find(flowNodeVOs, (flowVo: any) => flowVo.nodeId === nodeIdParent);
  // 找到子节点
  const childrenItem = lodash.find(flowNodeVOs, (flowVo: any) => flowVo.nodeIdParent === nodeId);

  return {
    flowNodeVOs: lodash
      .chain(flowNodeVOs)
      .map((flowVo: any) => ({
        ...flowVo,
        isEmpty: !childrenItem && flowVo.nodeId === nodeIdParent ? true : flowVo.isEmpty,
        nodeIdParent: flowVo.nodeIdParent === nodeId ? parentItem.nodeId : flowVo.nodeIdParent,
      }))
      .filter((flowVO: any) => flowVO.nodeId !== id)
      .value() || []
  }

};
