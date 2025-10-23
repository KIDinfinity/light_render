import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { formatMessageApi } from '@/utils/dictFormatMessage';

export const checkDiagnosisDuplicate = (
  diagnosisList: any,
  diagnosisListMap: any,
  diagnosisId: string
) => (rule: any, value: any, callback: Function) => {
  if (value === 'P') {
    const isExistPrimary = lodash
      .chain(diagnosisList)
      .filter((id: any) => id !== diagnosisId)
      .map((id: any) => formUtils.queryValue(diagnosisListMap[id]?.diagnosisType))
      .includes(value)
      .value();

    if (isExistPrimary) {
      callback(formatMessageApi({ Label_COM_WarningMessage: 'MSG_000112' }));
    }
  }
  callback();
};
