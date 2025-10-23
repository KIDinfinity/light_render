import { produce } from 'immer';
import lodash from 'lodash';
import moment from 'moment';
import { formUtils } from 'basic/components/Form';
export default (state: any, { payload }: any) =>
  produce(state, (draftState: any) => {
    const { changedFields, transactionId } = payload;
    if (!lodash.hasIn(changedFields, 'payinOption')) {
      draftState.entities.transactionTypesMap[
        transactionId
      ].paymentInMethodList[0].txPmCreditCardList[0] = {
        ...draftState.entities.transactionTypesMap[transactionId].paymentInMethodList[0]
          .txPmCreditCardList[0],
        ...changedFields,
      };
    }

    if (lodash.hasIn(changedFields, 'expiryDate')) {
      const exitExpiryDate = formUtils.queryValue(changedFields.expiryDate);
      let expiryDate = exitExpiryDate;
      let middleExpiryDate = exitExpiryDate;

      if (exitExpiryDate) {
        middleExpiryDate = exitExpiryDate
          .split('-')
          .map((item, index) => (index === 2 ? '15T00:00:00+08:00' : item))
          .join('-');

        expiryDate = lodash.split(moment(middleExpiryDate).format('MM/YYYY'), '/');
      }

      draftState.entities.transactionTypesMap[
        transactionId
      ].paymentInMethodList[0].txPmCreditCardList[0] = {
        ...draftState.entities.transactionTypesMap[transactionId].paymentInMethodList[0]
          .txPmCreditCardList[0],
        expiryDate: {
          ...changedFields.expiryDate,
          value: middleExpiryDate,
        },
        expiryDateYear: exitExpiryDate ? expiryDate[1] : '',
        expiryDateMonth: exitExpiryDate ? expiryDate[0] : '',
      };
    }
  });
