import React from 'react';
import { useSelector } from 'dva';
import lodash from 'lodash';
import { NAMESPACE } from '../activity.config';
import Info from './Info';
import ListItem from './ListItem';
import styles from './index.less';

const TreatmentList = () => {
  const { incidentId, children } = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.PopUpEditPayable?.data
  );
  const treatmentList =
    lodash
      .chain(children)
      .map((el: any) => el.treatmentId)
      .uniq()
      .value() || [];

  return (
    <div className={styles.treatmentListWrap}>
      <Info />
      {lodash.isArray(treatmentList) &&
        treatmentList.map((item, index: number) => (
          <ListItem incidentId={incidentId} treatmentId={item} index={index} key={item} />
        ))}
    </div>
  );
};

export default TreatmentList;
