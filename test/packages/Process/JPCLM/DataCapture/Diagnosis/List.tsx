import React from 'react';
import { useSelector } from 'dva';
import lodash from 'lodash';
import { Validator, formUtils } from 'basic/components/Form';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import ErrorTooltipManual from 'claim/components/ErrorTooltipManual';
import DiagnosisListItem from './Item';
import { SectionTitle } from './Section';
import Add from './Add';

export default ({ incidentId }: any) => {
  const editable = !useSelector((state: any) => state.claimEditable.taskNotEditable);
  const submited = useSelector((state: any) => state.formCommonController.submited);

  const incidentItem = useSelector(
    ({ JPCLMOfDataCapture }: any) => JPCLMOfDataCapture.claimEntities?.incidentListMap?.[incidentId]
  );
  const diagnosisList = useSelector(
    ({ JPCLMOfDataCapture }: any) =>
      JPCLMOfDataCapture.claimEntities?.incidentListMap?.[incidentId]?.diagnosisList
  );
  const diagnosisListMap = useSelector(
    ({ JPCLMOfDataCapture }: any) => JPCLMOfDataCapture.claimEntities?.diagnosisListMap
  );
  const diagnosisAllMap = lodash.map(diagnosisList, (dianosisId) => {
    return formUtils.queryValue(diagnosisListMap[dianosisId].diagnosisCode);
  });
  const isRepetitionDiagnosisCode =
    diagnosisAllMap.length !== lodash.sortedUniq(diagnosisAllMap).length;

  const isShow = lodash.compact(diagnosisList).length > 0 || editable;

  const incidentDiagnosisListMap = lodash
    .chain(diagnosisListMap)
    .keys()
    .filter((key) => diagnosisList?.includes(key))
    .map((key) => diagnosisListMap[key])
    .value();

  return (
    <div>
      {isShow && (
        <SectionTitle
          type="point"
          suffix={
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
            </>
          }
        />
      )}

      {isShow &&
        lodash.map(lodash.compact(diagnosisList), (item) => (
          <DiagnosisListItem diagnosisId={item} key={item} />
        ))}
      {editable && <Add incidentId={incidentId} />}
    </div>
  );
};
