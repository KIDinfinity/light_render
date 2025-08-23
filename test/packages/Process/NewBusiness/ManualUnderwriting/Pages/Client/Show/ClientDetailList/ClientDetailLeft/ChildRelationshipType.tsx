import React, { useMemo } from 'react';
import lodash from 'lodash';
import { useSelector } from 'dva';

import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import {useFamilyGroupIndInclude} from 'process/NewBusiness/ManualUnderwriting/Pages/Payment/_hooks'

import styles from './index.less';


export default ({ clientId, config }: any) => {
  const field = 'childRelationshipType';
  const configItem = lodash.find(config, (item: any) => item?.field === field);
  if (!configItem) {
    return null;
  }
  const visibleConditions = useFamilyGroupIndInclude({groupInd: ['P']})
  const visible = useMemo(() => {
    return lodash.get(configItem, 'field-props.visible','') !== 'N' && visibleConditions;
  }
  , [configItem,visibleConditions]);
  const value = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.entities?.clientMap?.[clientId]?.personalInfo?.[field]
  );
  const label = lodash.get(configItem, 'field-props.label');

  return (
    visible?(<div className={styles.relationship}>
     <div className={styles.relationshipItem}>
      <span className={styles.label}>
        {formatMessageApi({ [label?.dictTypeCode]: label?.dictCode })}
      </span>
      <span className={styles.value}>
        {formatMessageApi({
          [configItem?.['field-props']?.['x-dict']?.dictTypeCode]: value,
        })}
      </span>
    </div>
    </div>):null
  );
};
