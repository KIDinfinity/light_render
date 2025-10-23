import React from 'react';
import { useSelector } from 'dva';
import lodash from 'lodash';
import { Validator, formUtils } from 'basic/components/Form';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import ErrorTooltipManual from 'claim/components/ErrorTooltipManual';
import DiagnosisListItem from './Item';
import Add from './Add';

export default ({ incidentId }: any) => {
  const editable = !useSelector((state: any) => state.claimEditable.taskNotEditable);
  const submited = useSelector((state: any) => state.formCommonController.submited);

  const incidentItem = useSelector(
    ({ opusClaimDataCapture }: any) =>
      opusClaimDataCapture.claimEntities?.incidentListMap?.[incidentId]
  );
  const diagnosisList = useSelector(({ opusClaimDataCapture }: any) =>
    lodash.compact(
      opusClaimDataCapture.claimEntities?.incidentListMap?.[incidentId]?.diagnosisList || []
    )
  );
  const diagnosisListMap = useSelector(
    ({ opusClaimDataCapture }: any) => opusClaimDataCapture.claimEntities?.diagnosisListMap
  );
  const diagnosisAllMap = lodash.map(diagnosisList, (dianosisId) => {
    return formUtils.queryValue(diagnosisListMap[dianosisId].diagnosisCode);
  });
  const isRepetitionDiagnosisCode =
    diagnosisAllMap.length !== lodash.sortedUniq(diagnosisAllMap).length;

  const isShowAdd = !diagnosisList.length && editable;

  const incidentDiagnosisListMap = lodash
    .chain(diagnosisListMap)
    .keys()
    .filter((key) => diagnosisList?.includes(key))
    .map((key) => diagnosisListMap[key])
    .value();

  return (
    <>
      {submited && Validator.VLD_000052(incidentDiagnosisListMap, incidentItem) && (
        <ErrorTooltipManual
          manualErrorMessage={formatMessageApi({ Label_COM_WarningMessage: 'ERR_000183' })}
        />
      )}
      {submited && isRepetitionDiagnosisCode && (
        <ErrorTooltipManual
          manualErrorMessage={formatMessageApi({ Label_COM_WarningMessage: 'ERR_000074' })}
        />
      )}
      {lodash.map(diagnosisList, (item, index) => (
        <DiagnosisListItem
          diagnosisId={item}
          key={item}
          index={index}
          disableDelete={diagnosisList?.length === 1}
        />
      ))}
      {isShowAdd && <Add incidentId={incidentId} />}
    </>
  );
};
