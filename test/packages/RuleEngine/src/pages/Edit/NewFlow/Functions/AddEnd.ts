/**
 * 数据处理 - 添加- 元件 - End
 */
import lodash from "lodash";
import FindNodeIdParent from './FindNodeIdParent';
import { DefaultNode } from '../Enum';

export default ({ flowNodeVOs, branchVOs }: any) => {
  const hasEndNode = lodash.find(
    flowNodeVOs,
    (el: any) => el.nodeId === DefaultNode.END_NODE_ID
  );
  if (hasEndNode) return { flowNodeVOs };

  const { nodeIdParent } = FindNodeIdParent(flowNodeVOs, branchVOs);
  return [
    ...flowNodeVOs.map((flowVo: any) => ({
      ...flowVo,
      isEmpty: flowVo.nodeId === nodeIdParent ? false : flowVo.isEmpty
    })),
    {
      nodeId: DefaultNode.END_NODE_ID,
      decisionBranchId: '',
      nodeName: '',
      nodeDescription: '',
      nodeType: '',
      nodeIdParent,
      isEmpty: false,
    },
  ];
};
