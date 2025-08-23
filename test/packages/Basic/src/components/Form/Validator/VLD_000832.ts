import { formatMessageApi } from '@/utils/dictFormatMessage';
import lodash from 'lodash';
import { OptionEnum, PremiumTypeEnum } from 'process/GeneralPOS/common/Enum';
import { formUtils } from 'basic/components/Form';
import { tenant } from '@/components/Tenant';

export const VLD_000832 = (data) => (rule: any, value: any, callback: Function) => {
  const withdrawalOpt = formUtils.queryValue(data?.partialWithdrawal?.withdrawalOpt);
  const withdrawalLevel = formUtils.queryValue(data?.partialWithdrawal?.withdrawalLevel);
  const list = data?.partialWithdrawal?.partialWithdrawalFundList;

  if ((tenant.isPH() && withdrawalLevel === OptionEnum.FundLevel) || !tenant.isPH()) {
    const newList =
      lodash
        .chain(list)
        .filter((item) => PremiumTypeEnum.BOTH === formUtils.queryValue(item.premiumType))
        .value() || [];
    let optionKey = null;
    if (withdrawalOpt === OptionEnum.Percent) {
      optionKey = 'withdrawalPct';
    }
    if (withdrawalOpt === OptionEnum.Unit) {
      optionKey = 'withdrawalUnit';
    }
    if (withdrawalOpt === OptionEnum.Amount) {
      optionKey = 'writeWithdrawalAmt';
    }

    if (optionKey) {
      const error = newList.some((item) => formUtils.queryValue(item?.[optionKey]) === 0);
      if (error) {
        callback(formatMessageApi({ Label_COM_WarningMessage: 'MSG_000834' }));
      }
    }
  }
  callback();
};
