import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';

export const VLD_000051 = (claimEntities: any) => {
  const incidentListMap = lodash.get(claimEntities, 'incidentListMap', []);
  const errors =
    lodash.size(incidentListMap) === 0
      ? [formatMessageApi({ Label_COM_WarningMessage: 'ERR_000070' })]
      : [];
  return errors;
};
