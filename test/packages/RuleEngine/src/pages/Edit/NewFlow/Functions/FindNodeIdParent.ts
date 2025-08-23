/**
 * 找到父节点id
 */
import lodash from 'lodash';
import { NodeType } from '../Enum';
import type { FlowNodeVO } from '../Interface';

export default (flowNodeVOs: FlowNodeVO[], branchVOs: BranchVO[]) => {
  // 获取不存在子节点集合
  const noChildNodeArr = lodash.reduce(
    flowNodeVOs,
    (arr: any, flowVo: any) => {
      if (flowVo.nodeType === NodeType.DecisionNode) {
        return [
          ...arr,
          ...lodash.filter(
            branchVOs,
            (branchVo) => branchVo.nodeId === flowVo.nodeId && branchVo.isEmpty
          ),
        ];
      }
      if (flowVo.isEmpty) {
        return [...arr, flowVo];
      }
      return arr;
    },
    []
  );
  let nodeIdParent = '';
  let decisionBranchId = '';


  const ruleSetChildItem: any = lodash.find(
    noChildNodeArr,
    (el: FlowNodeVO) => el.nodeType === NodeType.SubRuleSet
  );

  if (!lodash.isEmpty(ruleSetChildItem)) {
    nodeIdParent = ruleSetChildItem.nodeId;
  } else if (noChildNodeArr[0].nodeType === NodeType.Branch) {
    nodeIdParent = noChildNodeArr[0]?.id;
    decisionBranchId = noChildNodeArr[0]?.id;
  } else {
    nodeIdParent = noChildNodeArr[0].nodeId;
  }
  return { nodeIdParent, decisionBranchId };
};
