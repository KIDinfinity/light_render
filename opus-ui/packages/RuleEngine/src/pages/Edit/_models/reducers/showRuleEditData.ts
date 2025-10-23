import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { ModalType } from '../../Enum';
import { getIsNewRule, getEditData } from '../../Utils';

export default (state: any, actionEl: any) => {
  const { editData, action, groupId } = actionEl.payload;
  const ruleSetInfo = state.submitRuleSet?.ruleSetInfo || {};
  const moduleCode = formUtils.queryValue(ruleSetInfo?.moduleCode) || '';
  const requiredAtoms =
    lodash
      .chain(state)
      .get('submitRuleSet.groups')
      .find((el: any) => el.groupId === groupId)
      .get('requiredAtoms')
      .value() || [];

  return {
    ...state,
    editData: getEditData({ editData, action, requiredAtoms }),
    modalOptions: {
      ...state.modalOptions,
      edit: {
        show: true,
        type: getIsNewRule(moduleCode, state?.dropDown?.ruleModules)
          ? ModalType.NewEdit
          : ModalType.EditDefault,
      },
    },
    action,
    currentGroupId: groupId,
  };
};
