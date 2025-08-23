/* eslint-disable no-param-reassign */
import lodash from 'lodash';
import { produce } from 'immer';
import { ServerNodeType } from '../../Enum';

export default (state: any, action: any) => {
  const { name, params, graph } = action.payload;

  return produce(state, (draftState: any) => {
    if (name === 'remove') {
      // 删除节点
      if (lodash.isArray(params.nodes) && params.nodes.length) {
        draftState.submitRuleSet.flowNodeVOs = lodash.filter(
          draftState.submitRuleSet.flowNodeVOs,
          (item) => !lodash.find(params.nodes, (model) => model.id === item.nodeId)
        );
      }

      // 删除节点
      if (lodash.isPlainObject(params.nodes)) {
        draftState.submitRuleSet.flowNodeVOs = lodash.filter(
          draftState.submitRuleSet.flowNodeVOs,
          (item) => !lodash.find(lodash.keys(params.nodes), (id) => id === item.nodeId)
        );
      }

      // 删除边
      if (lodash.isArray(params.edges) && params.edges.length) {
        const [originEdgeModel, edgeModel] = params.edges;

        draftState.submitRuleSet.flowNodeVOs = lodash.map(
          draftState.submitRuleSet.flowNodeVOs,
          (item) => {
            if (edgeModel.target === item.nodeId || originEdgeModel.target === item.nodeId) {
              item.nodeIdParent = '';
              item.decisionBranchId = '';
            }

            return item;
          }
        );
      }

      // 删除边
      if (lodash.isPlainObject(params.edges)) {
        draftState.submitRuleSet.flowNodeVOs = lodash.map(
          draftState.submitRuleSet.flowNodeVOs,
          (item) => {
            if (lodash.find(lodash.values(params.edges), (model) => model.target === item.nodeId)) {
              item.nodeIdParent = '';
              item.decisionBranchId = '';
            }
            return item;
          }
        );

        draftState.submitRuleSet.branchVOs = lodash.filter(
          draftState.submitRuleSet.branchVOs,
          (item) =>
            !lodash.find(lodash.values(params.edges), (model) => model.decisionId === item.id)
        );
      }
    } else if (name === 'dragEdge') {
      const [originEdgeModel, edgeModel] = params.edges;
      draftState.submitRuleSet.flowNodeVOs = lodash.flatten(
        lodash.map(draftState.submitRuleSet.flowNodeVOs, (item) => {
          // 删除边
          if (item.nodeId === originEdgeModel.target) {
            return {
              ...item,
              nodeIdParent: '',
            };
          }

          // 新增边
          const targetNodeId =
            lodash.isPlainObject(edgeModel.target) && lodash.has(edgeModel.target, 'x')
              ? lodash.reduce(
                  edgeModel.target,
                  (a, b, c) => {
                    if (c.match(/x|y|id/)) {
                      return a;
                    }
                    return `${a}${b}`;
                  },
                  ''
                )
              : edgeModel.target;

          if (item.nodeId === targetNodeId) {
            const decisionBranchId =
              lodash.find(
                draftState.submitRuleSet.flowNodeVOs,
                (vo) => vo.nodeId === edgeModel.source
              )?.decisionBranchId || '';
            const inEdges = graph.findById(item.nodeId).getInEdges();
            if (inEdges.length === 1) {
              return {
                ...item,
                nodeIdParent: edgeModel.source,
                decisionBranchId,
              };
            }
            if (inEdges.length > 1) {
              return [
                item,
                {
                  ...item,
                  nodeIdParent: edgeModel.source,
                  decisionBranchId,
                },
              ];
            }
          }

          return item;
        })
      );
    } else if (name === 'joinNode') {
      const [edge1, edge2] = params.edges;
      const [joinNode] = params.nodes;

      draftState.submitRuleSet.flowNodeVOs.push({
        ruleFlowId: '',
        nodeIdParent: edge1.getSource().getID(),
        nodeId: joinNode.getID(),
        decisionBranchId: '',
        nodeType: ServerNodeType.JoinNode,
        ruleReferenceId: '',
        nodeName: '',
        nodeDescription: '',
      });
      draftState.submitRuleSet.flowNodeVOs.push({
        ruleFlowId: '',
        nodeIdParent: edge2.getSource().getID(),
        nodeId: joinNode.getID(),
        decisionBranchId: '',
        nodeType: ServerNodeType.JoinNode,
        ruleReferenceId: '',
        nodeName: '',
        nodeDescription: '',
      });
    }
  });
};
