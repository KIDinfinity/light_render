import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';

import { formUtils } from 'basic/components/Form';
/**
 *
 * @param payeeList  校验payee name是否重复
 * Validate if there are duplicate records with the same name
 * when adding/modifying payee records
 */
const getClientName = (client) =>
  lodash
    .compact(
      [client.firstName, client.middleName, client.surname].map((data) =>
        formUtils.queryValue(data)
      )
    )
    .join(' ');

export const VLD_000332 =
  ({ payeeList, id, formName }: any) =>
  (rule: any, value: any, callback: Function) => {
    const currentUserIndex = payeeList.findIndex(({ id: payeeId }) => id === payeeId);
    const payeeNames = payeeList.map(getClientName);

    const isMultiple = payeeNames.some(
      (name, index) => index !== currentUserIndex && name === payeeNames[currentUserIndex]
    );

    return isMultiple
      ? callback(formatMessageApi({ Label_COM_WarningMessage: 'MSG_000360' }))
      : callback();
  };
