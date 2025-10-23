import React from 'react';
import lodash from 'lodash';
import { useSelector } from 'dva';
import { Validator } from 'basic/components/Form';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import ErrorTooltipManual from 'claim/components/ErrorTooltipManual';

interface IProps {
  NAMESPACE: string;
  incidentId: string;
}
const LYDCTitle = ({ NAMESPACE, incidentId }: IProps) => {
  const submited = useSelector(({ formCommonController }: any) => formCommonController.submited);
  const incidentItem = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.claimEntities?.incidentListMap?.[incidentId]
  );
  const diagnosisList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.claimEntities?.incidentListMap?.[incidentId]?.diagnosisList
  );
  const diagnosisListMap = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.claimEntities?.diagnosisListMap
  );

  const incidentDiagnosisListMap = lodash
    .chain(diagnosisListMap)
    .keys()
    .filter((key) => lodash.includes(diagnosisList, key))
    .map((key) => diagnosisListMap[key])
    .value();

  return (
    <>
      {submited && Validator.VLD_000052(incidentDiagnosisListMap, incidentItem) && (
        <ErrorTooltipManual
          manualErrorMessage={formatMessageApi({ Label_COM_WarningMessage: 'ERR_000183' })}
        />
      )}
      {formatMessageApi({
        Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.title.diagnosis',
      })}
    </>
  );
};

export default LYDCTitle;
