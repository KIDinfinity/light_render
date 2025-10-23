import { formatMessageApi } from '@/utils/dictFormatMessage';
import { OptionEnum } from 'process/GeneralPOS/common/Enum';
import { formUtils } from 'basic/components/Form';
import lodash from 'lodash';

export const VLD_000829 = (data) => (rule: any, value: any, callback: Function) => {
  const list = data?.fundSwitching?.fundSwitchingFundList;
  const switchingOutOption = formUtils.queryValue(data?.fundSwitching?.switchingOutOption);

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
  const error =
    lodash.isEmpty(list) ||
    list.every(
      (item) =>
        !formUtils.queryValue(item?.[optionKey]) ||
        Number(formUtils.queryValue(item?.[optionKey]) === 0)
    );

  if (error) {
    callback(formatMessageApi({ Label_COM_WarningMessage: 'MSG_000831' }));
  }
  callback();
};
