import getSortModuleArr from 'bpm/pages/Envoy/_utils/getSortModuleArr';
import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';

const checkFreeField = (errObj: any, reason: any, isSend: boolean) => {
  const ERR_000001 = formatMessageApi({ Label_COM_WarningMessage: 'ERR_000001' });
  const sortModuleArr = getSortModuleArr(reason?.displayConfig);
  if (isSend) {
    lodash
      .filter(sortModuleArr, (module: any) => module.moduleName === 'freeField' && module.required)
      .forEach((item) => {
        if (lodash.isEmpty(reason?.[item.custom.name])) {
          errObj[item.custom.name] = [ERR_000001];
        }
      });
  }

  return errObj;
};

export default checkFreeField;
