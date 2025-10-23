import React from 'react';
import lodash from 'lodash';
import { useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { NAMESPACE } from 'opus/Pages/Process/Claim/ManualAssessment/activity.config';

import Card from '../Card';
import Item from './Item';

import styles from './index.less';

export default () => {
  const { policyBenefitList } = useSelector(
    ({ [NAMESPACE]: modelnamespace }: any) => ({
      policyBenefitList: modelnamespace?.paymentModal?.datas?.policyBenefitList,
    }),
    shallowEqual
  );

  return (
    <div className={styles.list}>
      <Card title={formatMessageApi({ Label_COM_Opus: 'PolicyBenefit' })}>
        {lodash.map(policyBenefitList, (item: any) => (
          <Item key={item.id} item={item} />
        ))}
      </Card>
    </div>
  );
};
