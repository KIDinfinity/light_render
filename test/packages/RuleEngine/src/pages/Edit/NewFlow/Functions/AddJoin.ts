/**
 * 数据处理 - 添加 - 边 - 汇合节点
 */
import lodash from 'lodash';
import {v4 as uuidv4 } from 'uuid';
import { NodeType } from '../Enum';

export default ({ edges, flowNodeVOs, branchVOs }: any) => {
  const [edge1] = edges;
  const sourceId = edge1.getSource().getID();
  const targetId = edge1.getTarget().getID();

  // 找到目标节点
  const targetNode = lodash.find(flowNodeVOs, (el: any) => el.nodeId === targetId);

  const joinList = lodash.filter(
    flowNodeVOs,
    (el: any) => el.nodeId === targetNode.nodeIdParent && el.nodeType === NodeType.JoinNode
  );
  // 已经存在汇合节点
  if (!lodash.isEmpty(joinList)) {
    return {
      flowNodeVOs: [
        ...flowNodeVOs.map((flowVO: any) => ({
          ...flowVO,
          isEmpty: flowVO.nodeId === sourceId ? false : flowVO.isEmpty,
        })),
        {
          ruleFlowId: uuidv4(),
          nodeIdParent: sourceId,
          nodeId: targetNode.nodeIdParent,
          decisionBranchId: '',
          nodeType: NodeType.JoinNode,
          ruleReferenceId: '',
          nodeName: '',
          nodeDescription: '',
        },
      ],
    };
  }
  const newTargetNodeIdParent = uuidv4();

  return {
    flowNodeVOs: [
      ...(lodash
        .chain(flowNodeVOs)
        .filter(
          (el: any) => el.nodeId === targetNode.nodeIdParent && el.nodeType !== NodeType.JoinNode
        )
        .map((item: any) => {
          return {
            ruleFlowId: uuidv4(),
            nodeIdParent: item.nodeId,
            nodeId: newTargetNodeIdParent,
            decisionBranchId: '',
            nodeType: NodeType.JoinNode,
            ruleReferenceId: '',
            nodeName: '',
            nodeDescription: '',
          };
        })
        .value() || []),

      ...flowNodeVOs.map((item: any) => ({
        ...item,
        isEmpty: item.nodeId === sourceId ? false : item.isEmpty,
        nodeIdParent: item.nodeId === targetId ? newTargetNodeIdParent : item.nodeIdParent,
      })),
      {
        ruleFlowId: uuidv4(),
        nodeIdParent: sourceId,
        nodeId: newTargetNodeIdParent,
        decisionBranchId: lodash.find(branchVOs, (vo) => vo.id === sourceId)?.id || '',
        nodeType: NodeType.JoinNode,
        ruleReferenceId: '',
        nodeName: '',
        nodeDescription: '',
      },
    ],
  };
};
