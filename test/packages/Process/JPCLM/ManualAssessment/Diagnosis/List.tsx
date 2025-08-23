import React from 'react';
import lodash from 'lodash';
import { useSelector } from 'dva';
import { Validator, formUtils } from 'basic/components/Form';
import classNames from 'classnames';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import ErrorTooltipManual from 'claim/components/ErrorTooltipManual';
import Item from './Item';
import Add from './Add';
import { SectionTitle } from './Section';
import styles from './List.less';

const DiagnosisList = ({ incidentId, hasTreatment }: any) => {
  const submited = useSelector(({ formCommonController }: any) => formCommonController.submited);
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  const incidentItem = useSelector(
    ({ JPCLMOfClaimAssessment }: any) =>
      JPCLMOfClaimAssessment.claimEntities?.incidentListMap?.[incidentId]
  );
  const diagnosisList = useSelector(
    ({ JPCLMOfClaimAssessment }: any) =>
      JPCLMOfClaimAssessment.claimEntities?.incidentListMap?.[incidentId]?.diagnosisList
  );
  const diagnosisListMap = useSelector(
    ({ JPCLMOfClaimAssessment }: any) => JPCLMOfClaimAssessment.claimEntities?.diagnosisListMap
  );
  const diagnosisAllMap = lodash.map(diagnosisList, (dianosisId) => {
    return formUtils.queryValue(diagnosisListMap[dianosisId].diagnosisCode);
  });
  const isRepetitionDiagnosisCode =
    diagnosisAllMap.length !== lodash.sortedUniq(diagnosisAllMap).length;

  const isShow = lodash.size(lodash.compact(diagnosisList)) || editable;

  const incidentDiagnosisListMap = lodash
    .chain(diagnosisListMap)
    .keys()
    .filter((key) => diagnosisList?.includes(key))
    .map((key) => diagnosisListMap[key])
    .value();

  return (
    <div
      className={classNames({
        [styles.diagnosiCard]: isShow,
      })}
    >
      {isShow && (
        <div>
          <h3 className={styles.title}>
            <SectionTitle
              type="point"
              suffix={
                <>
                  {submited && isRepetitionDiagnosisCode && (
                    <ErrorTooltipManual
                      manualErrorMessage={formatMessageApi({
                        Label_COM_WarningMessage: 'ERR_000074',
                      })}
                    />
                  )}
                  {submited && Validator.VLD_000052(incidentDiagnosisListMap, incidentItem) && (
                    <ErrorTooltipManual
                      manualErrorMessage={formatMessageApi({
                        Label_COM_WarningMessage: 'ERR_000183',
                      })}
                    />
                  )}
                </>
              }
            />
          </h3>
          {lodash.map(lodash.compact(diagnosisList), (item) => (
            <Item
              key={item}
              incidentId={incidentId}
              diagnosisId={item}
              hasTreatment={hasTreatment}
            />
          ))}
        </div>
      )}
      {editable && <Add incidentId={incidentId} />}
    </div>
  );
};

export default DiagnosisList;
