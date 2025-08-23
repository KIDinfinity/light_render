import React from 'react';
import lodash from 'lodash';
import { useSelector } from 'dva';

import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';
import { formatMessageApi } from '@/utils/dictFormatMessage';

import styles from './index.less';

const Item = ({ clientId, field, config }: any) => {
  const configItem = lodash.find(config, (item: any) => item?.field === field);
  const value = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.entities?.clientMap?.[clientId]?.personalInfo?.[field]
  );
  const label = lodash.get(configItem, 'field-props.label');
  if (!configItem) {
    return null;
  }
  return (
    <div className={styles.relationshipItem}>
      <span className={styles.label}>
        {formatMessageApi({ [label?.dictTypeCode]: label?.dictCode })}
      </span>
      <span className={styles.value}>
        {formatMessageApi({
          [configItem?.['field-props']['x-dict']?.dictTypeCode ||
          'Dropdown_IND_RelationshipwithPolicyOwner']: value,
        })}
      </span>
    </div>
  );
};

export default ({ clientId, config }: any) => {
  return (
    <div className={styles.relationship}>
      <Item clientId={clientId} field="relationOfInsured" config={config} />
      <Item clientId={clientId} field="relationOfProposer" config={config} />
      <Item clientId={clientId} field="relationshipWithBeneficiary" config={config} />
    </div>
  );
};
