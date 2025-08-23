import { formatMessageApi } from '@/utils/dictFormatMessage';
import lodash from 'lodash';
export const VLD_000765 = ({ diagnosis, diagnosisListId }: any) => (
  rule: any,
  value: any,
  callback: Function
) => {
  if (!!value && diagnosisListId.length > 0) {
    const arr = lodash.chain(diagnosisListId).map((id) => {
      const code = diagnosis[id].diagnosisCode;
      return typeof code === 'string' ? code : code.value;
    });
    const res = arr
      .every((code) => {
        const string = lodash.toLower(code);
        if (string === '') return true;
        else if (value === 'A') return string.startsWith('s') || string.startsWith('t');
        else return !string.startsWith('s') && !string.startsWith('t');
      })
      .value();

    !res && callback(formatMessageApi({ Label_COM_ErrorMessage: 'MSG_000747' }));
  }
  callback();
};
