/* eslint-disable no-param-reassign */
import { produce }  from 'immer';
import lodash from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { ServerNodeType } from '../../Enum';

export const START_NODE_ID_PARENT = '0';
export const START_NODE_TYPE = 'StartNode';
export const END_NODE_ID = '999';

/**
 * 约定1：确保业务数据里的NodeType字段，取自于ServerNodeType|null|undefined|''
 * 后果1：如果不遵守此约定，一些逻辑处理可能无法兼容旧数据
 */
export default (state: any) =>
  produce(state, (draftState: any) => {
    if (!lodash.isPlainObject(draftState.ruleSetModalData)) {
      draftState.ruleSetModalData = {};
    }

    if (!lodash.isArray(draftState.ruleSetModalData.flowNodeVOs)) {
      draftState.ruleSetModalData.flowNodeVOs = [];
    }

    if (!lodash.isArray(draftState.ruleSetModalData.branchVOs)) {
      draftState.ruleSetModalData.branchVOs = [];
    }

    const startNodeId = uuidv4();

    /**
     * 补StartNode
     *
     * 业务接口：不存StartNode
     * SnapShot：存StartNode
     *
     * 可以用nodeType，是因为这个节点不会传给业务接口
     */
    if (
      !lodash.find(
        draftState.ruleSetModalData.flowNodeVOs,
        (vo) => vo.nodeIdParent === START_NODE_ID_PARENT && vo.nodeType === START_NODE_TYPE
      )
    ) {
      // 修改连线
      draftState.ruleSetModalData.flowNodeVOs = lodash.map(
        draftState.ruleSetModalData.flowNodeVOs,
        (item) => {
          if (item.nodeIdParent === START_NODE_ID_PARENT) {
            return {
              ...item,
              nodeIdParent: startNodeId,
            };
          }

          return item;
        }
      );

      // 新增StartNode
      draftState.ruleSetModalData.flowNodeVOs.unshift({
        ruleFlowId: '',
        nodeIdParent: START_NODE_ID_PARENT,
        nodeId: startNodeId,
        decisionBranchId: '',
        nodeType: START_NODE_TYPE,
        ruleReferenceId: '',
        nodeName: '',
        nodeDescription: '',
      });
    }

    /**
     * 补DecisionAddNode
     *
     * 业务接口：[DecisionNode] - [0-n][RuleSetNode|DecisionNode]
     * SnapShot：[DecisionNode] - [0-n][DecisionAddNode] - [RuleSetNode|DecisionNode]
     *
     * 注意：遍历每一个DecisionNode，看他是否需要补DecisionAddNode
     */
    const decisionNodes = lodash.filter(
      draftState.ruleSetModalData.flowNodeVOs,
      (vo) => vo.nodeType === ServerNodeType.DecisionNode
    );
    decisionNodes.forEach((decisionNode) => {
      const hasAddNode = lodash.find(
        draftState.ruleSetModalData.flowNodeVOs,
        (vo) => vo.nodeIdParent === decisionNode.nodeId && vo.decisionBranchId && !vo.nodeType
      );

      if (!hasAddNode) {
        // 1-需要补的DecisionAddNode
        const nodes = lodash
          .chain(draftState.ruleSetModalData.flowNodeVOs)
          .filter(
            (vo) => vo.nodeIdParent === decisionNode.nodeId && vo.decisionBranchId && vo.nodeType
          )
          .map((vo) => ({
            ruleFlowId: '',
            nodeIdParent: vo.nodeIdParent,
            nodeId: uuidv4(),
            decisionBranchId: vo.decisionBranchId,
            nodeType: '',
            ruleReferenceId: '',
            nodeName: '',
            nodeDescription: '',
          }))
          .value();

        // 2-把nodes更新到业务数据中，并更新连线
        draftState.ruleSetModalData.flowNodeVOs = lodash.concat(
          [],
          lodash.map(draftState.ruleSetModalData.flowNodeVOs, (vo) => {
            if (vo.nodeIdParent === decisionNode.nodeId && vo.decisionBranchId && vo.nodeType) {
              const node = nodes.find((item) => item.decisionBranchId === vo.decisionBranchId);

              if (node) {
                return {
                  ...vo,
                  nodeIdParent: node.nodeId,
                };
              }
            }

            return vo;
          }),
          nodes
        );
      }
    });

    /**
     * 补EndNode
     *
     * 业务接口：存EndNode
     * SpanShot：存EndNode
     */
    if (!lodash.find(draftState.ruleSetModalData.flowNodeVOs, (vo) => vo.nodeId === END_NODE_ID)) {
      draftState.ruleSetModalData.flowNodeVOs.push({
        ruleFlowId: '',
        nodeIdParent: startNodeId,
        nodeId: END_NODE_ID,
        decisionBranchId: '',
        nodeType: '',
        ruleReferenceId: '',
        nodeName: '',
        nodeDescription: '',
      });
    }

    return draftState;
  });
