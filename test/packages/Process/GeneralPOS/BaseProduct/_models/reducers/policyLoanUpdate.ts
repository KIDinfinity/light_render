/* eslint-disable no-param-reassign */
import { produce } from 'immer';
import lodash from 'lodash';
import { diffTime } from 'process/GeneralPOS/common/utils';

export default (state: any, { payload }: any) =>
  produce(state, (draftState: any) => {
    const { changedFields, transactionId, validating } = payload;
    if (
      !validating &&
      lodash.hasIn(changedFields, 'effectiveDate') &&
      diffTime(
        changedFields.effectiveDate,
        draftState.entities.transactionTypesMap[transactionId]?.effectiveDate
      )
    ) {
      lodash.set(draftState, 'processData.showReAssess', {
        show: true,
        change: true,
        warnMessage: lodash.uniq([
          ...(draftState.processData?.showReAssess?.warnMessage || []),
          'MSG_000828',
        ]),
      });
    }
    if (lodash.has(changedFields, 'effectiveDate')) {
      draftState.entities.transactionTypesMap[transactionId] = {
        ...draftState.entities.transactionTypesMap[transactionId],
        effectiveDate: changedFields.effectiveDate,
      };
    }
    draftState.entities.transactionTypesMap[transactionId].policyLoan = {
      ...draftState.entities.transactionTypesMap[transactionId].policyLoan,
      ...changedFields,
    };
  });
