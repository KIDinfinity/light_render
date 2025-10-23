import React from 'react';
import { NAMESPACE } from '../activity.config';

import { Validator, FormLayoutContext } from 'basic/components/Form';
import { useSelector } from 'dva';
import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import ErrorTooltipManual from 'claim/components/ErrorTooltipManual';
import styles from './Header.less';

const Header = ({ incidentId }: any) => {
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
    .filter((key) => diagnosisList?.includes(key))
    .map((key) => diagnosisListMap[key])
    .value();

  return (
    <div className={styles.header}>
      <h3 className={styles.title}>
        {submited && Validator.VLD_000052(incidentDiagnosisListMap, incidentItem) && (
          <ErrorTooltipManual
            manualErrorMessage={formatMessageApi({ Label_COM_WarningMessage: 'ERR_000183' })}
          />
        )}
        {formatMessageApi({
          Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.title.diagnosis',
        })}
      </h3>
      <FormLayoutContext.ExpandIcon />
    </div>
  );
};

export default Header;
