/* eslint-disable no-param-reassign */
import { produce } from 'immer';
import lodash from 'lodash';
import { OptionEnum } from 'process/GeneralPOS/common/Enum';
export default (state: any, { payload }: any) =>
  produce(state, (draftState: any) => {
    const { transactionId } = payload;
    const transactionPath = `entities.transactionTypesMap[${transactionId}]`;

    if (
      lodash.isEmpty(
        lodash.get(draftState, `${transactionPath}.paymentInMethodList[0].txPmCreditCardList`, [])
      )
    ) {
      draftState.entities.transactionTypesMap[transactionId].paymentInMethodList = [];
      lodash.set(
        draftState,
        `${transactionPath}.paymentInMethodList[0].payinOption`,
        OptionEnum.CCD
      );
      draftState.entities.transactionTypesMap[
        transactionId
      ].paymentInMethodList[0].txPmCreditCardList = [];
    }
  });
