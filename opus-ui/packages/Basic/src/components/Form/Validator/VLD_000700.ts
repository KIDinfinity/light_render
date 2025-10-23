import { formatMessageApi } from '@/utils/dictFormatMessage';
import lodash from 'lodash';
import moment from 'moment';
import { ClaimDecision } from 'claim/pages/utils/claim';

/**
 *
 * @param 日期列表
 */

export const VLD_000700 = ({ radioDateList, claimDecision }: any) => (
  rule: any,
  value: any,
  callback: Function
) => {
  if (
    claimDecision !== ClaimDecision.deny &&
    !!radioDateList &&
    !lodash.isEmpty(radioDateList) &&
    moment(radioDateList[0]).format('YYYY-MM-DD') !== moment(value).format('YYYY-MM-DD')
  ) {
    callback(formatMessageApi({ Label_COM_WarningMessage: 'MSG_000648' }));
  }

  callback();
};
