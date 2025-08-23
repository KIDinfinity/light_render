import { produce } from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';

const saveNewPayee = (state: any, action: any) => {
  const { changedFields } = action.payload;

  const payeeSelection = formUtils.queryValue(changedFields?.payeeSelection);
  const nextState = produce(state, (draftState: any) => {
    lodash.forEach(draftState?.claimEntities?.payeeListMap, (item: any) => {
      if (item?.id === payeeSelection) {
        lodash.set(draftState?.claimEntities?.payeeListMap, `${item.id}.select`, 1);
      } else {
        lodash.set(draftState?.claimEntities?.payeeListMap, `${item.id}.select`, 0);
      }
    });
  });

  return { ...nextState };
};

export default saveNewPayee;
