import { formatMessageApi } from '@/utils/dictFormatMessage';
import lodash from 'lodash';
import { OptionEnum } from 'process/GeneralPOS/common/Enum';
import { formUtils } from 'basic/components/Form';

const isNotChange = (value) => (value === 0 ? false : !value);

export const VLD_000909 = (policyInfo, transactionTypeCodeValue) => (
  rule: any,
  value: any,
  callback: Function
) => {
  const {
    requestTotalAmount,
    requestTotalPerc,
    withdrawalLevel,
    withdrawalOpt,
    partialWithdrawalFundList,
  } = transactionTypeCodeValue?.partialWithdrawal;

  if (!lodash.isEmpty(policyInfo?.policyFundDOList)) {
    if (withdrawalLevel === OptionEnum.FundLevel) {
      if (
        withdrawalOpt === OptionEnum.Amount &&
        lodash.every(partialWithdrawalFundList, (item) =>
          isNotChange(formUtils.queryValue(item?.writeWithdrawalAmt))
        )
      ) {
        callback(formatMessageApi({ Label_COM_WarningMessage: 'MSG_000582' }));
      }
      if (
        withdrawalOpt === OptionEnum.Unit &&
        lodash.every(partialWithdrawalFundList, (item) =>
          isNotChange(formUtils.queryValue(item?.withdrawalUnit))
        )
      ) {
        callback(formatMessageApi({ Label_COM_WarningMessage: 'MSG_000582' }));
      }
      if (
        withdrawalOpt === OptionEnum.Percent &&
        lodash.every(partialWithdrawalFundList, (item) =>
          isNotChange(formUtils.queryValue(item?.withdrawalPct))
        )
      ) {
        callback(formatMessageApi({ Label_COM_WarningMessage: 'MSG_000582' }));
      }
    }
    if (withdrawalLevel === OptionEnum.PolicyLevel) {
      if (
        isNotChange(formUtils.queryValue(requestTotalAmount)) &&
        isNotChange(formUtils.queryValue(requestTotalPerc))
      ) {
        callback(formatMessageApi({ Label_COM_WarningMessage: 'MSG_000582' }));
      }
    }
  }

  callback();
};
