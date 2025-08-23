import { produce }  from 'immer';
import { ModalType } from '../../Enum';
import { getIsNewRule } from '../../Utils';

const showRuleNewEditData = (state: any, action: any) => {
  const { editData, actionType, moduleCode, groupId } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    // eslint-disable-next-line no-param-reassign
    draftState.editData = editData;
    draftState.action = actionType;
    draftState.currentGroupId = groupId;
    draftState.modalOptions = {
      ...draftState.modalOptions,
      edit: {
        show: true,
        type: getIsNewRule(moduleCode, state?.dropDown?.ruleModules)
          ? ModalType.NewEdit
          : ModalType.EditDefault,
      },
    };
  });

  return { ...nextState };
};

export default showRuleNewEditData;
