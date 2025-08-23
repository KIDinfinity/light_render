import lodash from 'lodash';
import saveEditData from './saveEditData';
import getEditData from '../../Utils/getEditData';

export default (state: any, actionEl: any) => {
  const { editData, action, groupId } = actionEl.payload;
  const requiredAtoms =
    lodash
      .chain(state)
      .get('submitRuleSet.groups')
      .find((el) => el.groupId === groupId)
      .get('requiredAtoms')
      .value() || [];
  const newData = getEditData({ editData, action, requiredAtoms });
  const newState = saveEditData(state, {
    type: 'saveEditData',
    payload: {
      editData: newData,
    },
  });

  return {
    ...newState,
    action,
    currentGroupId: groupId,
  };
};
