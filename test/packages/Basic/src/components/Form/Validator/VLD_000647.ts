import { formatMessageApi } from '@/utils/dictFormatMessage';
import lodash from 'lodash';
import { TransactionTypeEnum, OptionEnum } from 'process/GeneralPOS/common/Enum';
import { formUtils } from 'basic/components/Form';

export const VLD_000647 =
  (data, transactionTypeCode) => (rule: any, value: any, callback: Function) => {
    let error = false;

    const partialWithdrawalFundList = data?.partialWithdrawal?.partialWithdrawalFundList;
    const fundSwitchingFundList = data?.fundSwitching?.fundSwitchingFundList;
    const switchingOutOption = data?.fundSwitching?.switchingOutOption;
    const list =
      transactionTypeCode === TransactionTypeEnum.SRV003
        ? fundSwitchingFundList
        : partialWithdrawalFundList;

    if (transactionTypeCode === TransactionTypeEnum.SRV003) {
      let optionKey = null;
      if (switchingOutOption === OptionEnum.Percent) {
        optionKey = 'switchOutPerc';
      }
      if (switchingOutOption === OptionEnum.Unit) {
        optionKey = 'switchOutUnit';
      }
      if (switchingOutOption === OptionEnum.Amount) {
        optionKey = 'switchOutAmount';
      }

      error =
        lodash.isEmpty(list) ||
        list.every((item) => {
          return (
            ((!formUtils.queryValue(item?.[optionKey]) ||
              Number(formUtils.queryValue(item?.[optionKey]) === 0)) &&
              !formUtils.queryValue(item?.switchInPerc)) ||
            Number(formUtils.queryValue(item?.switchInPerc) === 0)
          );
        });
    }

    if (transactionTypeCode === TransactionTypeEnum.SRV006) {
      error = lodash.isEmpty(list);
    }

    if (error) {
      callback(formatMessageApi({ Label_COM_WarningMessage: 'MSG_000582' }));
    }
    callback();
  };
