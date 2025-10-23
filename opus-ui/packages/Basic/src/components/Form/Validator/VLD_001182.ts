import { formatMessageApi } from '@/utils/dictFormatMessage';

export const VLD_001182 =
  (irradiationContentValue: any) => (rule: any, value: any, callback: Function) => {
    if (!value || !irradiationContentValue) {
      callback();
    }

    const isValid: boolean = value === '88' && irradiationContentValue < 50;
    if (isValid) {
      callback(formatMessageApi({ Label_COM_ErrorMessage: 'MSG_001355' }));
    } else {
      callback();
    }
  };
