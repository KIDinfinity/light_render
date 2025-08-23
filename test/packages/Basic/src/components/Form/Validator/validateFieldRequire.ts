import { formatMessageApi } from '@/utils/dictFormatMessage';

export const validateFieldRequire = (fieldName: any) => {
  const finalFieldValue = {
    value: null,
    errors: [
      {
        field: fieldName,
        message: formatMessageApi({ Label_COM_WarningMessage: 'ERR_000001' }),
      },
    ],
    validating: false,
    dirty: false,
    touched: true,
    name: fieldName,
  };
  return finalFieldValue;
};
