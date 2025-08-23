/* eslint-disable no-param-reassign */
import { formUtils } from 'basic/components/Form';
import { produce } from 'immer';
import lodash from 'lodash';
import { OperationTypeEnum, OptionEnum } from 'process/GeneralPOS/common/Enum';
import { updateTypeFn } from './paymentMethodUpdate';

export default (state: any, { payload }: any) =>
  produce(state, (draftState: any) => {
    const { transactionId, changedFields, validating } = payload;
    const transactionPath = `entities.transactionTypesMap[${transactionId}]`;
    if (lodash.isEmpty(lodash.get(draftState, `${transactionPath}.changeIcp`))) {
      draftState.entities.transactionTypesMap[transactionId].changeIcp = {};
    }

    if (!validating && lodash.has(changedFields, 'icpOption')) {
      const cleanIcpOption = formUtils.queryValue(changedFields?.icpOption);
      if ([OptionEnum.BTR, OptionEnum.PPY, OptionEnum.PDT].includes(cleanIcpOption)) {
        lodash.set(
          draftState,
          `${transactionPath}.paymentMethodList[0].payoutOption`,
          cleanIcpOption === OptionEnum.PDT ? OptionEnum.BTR : cleanIcpOption
        );
        updateTypeFn[OperationTypeEnum.UPDATE](
          draftState,
          {
            payoutOption: cleanIcpOption === OptionEnum.PDT ? OptionEnum.BTR : cleanIcpOption,
          },
          {
            transactionPath,
            validating: false,
          }
        );
      }
    }
    if (!validating && lodash.has(changedFields, 'icpEligible')) {
      if (formUtils.queryValue(changedFields?.icpEligible) === 'N') {
        lodash.set(changedFields, `icpOption`, '');
      }
    }

    draftState.entities.transactionTypesMap[transactionId].changeIcp = {
      ...draftState.entities.transactionTypesMap[transactionId].changeIcp,
      ...changedFields,
    };
  });
