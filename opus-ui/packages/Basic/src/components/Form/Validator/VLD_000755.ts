import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { getRadioDateListDicts } from 'process/JPCLM/ManualAssessment/_models/functions'

export const VLD_000755 = ({ therapeuticMonthList, duplicateMonthList }: any) => (
  rule: any,
  value: any,
  callback: Function
) => {
  if (value > lodash.size(getRadioDateListDicts({ therapeuticMonthList, duplicateMonthList }))) {
    callback(formatMessageApi({ Label_COM_ErrorMessage: 'MSG_000734' }));
  }
  callback();
};
