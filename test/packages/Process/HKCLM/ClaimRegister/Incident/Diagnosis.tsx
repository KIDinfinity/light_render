import React from 'react';
import { NAMESPACE } from '../activity.config';
import { useSelector } from 'dva';
import lodash from 'lodash';
import { FormTitleCard } from 'basic/components/Form';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import Item from './DiagnosisItem';
import Add from '../../DataCapture/Diagnosis/Add';
import styles from '../../DataCapture/Diagnosis/index.less';

const Diagnosis = ({ incidentId }: any) => {
  const diagnosisList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.claimEntities?.incidentListMap?.[incidentId]?.diagnosisList
  );

   return (
    <div className={styles.diagnosis}>
      <FormTitleCard
        title={
          <>
            {formatMessageApi({
              Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.title.diagnosis',
            })}
          </>
        }
      >
        {lodash.compact(diagnosisList).map((item) => (
          <Item incidentId={incidentId} diagnosisId={item} key={item} />
        ))}
        {
          !lodash.compact(diagnosisList)?.length && <Add incidentId={incidentId} />
        }
      </FormTitleCard>
    </div>
  );
};

export default Diagnosis;
