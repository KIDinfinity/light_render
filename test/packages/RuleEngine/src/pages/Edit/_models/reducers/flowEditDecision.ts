/* eslint-disable no-param-reassign */
import { produce }  from 'immer';
import lodash from 'lodash';
import { v4 as uuidv4 } from 'uuid';

export default (state: any, action: any) =>
  produce(state, (draftState: any) => {
    const { nodeId, flowNodeVO, branchVO } = action.payload;

    draftState.submitRuleSet.flowNodeVOs = lodash.map(
      draftState.submitRuleSet.flowNodeVOs,
      (item) => {
        if (item.nodeId === nodeId && !lodash.isEqual(item, flowNodeVO)) {
          return {
            ...item,
            ...flowNodeVO,
            nodeName: flowNodeVO.nodeNameTemp,
          };
        }

        return item;
      }
    );

    // 分支：哪些要新增、哪些要删除、哪些要修改
    const newIds = lodash.map(branchVO.branchList, (branch) => branch.id);
    const oldIds = lodash.map(state.submitRuleSet.branchVOs, (branch) => branch.id);
    const needAddIds = lodash.difference(newIds, oldIds);
    // decisionId相同的Branch，不一定真的需要修改
    const needEditIds = lodash.intersection(newIds, oldIds);
    const needRemoveIds = lodash.difference(oldIds, newIds);

    // 编辑
    draftState.submitRuleSet.branchVOs = lodash.map(draftState.submitRuleSet.branchVOs, (item) => {
      const newBranch = lodash.find(branchVO.branchList, (branch) => branch.id === item.id);
      if (needEditIds.includes(item.id) && newBranch) {
        return {
          ...item,
          ...newBranch,
        };
      }

      return item;
    });

    // 删除
    draftState.submitRuleSet.branchVOs = draftState.submitRuleSet.branchVOs.filter(
      (item) => !needRemoveIds.includes(item.id)
    );

    // 新增
    draftState.submitRuleSet.branchVOs = draftState.submitRuleSet.branchVOs.concat(
      lodash.filter(branchVO.branchList, (branch) => needAddIds.includes(branch.id))
    );

    // 编辑节点
    draftState.submitRuleSet.flowNodeVOs = lodash.map(
      draftState.submitRuleSet.flowNodeVOs,
      (item) => {
        if (needEditIds.includes(item.decisionBranchId)) {
          const branch = lodash.find(branchVO.branchList, (branchA) => branchA.id === item.id);
          return {
            ...item,
            ...branch,
          };
        }

        return item;
      }
    );

    // 删除节点
    draftState.submitRuleSet.flowNodeVOs = draftState.submitRuleSet.flowNodeVOs.filter(
      (item) => !needRemoveIds.includes(item.decisionBranchId)
    );

    // 新增节点
    lodash
      .filter(branchVO.branchList, (branch) => needAddIds.includes(branch.id))
      .forEach((branch) => {
        draftState.submitRuleSet.flowNodeVOs.push({
          ruleFlowId: '',
          nodeIdParent: branch.nodeId,
          nodeId: uuidv4(),
          decisionBranchId: branch.id,
          nodeType: '',
          ruleReferenceId: '',
          nodeName: branch.branchName,
          nodeDescription: '',
        });
      });

    return draftState;
  });
