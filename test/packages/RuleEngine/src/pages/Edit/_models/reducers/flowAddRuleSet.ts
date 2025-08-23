/* eslint-disable no-param-reassign */
import { produce }  from 'immer';
import lodash from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { ServerNodeType } from '../../Enum';

export default (state: any, action: any) =>
  produce(state, (draftState: any) => {
    const { ruleSetInfo, item } = action.payload;

    if (!lodash.isPlainObject(draftState.submitRuleSet)) {
      draftState.submitRuleSet = {};
    }
    if (!lodash.isArray(draftState.submitRuleSet.flowNodeVOs)) {
      draftState.submitRuleSet.flowNodeVOs = [];
    }

    const newId = uuidv4();

    // 更新连线
    draftState.submitRuleSet.flowNodeVOs.forEach((vo) => {
      if (vo.nodeIdParent === item.getID()) {
        vo.nodeIdParent = newId;
      }
    });

    // 新增节点
    draftState.submitRuleSet.flowNodeVOs.push({
      ruleFlowId: ruleSetInfo.type === ServerNodeType.SubRuleFlow ? ruleSetInfo.ruleSetId : '',
      nodeIdParent: item.getID(),
      nodeId: newId,
      decisionBranchId:
        lodash.find(draftState.submitRuleSet.flowNodeVOs, (vo) => vo.nodeId === item.getID())
          ?.decisionBranchId || '',
      nodeType: [ServerNodeType.SubRuleSet, ServerNodeType.SubRuleFlow].includes(ruleSetInfo.type)
        ? ruleSetInfo.type
        : ServerNodeType.SubRuleSet,
      ruleReferenceId: ruleSetInfo.id,
      nodeName: ruleSetInfo.ruleSetName,
      nodeDescription: ruleSetInfo.description,
    });
  });
