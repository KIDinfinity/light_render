import React from 'react';
import { useSelector, useDispatch } from 'dva';
import { FormBorderCard } from 'basic/components/Form';
import Diagnosis from 'process/Components/BussinessControls/Diagnosis';
import styles from './LYDC.less';

interface IProps {
  editable?: boolean;
  NAMESPACE: string;
  incidentId: string;
  diagnosisId: string;
}
const Item = (props: IProps) => {
  const { NAMESPACE, editable, incidentId, diagnosisId } = props;
  const dispatch = useDispatch();

  const isRegisterMcs = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.isRegisterMcs
  );
  const diagnosisItem = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.claimEntities?.diagnosisListMap?.[diagnosisId]
  );

  return (
    <FormBorderCard
      marginBottom
      className={styles.itemCard}
      button={{
        visiable: editable && (!isRegisterMcs || diagnosisItem?.isManualAdd),
        callback: () => {
          dispatch({
            type: `${NAMESPACE}/removeDiagnosisItem`,
            payload: {
              incidentId,
              diagnosisId,
            },
          });
        },
      }}
    >
      <Diagnosis.SectionBasic {...props} />
    </FormBorderCard>
  );
};

export default Item;
