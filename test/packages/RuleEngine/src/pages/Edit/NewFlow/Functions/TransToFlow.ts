/**
 * 数据转化(flow->submit)
 */
import lodash from 'lodash';
import { v4 as uuid }  from 'uuid';
import { RULEENGINENODEENHANCE_PREFIX, RuleEngineNodeEnhanceNodeType } from '@ctc/g6-editor';
import { DefaultNode, NodeType } from '../Enum';
import type { FlowNodeVO, BranchVO } from '../Interface';
import serverNodeTypeToUI from './serverNodeTypeToUI';

export default (
  flowNodeVOs: FlowNodeVO[] = [],
  branchVOs: BranchVO[] = [],
  taskNotEditable: boolean
) => {
  // 开始节点
  const isStartNode = (flowNodeVo: FlowNodeVO) =>
    flowNodeVo.nodeIdParent === DefaultNode.START_NODE_ID_PARENT &&
    (flowNodeVo.nodeType === DefaultNode.START_NODE_TYPE || !flowNodeVo.nodeType);
  const startNodeModel = (flowNodeVo: FlowNodeVO) => ({
    id: flowNodeVo.nodeId,
    type: `${RULEENGINENODEENHANCE_PREFIX}-${RuleEngineNodeEnhanceNodeType.StartNode}`,
    nodeType: DefaultNode.START_NODE_TYPE,
    item: flowNodeVo,
  });

  // 结束节点
  const isEndNode = (flowNodeVo: FlowNodeVO) => flowNodeVo.nodeId === DefaultNode.END_NODE_ID;
  const endNodeModel = (flowNodeVo: FlowNodeVO) => ({
    id: flowNodeVo.nodeId,
    nodeId: flowNodeVo.nodeIdParent,
    nodeIdParent: flowNodeVo.nodeIdParent,
    type: `${RULEENGINENODEENHANCE_PREFIX}-${RuleEngineNodeEnhanceNodeType.EndNode}`,
    nodeType: DefaultNode.END_NODE_ID,
    item: flowNodeVo,
  });

  // ruleSet节点
  const isRuleSetOrRuleFlowNode = (flowNodeVo: FlowNodeVO) =>
    flowNodeVo.nodeType === NodeType.SubRuleSet || flowNodeVo.nodeType === NodeType.SubRuleFlow;
  const ruleSetOrRuleFlowNodeModel = (flowNodeVo: FlowNodeVO) => ({
    id: flowNodeVo.nodeId,
    type: serverNodeTypeToUI(flowNodeVo),
    label: flowNodeVo.nodeName,
    ruleFlowId: flowNodeVo.ruleSetId,
    ruleReferenceId: flowNodeVo.ruleReferenceId,
    disabled: taskNotEditable,
    nodeIdParent: flowNodeVo.nodeIdParent,
    isShow: taskNotEditable,
    item: flowNodeVo,
    nodeType: NodeType.SubRuleSet,
  });

  // decision节点
  const isDecision = (flowNodeVo: FlowNodeVO) => flowNodeVo.nodeType === NodeType.DecisionNode;
  const branchModel = (flowNodeVo: FlowNodeVO) => {
    return (
      lodash
        .chain(branchVOs)
        .filter((el: BranchVO) => el.nodeId === flowNodeVo.nodeId)
        .map((item: BranchVO) => ({
          id: item.id,
          nodeId: item.nodeId,
          type: serverNodeTypeToUI({ nodeType: NodeType.Branch, nodeId: '' }),
          label: item.branchName,
          disabled: taskNotEditable,
          ruleFlowId: uuid(),
          ruleReferenceId: '',
          nodeIdParent: flowNodeVo.nodeIdParent,
          isShow: taskNotEditable,
          item,
          nodeType: NodeType.Branch,
          comboId: flowNodeVo.nodeId,
        }))
        .value() || []
    );
  };

  const nodes =
    lodash
      .chain(flowNodeVOs)
      .filter((el: FlowNodeVO) => el.nodeType !== NodeType.JoinNode)
      .reduce((arr: any[], flowNodeVo: FlowNodeVO) => {
        // 开始节点
        if (isStartNode(flowNodeVo)) {
          return [...arr, startNodeModel(flowNodeVo)];
        }
        // end节点
        if (isEndNode(flowNodeVo)) {
          return [...arr, endNodeModel(flowNodeVo)];
        }
        // ruleSet节点
        if (isRuleSetOrRuleFlowNode(flowNodeVo)) {
          return [...arr, ruleSetOrRuleFlowNodeModel(flowNodeVo)];
        }
        // decision节点
        if (isDecision(flowNodeVo)) {
          return [...arr, ...branchModel(flowNodeVo)];
        }
        return arr;
      }, [])
      .value() || [];

  const combos =
    lodash
      .chain(flowNodeVOs)
      .filter((el: FlowNodeVO) => el.nodeType === NodeType.DecisionNode)
      .map((flowVo: FlowNodeVO) => ({
        id: flowVo.nodeId,
        label: '',
      }))
      .value() || [];

  const joinList: any = lodash.filter(
    flowNodeVOs,
    (item: any) => item.nodeType === NodeType.JoinNode
  );
  const newList = [...nodes, ...joinList];

  const edges = lodash
    .chain(newList)
    .filter((flowVo: any) => {
      return !lodash.isEmpty(flowVo.nodeIdParent);
    })
    .filter((flowVo: any) => {
      // 去除和汇合节点重合的一条边
      return !lodash
        .chain(joinList)
        .find((item: any) => item.nodeId === flowVo.nodeIdParent)
        .value();
    })
    .map((item: any) => {
      if (item.nodeType === NodeType.JoinNode) {
        return {
          source: item.nodeIdParent,
          target: lodash
            .chain(newList)
            .find((itemVo: any) => itemVo.nodeIdParent === item.nodeId)
            .get('id')
            .value(),
        };
      }
      // 如果父节点是decision,应该指向branchNode(branch中nodeId不能作为唯一标识,所以要用id)
      const parentItem = lodash.find(newList, (flowVo: any) => flowVo.nodeId === item.nodeIdParent);

      if (parentItem && parentItem.nodeType === NodeType.Branch) {
        return {
          source: parentItem.id,
          target: item.id,
        };
      }
      return {
        source: item.nodeIdParent,
        target: item.id,
      };
    })
    .value();
  return {
    nodes,
    combos,
    edges,
  };
};
