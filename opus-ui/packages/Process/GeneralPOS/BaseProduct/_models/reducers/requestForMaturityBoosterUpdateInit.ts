/* eslint-disable no-param-reassign */
import { produce } from 'immer';
import lodash from 'lodash';

export default (state: any, { payload }: any) =>
  produce(state, (draftState: any) => {
    const { transactionId } = payload;
    const requestForMaturityBoosterPath = `entities.transactionTypesMap[${transactionId}].maturityBooster`;

    if (!lodash.isArray(lodash.get(draftState, `${requestForMaturityBoosterPath}.eventList`))) {
      lodash.set(draftState, `${requestForMaturityBoosterPath}.eventList`, []);
    }

    lodash.set(
      draftState,
      `${requestForMaturityBoosterPath}.eventList`,
      lodash.get(draftState, `${requestForMaturityBoosterPath}.eventList`).map((item) => ({
        ...item,
        isAdd: true,
      }))
    );
  });
