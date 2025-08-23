import { produce }  from 'immer';
import {v4 as uuidv4 } from 'uuid';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { getConditionData } from '../../Utils';
import { OptionType } from '../../NewFlow/Enum';

export default (state: any, action: any) => {
  const { id, initList, type, changedFields } = action.payload;

  const nextState = produce(state, (draftState: any) => {
    let newList = draftState.newRulFlow.conditionList || [];
    switch (type) {
      case OptionType.INIT:
        newList = initList;
        break;
      case OptionType.ADD:
        newList = [
          ...newList,
          {
            id: uuidv4(),
            atomCode: '',
            operator: '',
            value: '',
          },
        ];
        break;
      case OptionType.UPDATE:
        newList = lodash.map(newList, (item: any) => {
          const moduleCode = formUtils.queryValue(draftState.submitRuleSet.ruleSetInfo.moduleCode || '');
          const ruleAtoms = draftState.dropDown.ruleAtoms || [];
          const atomInputInfo = draftState.atomInputInfo || [];
          return item.id === id
            ? getConditionData({
                item,
                changedFields,
                moduleCode,
                ruleAtoms,
                atomInputInfo,
              })
            : item;
        });
        break;
      case OptionType.DELECT:
        newList = newList.filter((el: any) => el.id !== id);
        break;
      case OptionType.CLEAR:
        newList = [];
        break;
      default:
        break;
    }
    draftState.newRulFlow.conditionList = newList;
  });

  return { ...nextState };
};
