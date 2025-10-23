import React from 'react';
import { NAMESPACE } from '../activity.config';

import { useSelector } from 'dva';
import lodash from 'lodash';
import { FormTitleCard, Validator } from 'basic/components/Form';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import ErrorTooltipManual from 'claim/components/ErrorTooltipManual';
import Item from './Item';
import Add from './Add';
import styles from './index.less';

const Diagnosis = ({ incidentId }: any) => {
  const submited = useSelector(({ formCommonController }: any) => formCommonController.submited);
  const incidentItem = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.claimEntities.incidentListMap[incidentId]
  );
  const diagnosisList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.claimEntities.incidentListMap[incidentId]?.diagnosisList
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
    <div className={styles.diagnosis}>
      <FormTitleCard
        title={
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
        }
      >
        {lodash.compact(diagnosisList).map((item) => (
          <Item incidentId={incidentId} diagnosisId={item} key={item} />
        ))}
        <Add incidentId={incidentId} />
      </FormTitleCard>
    </div>
  );
};

export default Diagnosis;
