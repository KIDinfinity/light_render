import { produce } from 'immer';
import lodash from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { DefaultNode, NodeType } from '../../NewFlow/Enum';
/**
 * 初始化flow数据
 * 1:补开始节点
 * 2:补join节点(是否有需要?如果不需要不用传branchVOs)
 */

export default (state: any) => {
  const nextState = produce(state, (draftState: any) => {
    const flowNodeVOs = draftState.submitRuleSet?.flowNodeVOs || [];
    const startNodeId = uuidv4();

    let newFlowNodeVOs = flowNodeVOs;
    // 为了兼容旧数据，重置数据
    newFlowNodeVOs =
      newFlowNodeVOs.length === 2 &&
      lodash.find(newFlowNodeVOs, (el: any) => el.nodeId === DefaultNode.END_NODE_ID)
        ? []
        : newFlowNodeVOs;

    const startNode = lodash.find(
      newFlowNodeVOs,
      (el) =>
        el.nodeIdParent === DefaultNode.START_NODE_ID_PARENT &&
        el.nodeType === DefaultNode.START_NODE_TYPE
    );

    // 新增开始节点
    if (!startNode) {
      newFlowNodeVOs = lodash.map(newFlowNodeVOs, (el: any) => {
        return el.nodeIdParent === DefaultNode.START_NODE_ID_PARENT
          ? {
              ...el,
              nodeIdParent: startNodeId,
            }
          : el;
      });
      newFlowNodeVOs = [
        ...newFlowNodeVOs,
        {
          ruleFlowId: '',
          nodeIdParent: DefaultNode.START_NODE_ID_PARENT,
          nodeId: startNodeId,
          decisionBranchId: '',
          nodeType: DefaultNode.START_NODE_TYPE,
          ruleReferenceId: '',
          nodeName: '',
          nodeDescription: '',
          isEmpty: true,
        },
      ];
    }

    newFlowNodeVOs = lodash.map(newFlowNodeVOs, (item: any) => {
      // 处理branch数据
      if (item.nodeType === NodeType.Branch) {
        const flowNodeIdParent =
          lodash
            .chain(newFlowNodeVOs)
            .find((el: any) => el.nodeId === item.nodeIdParent)
            .get('nodeIdParent')
            .value() || '';

        return { ...item, flowNodeIdParent };
      }

      return item;
    });
    draftState.submitRuleSet.flowNodeVOs = newFlowNodeVOs;
  });
  return { ...nextState };
};
