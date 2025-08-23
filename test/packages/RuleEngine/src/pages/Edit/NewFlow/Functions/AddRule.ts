/**
 * 数据处理 - 添加- 元件 - Rule
 */
import {v4 as uuidv4 } from 'uuid';
import FindNodeIdParent from './FindNodeIdParent';
import { NodeType } from '../Enum';

export default ({ record, flowNodeVOs, branchVOs }: any) => {
  const { id, name, description } = record;
  const { nodeIdParent, decisionBranchId } = FindNodeIdParent(flowNodeVOs, branchVOs);

  return {
    flowNodeVOs: [...flowNodeVOs.map((flowVo: any) => ({
      ...flowVo,
      isEmpty: !decisionBranchId && flowVo.nodeId === nodeIdParent ? false : flowVo.isEmpty
    })),
    {
      nodeId: uuidv4(),
      decisionBranchId,
      ruleReferenceId: id,
      nodeName: name,
      nodeDescription: description,
      nodeType: NodeType.SubRuleSet,
      nodeIdParent,
      isEmpty: true,
    },
    ],
    branchVOs: [
      ...branchVOs.map((branvhVo: any) => ({
        ...branvhVo,
        isEmpty: decisionBranchId && nodeIdParent === branvhVo.id ? false : branvhVo.isEmpty
      }))
    ]
  }
};
