import React from 'react';
import { NAMESPACE } from 'opus/Pages/Process/Claim/ManualAssessment/activity.config';

import { useDispatch, useSelector } from 'dva';
import { Button } from 'antd';
import { FormLayoutContext } from 'basic/components/Form';
import Title from './Title';
import { useGetOcrShow } from '../../_hooks';
import styles from './Header.less';

export default ({ incidentId, form }: any) => {
  const dispatch = useDispatch();
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  const treatmentListMap = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.claimEntities.treatmentListMap
  );
  const incidentListMap = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.claimEntities.incidentListMap
  );
  const incidentItem = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.claimEntities.incidentListMap[incidentId]
  );

  const showOcr = useGetOcrShow({ incidentId, incidentItem, incidentListMap, treatmentListMap });
  const onAdd = () => {
    dispatch({
      type: `${NAMESPACE}/incidentAdd`,
    });
  };

  return (
    <div className={styles.header}>
      <div className={styles.title}>
        <Title incidentId={incidentId} />
      </div>
      <div className={styles.section}>
        {!!showOcr && (
          <div className={styles.buttonWrap}>
            <Button
              disabled={!editable}
              size="small"
              onClick={() => {
                dispatch({
                  type: 'commonClaimAssessmentController/callOcr',
                  payload: {
                    nameSpace: NAMESPACE,
                  },
                });
              }}
            >
              AI OCR
            </Button>
          </div>
        )}
        <FormLayoutContext.ExpandIcon className={styles.icon} />
      </div>
    </div>
  );
};
