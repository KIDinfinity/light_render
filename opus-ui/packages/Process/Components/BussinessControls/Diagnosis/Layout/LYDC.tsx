import React from 'react';
import lodash from 'lodash';
import { useSelector } from 'dva';
import { FormTitleCard, FormBorderCard } from 'basic/components/Form';
import Diagnosis from 'process/Components/BussinessControls/Diagnosis';
import LYDCTitle from './LYDCTitle';
import LYDCItem from './LYDCItem';

import styles from './LYDC.less';

interface IProps {
  NAMESPACE: string;
  namespaceType: string;
  incidentId: string;
  editable: any;
}
const LYDC = (props: IProps) => {
  const diagnosisList =
    useSelector(
      ({ [props.NAMESPACE]: modelnamepsace }: any) =>
        modelnamepsace.claimEntities?.incidentListMap?.[props.incidentId]?.diagnosisList
    ) || [];

  return (
    <div className={styles.dp}>
      <FormTitleCard title={<LYDCTitle {...props} />}>
        {lodash.compact(diagnosisList).map((item: any) => (
          <LYDCItem {...props} diagnosisId={item} key={item} />
        ))}
        {
          <FormBorderCard className={styles.itemCard} marginBottom>
            <Diagnosis.SectionDCAdd {...props} />
          </FormBorderCard>
        }
      </FormTitleCard>
    </div>
  );
};

export default LYDC;
