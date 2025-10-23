import lodash from 'lodash';
import { RULEENGINE_PREFIX, RuleEngineNodeType } from '@ctc/g6-editor';
import { START_NODE_ID_PARENT, START_NODE_TYPE, END_NODE_ID } from '../_models/reducers/flowInit';
import { ServerNodeType } from '../Enum';

interface FlowNodeVo {
  ruleFlowId: string;
  nodeIdParent: string;
  nodeId: string;
  // 如果上一节点是Decision Node（node_type = 03），需要记入对应分支的id(FlowBranchVo.id)，否则为空值
  decisionBranchId: string;
  nodeType: string;
  ruleReferenceId: string;
  nodeName: string;
  nodeDescription: string;
}

interface FlowBranchVo {
  id: string;
  nodeId: string;
  orderNo: string;
  branchNo: string;
  branchName: string;
  branchDescription: string;
  conditionSetId: string;
  binded: string;
}

export const serverNodeTypeToUI = ({
  nodeType,
  nodeId,
}: {
  nodeType: ServerNodeType;
  nodeId: string;
  decisionBranchId: string;
}) => {
  if (nodeId === END_NODE_ID) {
    return `${RULEENGINE_PREFIX}-${RuleEngineNodeType.EndNode}`;
  }

  switch (nodeType) {
    case ServerNodeType.SubRuleSet:
    case ServerNodeType.SubRuleFlow:
      return `${RULEENGINE_PREFIX}-${RuleEngineNodeType.RuleSetNode}`;
    case ServerNodeType.DecisionNode:
      return `${RULEENGINE_PREFIX}-${RuleEngineNodeType.DecisionNode}`;
    case ServerNodeType.JoinNode:
      return `${RULEENGINE_PREFIX}-${RuleEngineNodeType.JoinNode}`;
    default:
      return `${RULEENGINE_PREFIX}-${RuleEngineNodeType.EmptyNode}`;
  }
};

export const uiNodeTypeToServer = (nodeType) => {
  switch (nodeType) {
    case `${RULEENGINE_PREFIX}-${RuleEngineNodeType.RuleSetNode}`:
      return ServerNodeType.SubRuleSet;
    case `${RULEENGINE_PREFIX}-${RuleEngineNodeType.DecisionNode}`:
      return ServerNodeType.DecisionNode;
    default:
      return '';
  }
};

export const serverDataToUI = (
  flowNodeVOs: FlowNodeVo[] = [],
  branchVOs: FlowBranchVo[] = [],
  taskNotEditable: boolean
) => {
  const isStartNode = (flowNodeVo) =>
    flowNodeVo.nodeIdParent === START_NODE_ID_PARENT &&
    (flowNodeVo.nodeType === START_NODE_TYPE || !flowNodeVo.nodeType);
  const startNodeModel = (flowNodeVo) => ({
    id: flowNodeVo.nodeId,
    type: `${RULEENGINE_PREFIX}-${RuleEngineNodeType.StartNode}`,
  });

  const isEndNode = (flowNodeVo) => flowNodeVo.nodeId === END_NODE_ID;
  const endNodeModel = (flowNodeVo) => ({
    id: flowNodeVo.nodeId,
    type: `${RULEENGINE_PREFIX}-${RuleEngineNodeType.EndNode}`,
  });

  const isDecisionNode = (flowNodeVo) => flowNodeVo.nodeType === ServerNodeType.DecisionNode;
  const decisionNodeModel = (flowNodeVo) => ({
    id: flowNodeVo.nodeId,
    type: serverNodeTypeToUI(flowNodeVo),
    label: flowNodeVo.nodeName,
    isShow: taskNotEditable,
    decisions: lodash
      .chain(branchVOs)
      .filter((branchVO) => branchVO.nodeId === flowNodeVo.nodeId)
      .map((branchVO) => ({
        ...branchVO,
        label: branchVO.nodeName,
        decisionBranchId: branchVO.id,
      }))
      .value(),
  });

  const isRuleSetOrRuleFlowNode = (flowNodeVo) =>
    flowNodeVo.nodeType === ServerNodeType.SubRuleSet ||
    flowNodeVo.nodeType === ServerNodeType.SubRuleFlow;
  const ruleSetOrRuleFlowNodeModel = (flowNodeVo) => ({
    id: flowNodeVo.nodeId,
    type: serverNodeTypeToUI(flowNodeVo),
    label: flowNodeVo.nodeName,
    ruleFlowId: flowNodeVo.ruleSetId,
    ruleReferenceId: flowNodeVo.ruleReferenceId,
    isShow: taskNotEditable,
  });

  const isDecisionAddNode = (flowNodeVo) => flowNodeVo.decisionBranchId && !flowNodeVo.nodeType;
  const decisionAddNodeModel = (flowNodeVo) => ({
    id: flowNodeVo.nodeId,
    decisionId: flowNodeVo.decisionBranchId,
    decisionBranchId: flowNodeVo.decisionBranchId,
    type: `${RULEENGINE_PREFIX}-${RuleEngineNodeType.DecisionAddNode}`,
  });

  const isJoinNode = (flowNodeVo) => flowNodeVo.nodeType === ServerNodeType.JoinNode;
  const joinNodeModel = (flowNodeVo) => ({
    id: flowNodeVo.nodeId,
    type: serverNodeTypeToUI(flowNodeVo),
  });

  const nodes = lodash
    .chain(flowNodeVOs)
    .unionBy('nodeId')
    .map((flowNodeVo) => {
      if (isStartNode(flowNodeVo)) {
        return startNodeModel(flowNodeVo);
      }

      if (isEndNode(flowNodeVo)) {
        return endNodeModel(flowNodeVo);
      }

      if (isDecisionNode(flowNodeVo)) {
        return decisionNodeModel(flowNodeVo);
      }

      if (isRuleSetOrRuleFlowNode(flowNodeVo)) {
        return ruleSetOrRuleFlowNodeModel(flowNodeVo);
      }

      if (isDecisionAddNode(flowNodeVo)) {
        return decisionAddNodeModel(flowNodeVo);
      }

      if (isJoinNode(flowNodeVo)) {
        return joinNodeModel(flowNodeVo);
      }

      return {
        id: flowNodeVo.nodeId,
        type: serverNodeTypeToUI(flowNodeVo),
      };
    })
    .value();

  const edges = lodash
    .chain(flowNodeVOs)
    .filter((item) => item.nodeIdParent !== START_NODE_ID_PARENT)
    .map((flowNodeVo) => {
      if (flowNodeVo.decisionBranchId) {
        const branch = lodash.find(
          branchVOs,
          (branchVO) => branchVO.id === flowNodeVo.decisionBranchId
        );

        if (branch) {
          if (!flowNodeVo.nodeType) {
            return {
              source: flowNodeVo.nodeIdParent,
              target: flowNodeVo.nodeId,
              label: branch.branchName,
              decisionId: branch.id,
            };
          }

          return {
            source: flowNodeVo.nodeIdParent,
            target: flowNodeVo.nodeId,
            decisionId: branch.id,
          };
        }
      }

      return {
        source: flowNodeVo.nodeIdParent,
        target: flowNodeVo.nodeId,
      };
    })
    .flatten()
    .value();

  return {
    nodes,
    edges,
  };
};
