import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { formUtils } from 'basic/components/Form';

export const VLD_000389 = (payeeBankAccountList?: any[]) => {
  if (!lodash.isEmpty(payeeBankAccountList)) {
    const isSelected = lodash.some(
      payeeBankAccountList,
      (item) => !!formUtils.queryValue(item.isSelect)
    );
    if (!isSelected) {
      return formatMessageApi({ Label_COM_ErrorMessage: 'MSG_000400' });
    }
  }
  return false;
};
