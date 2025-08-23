import React from 'react';
import { useSelector } from 'dva';
import lodash from 'lodash';
import Empty from '@/components/Empty';
import Item from './Item';
import Add from './Add';
import styles from './List.less';

export default ({ incidentId }: any) => {
  const editable = !useSelector((state: any) => state.claimEditable.taskNotEditable);

  const treatmentList = useSelector(
    (state: any) =>
      state.JPCLMOfDataCapture.claimEntities?.incidentListMap?.[incidentId].treatmentList
  );

  return (
    <div className={styles.treatmentListWrap}>
      {lodash.isArray(treatmentList) && lodash.size(treatmentList) ? (
        lodash.map(treatmentList, (item) => (
          <Item
            key={item}
            total={treatmentList.length}
            incidentId={incidentId}
            treatmentId={item}
          />
        ))
      ) : (
        <Empty />
      )}
      {editable && lodash.size(treatmentList) && <Add incidentId={incidentId} />}
    </div>
  );
};
