import { formatMessageApi } from '@/utils/dictFormatMessage';
import lodash from 'lodash';
export const VLD_001138 =
  ({ diagnosis, diagnosisListId }: any) =>
  (rule: any, value: any, callback: Function) => {
    if (!!value && diagnosisListId?.length > 0) {
      const arr = lodash
        .chain(diagnosisListId)
        .map((id) => {
          const code = diagnosis[id]?.nnmSpecificInjuryFlag;
          return typeof code === 'string' ? code : code?.value;
        })
        .value();

      if (arr.length && arr.some((item) => item === '2') && value === 'A') {
        callback(formatMessageApi({ Label_COM_WarningMessage: 'MSG_001300' }));
      }
    }
    callback();
  };
