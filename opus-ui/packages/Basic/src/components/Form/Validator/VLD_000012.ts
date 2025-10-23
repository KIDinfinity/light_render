import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';

interface IProps {
  start: number;
  end: number;
}

export const VLD_000012 = (range: IProps[]) => (rule: any, value: any, callback: Function) => {
  if (!lodash.isArray(range)) return;

  range.forEach((item: any) => {
    if (Number(value) < Number(item?.start) || Number(value) > Number(item?.end)) {
      callback(formatMessageApi({ Label_COM_WarningMessage: 'MSG_000023' }));
      return;
    }
  });
  callback();
};
