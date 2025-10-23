import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';

export const VLD_000116 = (hasGetInsured: boolean, insuredList: any[], value: string) => {
  if (!hasGetInsured) return false;
  const size = lodash.size(insuredList);
  if (size === 0) return formatMessageApi({ Label_COM_WarningMessage: 'ERR_000125' }, value);
  if (size > 1) return formatMessageApi({ Label_COM_WarningMessage: 'ERR_000126' }, value);
  return false;
};
