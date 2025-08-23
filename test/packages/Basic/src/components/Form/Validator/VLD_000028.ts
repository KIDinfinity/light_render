import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';

export const VLD_000028 = (claimEntities: any) => {
  const incidentListMap = lodash.get(claimEntities, 'incidentListMap', []);
  const errors: string[] = [];
  lodash.forEach(incidentListMap, (item) => {
    if (
      lodash.isArray(item.treatmentList) &&
      item.treatmentList.length === 0 &&
      lodash.get(item, 'claimType') === 'IP'
    ) {
      errors.push(formatMessageApi({ Label_COM_WarningMessage: 'ERR_000011' }, 'Treatment item'));
    }
  });
  return errors;
};
