import { produce }  from 'immer';
import lodash from 'lodash';

const saveRequireAtoms = (state: any, action: any) => {
  const { groupId, requiredAtoms, oldRequiredAtoms } = action.payload;

  const nextState = produce(state, (draftState: any) => {
    // eslint-disable-next-line no-param-reassign
    draftState.submitRuleSet.groups = lodash.map(draftState.submitRuleSet.groups, (item) => {
      if (item.groupId === groupId) {
        const requiredAtomsItem = item.requiredAtoms || [];
        return {
          ...item,
          requiredAtoms: requiredAtomsItem
            ?.filter(
              (el) =>
                !lodash.some(
                  oldRequiredAtoms,
                  (atom) => atom.atomCode === el.atomCode && el.type === atom.type
                )
            )
            ?.concat(requiredAtoms),
        };
      }

      return item;
    });
  });

  return { ...nextState };
};

export default saveRequireAtoms;
