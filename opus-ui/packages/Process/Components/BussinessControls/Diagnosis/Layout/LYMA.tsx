import React from 'react';
import lodash from 'lodash';
import { useSelector } from 'dva';
import { FormLayoutContext, FormBorderCard } from 'basic/components/Form';
import Diagnosis from 'process/Components/BussinessControls/Diagnosis';
import LYMAHeader from './LYMAHeader';
import LYMAItem from './LYMAItem';
import styles from './LYMA.less';

interface IProps {
  NAMESPACE: string;
  namespaceType: string;
  incidentId: string;
  editable: any;
}
const Entrance = (props: IProps) => {
  const diagnosisList =
    useSelector(
      ({ [props.NAMESPACE]: modelnamepsace }: any) =>
        modelnamepsace.claimEntities?.incidentListMap?.[props.incidentId]?.diagnosisList
    ) || [];
  return (
    <div className={styles.ma}>
      <FormLayoutContext.ExpandProvider>
        {(lodash.size(diagnosisList) > 0 || props.editable) && <LYMAHeader {...props} />}
        {lodash.compact(diagnosisList).map((item: any) => (
          <LYMAItem {...props} diagnosisId={item} key={item} />
        ))}
        {props.editable && (
          <FormBorderCard marginBottom>
            <Diagnosis.SectionMAAdd {...props} />
          </FormBorderCard>
        )}
      </FormLayoutContext.ExpandProvider>
    </div>
  );
};

export default Entrance;
