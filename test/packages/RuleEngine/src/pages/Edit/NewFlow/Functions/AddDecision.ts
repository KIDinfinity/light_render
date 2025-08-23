/**
 * 数据处理 - 添加- 元件 - Decision
 */
import {v4 as uuidv4 } from 'uuid';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import FindNodeIdParent from './FindNodeIdParent';
import { NodeType } from '../Enum';

export default ({ flowNodeVOs, branchVOs, branchInfo, conditionList }: any) => {
  const nodeUuid = uuidv4();

  // 添加两条数据
  const newBranchList: any[] = [
    {
      id: uuidv4(),
      nodeId: nodeUuid,
      branchNo: '',
      branchDescription: formUtils.queryValue(branchInfo?.branchDescription) || '',
      conditionSetId: '',
      conditions: conditionList,
      branchName: formUtils.queryValue(branchInfo?.branchName) || '',
      first: true,
      nodeType: NodeType.Branch,
      isEmpty: true,
    },
    {
      id: uuidv4(),
      nodeId: nodeUuid,
      branchNo: '',
      branchDescription: '',
      conditionSetId: '',
      conditions: [],
      branchName: '',
      first: false,
      nodeType: NodeType.Branch,
      isEmpty: true,
    },
  ];
  const { nodeIdParent } = FindNodeIdParent(flowNodeVOs, branchVOs);

  return {
    flowNodeVOs: [
      ...lodash.map(flowNodeVOs, (flowVo: any) => ({
        ...flowVo,
        isEmpty: flowVo.nodeId === nodeIdParent ? false : flowVo.isEmpty,
      })),
      {
        decisionBranchId: '',
        nodeDescription: '',
        nodeNameTemp: '',
        nodeId: nodeUuid,
        nodeIdParent,
        nodeName: '',
        nodeType: NodeType.DecisionNode,
      },
    ],
    branchVOs: [
      ...lodash.map(branchVOs, (banchVo: any) => ({
        ...banchVo,
        isEmpty: banchVo.id === nodeIdParent ? false : banchVo.isEmpty,
      })),
      ...newBranchList,
    ],
  };
};
