import { v4 as uuidv4 } from 'uuid';
import flowInit, { START_NODE_ID_PARENT, START_NODE_TYPE, END_NODE_ID } from './flowInit';
import { ServerNodeType } from '../../Enum';

describe('flowInit', () => {
  it('补StartNode和EndNode', () => {
    expect(flowInit({})).toEqual({
      submitRuleSet: {
        flowNodeVOs: [
          {
            decisionBranchId: '',
            nodeDescription: '',
            nodeId: expect.any(String), // 节点：Start
            nodeIdParent: START_NODE_ID_PARENT,
            nodeName: '',
            nodeType: START_NODE_TYPE,
            ruleFlowId: '',
            ruleReferenceId: '',
          },
          {
            ruleFlowId: '',
            nodeIdParent: expect.any(String), // 父节点：Start
            nodeId: END_NODE_ID,
            decisionBranchId: '',
            nodeType: '',
            ruleReferenceId: '',
            nodeName: '',
            nodeDescription: '',
          },
        ],
        branchVOs: [],
      },
    });
  });

  it('补StartNode', () => {
    expect(
      flowInit({
        submitRuleSet: {
          flowNodeVOs: [
            {
              ruleFlowId: '',
              nodeIdParent: '',
              nodeId: END_NODE_ID,
              decisionBranchId: '',
              nodeType: '',
              ruleReferenceId: '',
              nodeName: '',
              nodeDescription: '',
            },
          ],
        },
      })
    ).toEqual({
      submitRuleSet: {
        flowNodeVOs: [
          {
            decisionBranchId: '',
            nodeDescription: '',
            nodeId: expect.any(String),
            nodeIdParent: START_NODE_ID_PARENT,
            nodeName: '',
            nodeType: START_NODE_TYPE,
            ruleFlowId: '',
            ruleReferenceId: '',
          },
          {
            ruleFlowId: '',
            nodeIdParent: expect.any(String),
            nodeId: END_NODE_ID,
            decisionBranchId: '',
            nodeType: '',
            ruleReferenceId: '',
            nodeName: '',
            nodeDescription: '',
          },
        ],
        branchVOs: [],
      },
    });
  });

  /**
   * [DecisionNode] - [RuleSetNode]
   *                - [RuleSetNode]
   */
  it('补1个DecisionNode的DecisionAddNode', () => {
    const decisionNodeId = '1';
    const decisionBranchId1 = 'b1';
    const decisionBranchId2 = 'b2';

    expect(
      flowInit({
        submitRuleSet: {
          flowNodeVOs: [
            {
              ruleFlowId: '',
              nodeIdParent: START_NODE_ID_PARENT,
              nodeId: decisionNodeId,
              decisionBranchId: '',
              nodeType: ServerNodeType.DecisionNode,
              ruleReferenceId: '',
              nodeName: '',
              nodeDescription: '',
            },
            {
              ruleFlowId: '',
              nodeIdParent: decisionNodeId,
              nodeId: uuidv4(),
              decisionBranchId: decisionBranchId1,
              nodeType: ServerNodeType.SubRuleSet,
              ruleReferenceId: '',
              nodeName: '',
              nodeDescription: '',
            },
            {
              ruleFlowId: '',
              nodeIdParent: decisionNodeId,
              nodeId: uuidv4(),
              decisionBranchId: decisionBranchId2,
              nodeType: ServerNodeType.SubRuleSet,
              ruleReferenceId: '',
              nodeName: '',
              nodeDescription: '',
            },
          ],
        },
      })
    ).toEqual({
      submitRuleSet: {
        flowNodeVOs: [
          {
            decisionBranchId: '',
            nodeDescription: '',
            nodeId: expect.any(String), // 人工检查：A1
            nodeIdParent: START_NODE_ID_PARENT,
            nodeName: '',
            nodeType: START_NODE_TYPE,
            ruleFlowId: '',
            ruleReferenceId: '',
          },
          {
            ruleFlowId: '',
            nodeIdParent: expect.any(String), // 人工检查：=A1
            nodeId: decisionNodeId, // 人工检查：B1
            decisionBranchId: '',
            nodeType: ServerNodeType.DecisionNode,
            ruleReferenceId: '',
            nodeName: '',
            nodeDescription: '',
          },
          {
            ruleFlowId: '',
            nodeIdParent: expect.any(String), // 人工检查：=C1
            nodeId: expect.any(String), // 人工检查：D1
            decisionBranchId: decisionBranchId1,
            nodeType: ServerNodeType.SubRuleSet,
            ruleReferenceId: '',
            nodeName: '',
            nodeDescription: '',
          },
          {
            ruleFlowId: '',
            nodeIdParent: expect.any(String), // 人工检查：=C2
            nodeId: expect.any(String), // 人工检查：D2
            decisionBranchId: decisionBranchId2,
            nodeType: ServerNodeType.SubRuleSet,
            ruleReferenceId: '',
            nodeName: '',
            nodeDescription: '',
          },
          {
            ruleFlowId: '',
            nodeIdParent: decisionNodeId, // 人工检查：=B1
            nodeId: expect.any(String), // 人工检查：C1
            decisionBranchId: decisionBranchId1,
            nodeType: '',
            ruleReferenceId: '',
            nodeName: '',
            nodeDescription: '',
          },
          {
            ruleFlowId: '',
            nodeIdParent: decisionNodeId, // 人工检查：=B1
            nodeId: expect.any(String), // 人工检查：C2
            decisionBranchId: decisionBranchId2,
            nodeType: '',
            ruleReferenceId: '',
            nodeName: '',
            nodeDescription: '',
          },
          {
            ruleFlowId: '',
            nodeIdParent: expect.any(String),
            nodeId: END_NODE_ID,
            decisionBranchId: '',
            nodeType: '',
            ruleReferenceId: '',
            nodeName: '',
            nodeDescription: '',
          },
        ],
        branchVOs: [],
      },
    });
  });

  /**
   * [DecisionNode] - [RuleSetNode]
   *                - [DecisionNode] - [RuleSetNode]
   *                                 - [RuleSetNode]
   *
   * =>
   *
   * [DecisionNode] - [DecisionAddNode] - [RuleSetNode]
   *                - [DecisionAddNode] - [DecisionNode] - [DecisionAddNode] - [RuleSetNode]
   *                                                     - [DecisionAddNode] - [RuleSetNode]
   */
  it('补2个DecisionNode的DecisionAddNode', () => {
    const decisionNodeAId = 'a';
    const decisionBranchAId1 = 'a-b1';
    const decisionBranchAId2 = 'a-b2';

    const decisionNodeBId = 'b';
    const decisionBranchBId1 = 'b-b1';
    const decisionBranchBId2 = 'b-b2';

    expect(
      flowInit({
        submitRuleSet: {
          flowNodeVOs: [
            {
              ruleFlowId: '',
              nodeIdParent: START_NODE_ID_PARENT,
              nodeId: decisionNodeAId,
              decisionBranchId: '',
              nodeType: ServerNodeType.DecisionNode,
              ruleReferenceId: '',
              nodeName: '',
              nodeDescription: '',
            },
            {
              ruleFlowId: '',
              nodeIdParent: decisionNodeAId,
              nodeId: uuidv4(),
              decisionBranchId: decisionBranchAId1,
              nodeType: ServerNodeType.SubRuleSet,
              ruleReferenceId: '',
              nodeName: '',
              nodeDescription: '',
            },
            {
              ruleFlowId: '',
              nodeIdParent: decisionNodeAId,
              nodeId: decisionNodeBId,
              decisionBranchId: decisionBranchAId2,
              nodeType: ServerNodeType.DecisionNode,
              ruleReferenceId: '',
              nodeName: '',
              nodeDescription: '',
            },
            {
              ruleFlowId: '',
              nodeIdParent: decisionNodeBId,
              nodeId: uuidv4(),
              decisionBranchId: decisionBranchBId1,
              nodeType: ServerNodeType.SubRuleSet,
              ruleReferenceId: '',
              nodeName: '',
              nodeDescription: '',
            },
            {
              ruleFlowId: '',
              nodeIdParent: decisionNodeBId,
              nodeId: uuidv4(),
              decisionBranchId: decisionBranchBId2,
              nodeType: ServerNodeType.SubRuleSet,
              ruleReferenceId: '',
              nodeName: '',
              nodeDescription: '',
            },
          ],
        },
      })
    ).toEqual({
      submitRuleSet: {
        flowNodeVOs: [
          {
            decisionBranchId: '',
            nodeDescription: '',
            nodeId: expect.any(String), // 节点：StartNode
            nodeIdParent: START_NODE_ID_PARENT,
            nodeName: '',
            nodeType: START_NODE_TYPE,
            ruleFlowId: '',
            ruleReferenceId: '',
          },
          {
            ruleFlowId: '',
            nodeIdParent: expect.any(String), // 父节点：StartNode
            nodeId: decisionNodeAId, // 节点：第1个DecisionNode
            decisionBranchId: '',
            nodeType: ServerNodeType.DecisionNode,
            ruleReferenceId: '',
            nodeName: '',
            nodeDescription: '',
          },
          {
            ruleFlowId: '',
            nodeIdParent: expect.any(String), // 父节点：第1个DecisionNode的第1个DecisionAddNode
            nodeId: expect.any(String),
            decisionBranchId: decisionBranchAId1,
            nodeType: ServerNodeType.SubRuleSet,
            ruleReferenceId: '',
            nodeName: '',
            nodeDescription: '',
          },
          {
            ruleFlowId: '',
            nodeIdParent: expect.any(String), // 父节点：第1个DecisionNode的第2个DecisionAddNode
            nodeId: expect.any(String), // 节点: 第2个DecisionNode
            decisionBranchId: decisionBranchAId2,
            nodeType: ServerNodeType.DecisionNode,
            ruleReferenceId: '',
            nodeName: '',
            nodeDescription: '',
          },
          {
            ruleFlowId: '',
            nodeIdParent: expect.any(String), // 第2个DecisionNode的第1个DecisionAddNode
            nodeId: expect.any(String),
            decisionBranchId: decisionBranchBId1,
            nodeType: ServerNodeType.SubRuleSet,
            ruleReferenceId: '',
            nodeName: '',
            nodeDescription: '',
          },
          {
            ruleFlowId: '',
            nodeIdParent: expect.any(String), // 第2个DecisionNode的第2个DecisionAddNode
            nodeId: expect.any(String),
            decisionBranchId: decisionBranchBId2,
            nodeType: ServerNodeType.SubRuleSet,
            ruleReferenceId: '',
            nodeName: '',
            nodeDescription: '',
          },
          {
            ruleFlowId: '',
            nodeIdParent: decisionNodeAId,
            nodeId: expect.any(String), // 节点：第1个DecisionNode的第1个DecisionAddNode
            decisionBranchId: decisionBranchAId1,
            nodeType: '',
            ruleReferenceId: '',
            nodeName: '',
            nodeDescription: '',
          },
          {
            ruleFlowId: '',
            nodeIdParent: decisionNodeAId,
            nodeId: expect.any(String), // 节点：第1个DecisionNode的第2个DecisionAddNode
            decisionBranchId: decisionBranchAId2,
            nodeType: '',
            ruleReferenceId: '',
            nodeName: '',
            nodeDescription: '',
          },
          {
            ruleFlowId: '',
            nodeIdParent: decisionNodeBId,
            nodeId: expect.any(String), // 节点：第2个DecisionNode的第1个DecisionAddNode
            decisionBranchId: decisionBranchBId1,
            nodeType: '',
            ruleReferenceId: '',
            nodeName: '',
            nodeDescription: '',
          },
          {
            ruleFlowId: '',
            nodeIdParent: decisionNodeBId,
            nodeId: expect.any(String), // 节点：第2个DecisionNode的第2个DecisionAddNode
            decisionBranchId: decisionBranchBId2,
            nodeType: '',
            ruleReferenceId: '',
            nodeName: '',
            nodeDescription: '',
          },
          {
            ruleFlowId: '',
            nodeIdParent: expect.any(String),
            nodeId: END_NODE_ID,
            decisionBranchId: '',
            nodeType: '',
            ruleReferenceId: '',
            nodeName: '',
            nodeDescription: '',
          },
        ],
        branchVOs: [],
      },
    });
  });
});
