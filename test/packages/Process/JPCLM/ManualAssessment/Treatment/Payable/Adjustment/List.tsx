import React from 'react';
import lodash from 'lodash';
import { useSelector } from 'dva';
import { FormLayoutContext } from 'basic/components/Form';
import ShrinkItem from './shrinkItem';
import Item from './Item';
import { getTotalOpTreatmentPayableList } from '../../_hooks';
import AddField from './AddField';

import styles from './index.less';

const List = ({
  incidentId,
  treatmentId,
  treatmentPayableItemId,
  treatmentPayableItem,
  expand,
}: any) => {
  const opTreatmentPayableListMap =
    useSelector(
      ({ JPCLMOfClaimAssessment }: any) =>
        JPCLMOfClaimAssessment?.claimEntities?.opTreatmentPayableListMap
    ) || {};

  const totalList = getTotalOpTreatmentPayableList({
    treatmentPayableItem,
    opTreatmentPayableListMap,
  });

  return (
    <div className={styles.List}>
      <FormLayoutContext.ExpandProvider>
        <FormLayoutContext.ExpandIcon className={styles.expandIcon} />
        {lodash.map(totalList || [], (totalItem: any) => {
          const props = {
            key: totalItem?.id,
            totalItem: totalItem,
            treatmentPayableItem: treatmentPayableItem,
            incidentId: incidentId,
            treatmentId: treatmentId,
            treatmentPayableId: treatmentPayableItemId,
          };
          return <>{!expand ? <ShrinkItem {...props} /> : <Item {...props} />}</>;
        })}
        <AddField
          incidentId={incidentId}
          treatmentId={treatmentId}
          treatmentPayableId={treatmentPayableItemId}
        />
      </FormLayoutContext.ExpandProvider>
    </div>
  );
};

export default List;
