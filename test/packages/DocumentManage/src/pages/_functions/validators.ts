import { formatMessageApi } from '@/utils/dictFormatMessage';
import { precisionEnsure } from '@/utils/precisionUtils';

export const VLD_000310 = (fileSize: number, limit: number) => (
  rule: any,
  value: any,
  callback: Function
) => {
  if (fileSize > limit) {
    callback(
      formatMessageApi(
        { Label_COM_WarningMessage: 'ERR_000289' },
        `${precisionEnsure(limit / 2 ** 10 / 2 ** 10)}M`
      )
    );
  }
  callback();
};

export default {
  VLD_000310,
};
