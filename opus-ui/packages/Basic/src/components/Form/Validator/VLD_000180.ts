import { formatMessageApi } from '@/utils/dictFormatMessage';

export const VLD_000180 = (caseCategory: string) => (rule: any, value: any, callback: Function) => {
  if (
    caseCategory === 'TH_GC_CTG03' ||
    caseCategory === 'TH_GC_CTG06' ||
    caseCategory === 'TH_GC_CTG07'
  ) {
    if (value !== 'OP') {
      callback(formatMessageApi({ Label_COM_WarningMessage: 'ERR_000178' }));
    }
  }
  callback();
};
