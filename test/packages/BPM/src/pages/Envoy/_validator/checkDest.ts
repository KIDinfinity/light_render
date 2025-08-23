import getSortModuleArr from 'bpm/pages/Envoy/_utils/getSortModuleArr';
import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';

const checkDest = (errObj: any, reason: any, isSend: boolean) => {
  const ERR_000001 = formatMessageApi({ Label_COM_WarningMessage: 'ERR_000001' });
  const sortModuleArr = getSortModuleArr(reason?.displayConfig);
  const notDest =
    lodash.some(
      sortModuleArr,
      (module: any) =>
        module.moduleName === 'envoyTo' &&
        (!module.configRequired || (module.configRequired && module.required === true))
    ) && lodash.isEmpty(reason?.dest);
  if (notDest && isSend) {
    errObj.dest = [ERR_000001];
  } else {
    errObj.dest = [];
  }
  return errObj;
};

export default checkDest;
