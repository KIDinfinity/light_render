import { formatMessageApi } from '@/utils/dictFormatMessage';
import Beneficiarytype from 'process/NB/ManualUnderwriting/Enum/Beneficiarytype';

export const VLD_000715 =
  ({ beneficiaryType }: any) =>
  (rule: any, value: any, callback: Function) => {
    if (beneficiaryType !== Beneficiarytype.TB && (value % 5 || value === 0)) {
      callback(formatMessageApi({ Label_COM_WarningMessage: 'MSG_000669' }));
    }
    callback();
  };
