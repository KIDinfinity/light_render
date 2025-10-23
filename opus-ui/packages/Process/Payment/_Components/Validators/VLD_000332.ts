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
    const updatePayeeList = [...payeeList];
    const currentUserIndex = updatePayeeList.findIndex(({ id: payeeId }) => id === payeeId);
    if (currentUserIndex === -1) {
      callback('user Id not found');
      return;
    }

    const newList = updatePayeeList.map((item, index) => {
      if (index === currentUserIndex) {
        return {
          ...item,
          [formName]: value,
        };
      }
      return item;
    });

    const payeeNames = newList.map(getClientName);

    const isMultiple = payeeNames.some(
      (name, index) => index !== currentUserIndex && name === payeeNames[currentUserIndex]
    );

    return isMultiple
      ? callback(formatMessageApi({ Label_COM_WarningMessage: 'MSG_000360' }))
      : callback();
  };
