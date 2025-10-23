import React from 'react';
import { NAMESPACE } from '../activity.config';

import { useSelector } from 'dva';
import lodash from 'lodash';
import { findBooster } from '../_models/functions/findBooster';
import Info from './Info';
import ListItem from './ListItem';
import styles from './index.less';

const TreatmentList = () => {
  const treatmentListMap = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.claimEntities.treatmentListMap
  );
  const data = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.PopUpEditPayable?.data
  );

  const serviceItemPayableListMap = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.claimEntities?.serviceItemPayableListMap
  );
  const listPolicy = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.listPolicy
  );

  const treatmentList =
    lodash.chain(treatmentListMap).values().orderBy(['treatmentNo'], ['asc']).uniq().value() || [];

  const totalPayableList = lodash.map(data?.children, (item: any) => {
    const { booster: boosterItem, hasBooster } = findBooster(
      serviceItemPayableListMap,
      item,
      listPolicy
    );
    return {
      ...item,
      boosterAmount: boosterItem?.payableAmount,
      boosterDays: boosterItem?.payableDays,
      booster: boosterItem?.booster,
      boosterId: boosterItem?.id,
      hasBooster,
    };
  });

  return (
    <div className={styles.treatmentListWrap}>
      <Info payableList={totalPayableList} />
      {treatmentList.map((item) => (
        <ListItem
          totalPayableList={totalPayableList}
          incidentId={data?.incidentId}
          treatmentItem={item}
          key={item}
        />
      ))}
    </div>
  );
};

export default TreatmentList;
