import { some, isEmpty } from 'lodash';
import getSortModuleArr from 'bpm/pages/Envoy/_utils/getSortModuleArr';
import { formatMessageApi } from '@/utils/dictFormatMessage';

const checkLetter = (errObj: any, reason: any, isSend: boolean) => {
  const sortModuleArr = getSortModuleArr(reason?.displayConfig);
  const hasLetter = some(sortModuleArr, (module: any) => module.moduleName === 'letterType');
  if (hasLetter && isSend) {
    const { letterCode } = reason;
    if (isEmpty(letterCode)) {
      errObj.letter = [formatMessageApi({ Label_COM_WarningMessage: 'ERR_000001' })];
    }
  }
  return errObj;
};

export default checkLetter;
