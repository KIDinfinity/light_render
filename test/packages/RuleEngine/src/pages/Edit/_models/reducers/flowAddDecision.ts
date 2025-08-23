/* eslint-disable no-param-reassign */
import { produce }  from 'immer';
import lodash from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { ServerNodeType } from '../../Enum';

export default (state: any, action: any) =>
  produce(state, (draftState: any) => {
    if (!lodash.isPlainObject(draftState.submitRuleSet)) {
      draftState.submitRuleSet = {};
    }
    if (!lodash.isArray(draftState.submitRuleSet.flowNodeVOs)) {
      draftState.submitRuleSet.flowNodeVOs = [];
    }
    if (!lodash.isArray(draftState.submitRuleSet.branchVOs)) {
      draftState.submitRuleSet.branchVOs = [];
    }

    const { item, flowNodeVO, branchVO } = action.payload;

    // 新增分支
    const newBranchVOs = lodash.map(branchVO.branchList, (branch, index) => {
      return {
        ...branch,
        nodeId: flowNodeVO.nodeId,
        orderNo: `${index + 1}`,
      };
    });

    // 新增分支的节点与边
    newBranchVOs.forEach((branch, index) => {
      const newId = uuidv4();
      if (index === 0) {
        // 更新连线
        draftState.submitRuleSet.flowNodeVOs.forEach((vo) => {
          if (vo.nodeIdParent === item.getID()) {
            vo.nodeIdParent = newId;
          }
        });
      }
      draftState.submitRuleSet.flowNodeVOs.push({
        ruleFlowId: '',
        nodeIdParent: flowNodeVO.nodeId,
        nodeId: newId,
        decisionBranchId: branch.id,
        nodeType: '',
        ruleReferenceId: '',
        nodeName: branch.branchName,
        nodeDescription: '',
      });
    });

    draftState.submitRuleSet.branchVOs = draftState.submitRuleSet.branchVOs.concat(newBranchVOs);

    // 新增节点
    draftState.submitRuleSet.flowNodeVOs.push({
      ruleFlowId: '',
      nodeIdParent: item.getID(),
      nodeId: flowNodeVO.nodeId,
      decisionBranchId:
        lodash.find(draftState.submitRuleSet.flowNodeVOs, (vo) => vo.nodeId === item.getID())
          ?.decisionBranchId || '',
      nodeType: ServerNodeType.DecisionNode,
      ruleReferenceId: '',
      nodeName: flowNodeVO.nodeNameTemp,
      nodeDescription: flowNodeVO.nodeDescription,
    });

    return draftState;
  });
