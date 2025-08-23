import getSortModuleArr from 'bpm/pages/Envoy/_utils/getSortModuleArr';
import { some } from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';

const checkPayment = (errObj: any, reason: any, isSend: boolean) => {
  const sortModuleArr = getSortModuleArr(reason?.displayConfig);
  const hasPayment = some(sortModuleArr, (module: any) => module.moduleName === 'payment');
  if (hasPayment && isSend) {
    const { payment } = reason;
    if (payment === '') {
      errObj.payment = [formatMessageApi({ Label_COM_WarningMessage: 'ERR_000001' })];
    }
  }
  return errObj;
};

export default checkPayment;