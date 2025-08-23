import lodash from 'lodash';
import { getExistDiagnosisList } from 'claim/pages/utils/selector';
import { formatMessageApi } from '@/utils/dictFormatMessage';

const getDiagnosisSectionError = (existDiagnosisList: any[]) => {
  let message = '';
  if (lodash.isEmpty(existDiagnosisList)) {
    message = formatMessageApi({ Label_COM_WarningMessage: 'ERR_000011' }, 'Diagnosis');
  } else if (
    !lodash.isEmpty(existDiagnosisList) &&
    existDiagnosisList.every((item: any) => item.diagnosisType !== 'P')
  ) {
    message = formatMessageApi({ Label_COM_WarningMessage: 'ERR_000183' });
  }
  return message;
};

export const VLD_000185 = (claimEntities: any) => {
  const incidentListMap = lodash.get(claimEntities, 'incidentListMap', []);
  const diagnosisListMap = lodash.get(claimEntities, 'diagnosisListMap', []);

  return lodash
    .chain(lodash.values(incidentListMap))
    .map((item: any) => {
      return getDiagnosisSectionError(getExistDiagnosisList(item.id, diagnosisListMap));
    })
    .compact()
    .value();
};
