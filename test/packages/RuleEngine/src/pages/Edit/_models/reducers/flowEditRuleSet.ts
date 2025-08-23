/* eslint-disable no-param-reassign */
import { produce }  from 'immer';
import lodash from 'lodash';
import { ServerNodeType } from '../../Enum';

export default (state: any, action: any) =>
  produce(state, (draftState: any) => {
    const { nodeId, ruleSetInfo } = action.payload;

    draftState.submitRuleSet.flowNodeVOs = lodash.map(
      draftState.submitRuleSet.flowNodeVOs,
      (item) => {
        if (item.nodeId === nodeId) {
          return {
            ...item,
            ruleFlowId:
              ruleSetInfo.type === ServerNodeType.SubRuleFlow ? ruleSetInfo.ruleSetId : '',
            nodeType: [ServerNodeType.SubRuleSet, ServerNodeType.SubRuleFlow].includes(
              ruleSetInfo.type
            )
              ? ruleSetInfo.type
              : ServerNodeType.SubRuleSet,
            ruleReferenceId: ruleSetInfo.id,
            nodeName: ruleSetInfo.ruleSetName,
            nodeDescription: ruleSetInfo.description,
          };
        }

        return item;
      }
    );
  });
