import React, { useState } from 'react';
import { NAMESPACE } from 'opus/Pages/Process/Claim/ManualAssessment/activity.config';
import { FormLayoutContext } from 'basic/components/Form';
import { useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';
import ListItem from './ListItem';
import styles from './TreatmentList.less';
import Add from './Add';
import Empty from '@/components/Empty';

const TreatmentList = ({ incidentId }: any) => {
  const { treatmentList, havePayable } = useSelector(({ [NAMESPACE]: modelnamespace }: any) => {
    const treatmentIdList =
      modelnamespace.claimEntities?.incidentListMap?.[incidentId]?.treatmentList || [];
    return {
      treatmentList: treatmentIdList,
      havePayable: lodash.some(modelnamespace.claimEntities?.treatmentPayableListMap, (item) =>
        treatmentIdList.includes(item.treatmentId)
      ),
    };
  }, shallowEqual);

  const [overrideExpand, setOverrideExpand] = useState(null);
  const editable = !useSelector((state: any) => state.claimEditable.taskNotEditable);
  return lodash.isArray(treatmentList) && lodash.size(treatmentList) ? (
    <div className={styles.treatmentListWrap}>
      <FormLayoutContext.ExpandProvider
        overrideExpand={overrideExpand}
        setOverrideExpand={setOverrideExpand}
        hasParentExpand={false}
      >
        {lodash.isArray(treatmentList) &&
          treatmentList.map((item, index) => (
            <ListItem
              incidentId={incidentId}
              treatmentId={item}
              key={item}
              index={index}
              havePayable={havePayable}
            />
          ))}
      </FormLayoutContext.ExpandProvider>
    </div>
  ) : editable ? (
    <Add incidentId={incidentId} />
  ) : (
    <Empty />
  );
};

export default TreatmentList;
