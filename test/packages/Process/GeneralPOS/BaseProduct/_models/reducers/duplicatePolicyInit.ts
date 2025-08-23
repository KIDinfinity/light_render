/* eslint-disable no-param-reassign */
import { produce }  from 'immer';

export default (state: any, { payload }: any) =>
  produce(state, (draftState: any) => {
    const { transactionId, timesOfReplacement } = payload;
    draftState.entities.transactionTypesMap[transactionId].duplicatePolicy = {
      chargeFee: timesOfReplacement ? 200 : 0,
      beforeChargeFee: timesOfReplacement ? 200 : 0,
      timesOfReplacement: timesOfReplacement ? Number(timesOfReplacement) + 1 : timesOfReplacement,
      originTimesOfReplacement: timesOfReplacement,
      regenerateContract: 'N',
      feeCurrency: 'PHP',
    };
    draftState.entities.transactionTypesMap[transactionId].chargeFee = timesOfReplacement ? 200 : 0;
    draftState.entities.transactionTypesMap[transactionId].feeCurrency = 'PHP';
  });
