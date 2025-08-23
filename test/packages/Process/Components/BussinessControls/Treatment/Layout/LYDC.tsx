import React from 'react';
import lodash from 'lodash';
import { useSelector } from 'dva';
import LYDCItem from './LYDCItem';
import LYDCAdd from './LYDCAdd';
import styles from './LYDC.less';

interface IProps {
  NAMESPACE: string;
  namespaceType: string;
  incidentId: string;
  editable: any;
  Procedure: Function;
  Invoice: Function;
}
const LYDC = (props: IProps) => {
  const treatmentList =
    useSelector(
      ({ [props.NAMESPACE]: modelnamepsace }: any) =>
        modelnamepsace?.claimEntities?.incidentListMap?.[props.incidentId]?.treatmentList
    ) || [];

  return (
    <div className={styles.list}>
      {lodash.isArray(treatmentList) &&
        treatmentList.map((item) => (
          <LYDCItem
            {...props}
            key={item}
            treatmentId={item}
            Procedure={props.Procedure}
            Invoice={props.Invoice}
          />
        ))}
      <LYDCAdd {...props} treatmentList={treatmentList} />
    </div>
  );
};

export default LYDC;
