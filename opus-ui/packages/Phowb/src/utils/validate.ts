import { formatMessageApi } from '@/utils/dictFormatMessage';
import lodash from 'lodash';

export const getSectionError = ({ transactionTypes }) => {
  const errorsSet = new Set<string>();
  if (
    (lodash.isArray(transactionTypes) && !transactionTypes.length) ||
    !transactionTypes
  ) {
    errorsSet.add(
      formatMessageApi(
        {
          Label_COM_WarningMessage: 'ERR_000011',
        },
        formatMessageApi({
          Label_BIZ_POS: 'TransType',
        })
      )
    );
  }

  return [...errorsSet];
};
