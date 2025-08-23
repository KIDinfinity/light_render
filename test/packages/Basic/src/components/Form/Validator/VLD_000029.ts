import { formatMessageApi } from '@/utils/dictFormatMessage';
import { VLD_000180 } from './VLD_000180';

/**
 *
 * @param caseCategory 案件种类
 */
export const VLD_000029 = (caseCategory: string) => (rule: any, value: any, callback: Function) => {
  if (
    caseCategory === 'IAPC' ||
    caseCategory === 'IDAC' ||
    caseCategory === 'TH_GC_CTG02' ||
    caseCategory === 'TH_GC_CTG04'
  ) {
    if (value !== 'IP') {
      callback(formatMessageApi({ Label_COM_WarningMessage: 'ERR_000049' }, caseCategory));
    }
  }
  VLD_000180(caseCategory, value, callback);
  callback();
};
