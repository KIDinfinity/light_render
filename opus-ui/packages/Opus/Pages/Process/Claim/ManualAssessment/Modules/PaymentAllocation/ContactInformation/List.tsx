import React from 'react';
import lodash from 'lodash';
import { useSelector } from 'dva';
import { shallowEqual } from 'react-redux';

import { NAMESPACE } from 'opus/Pages/Process/Claim/ManualAssessment/activity.config';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import Card from '../Card';
import Item from './Item';

import styles from './index.less';

export default ({ payeeId }: any) => {
  const { payeeList } = useSelector(
    ({ [NAMESPACE]: modelnamespace }: any) => ({
      payeeList: modelnamespace?.paymentModal?.datas?.payeeList,
    }),
    shallowEqual
  );
  const payeeContactList = lodash.find(payeeList, { id: payeeId })?.payeeContactList || [];

  return (
    <div className={styles.list}>
      <Card title={formatMessageApi({Label_BIZ_Policy:'ContactInfo'})} actions={[]}>
        {lodash.map(payeeContactList, (item: any) => (
          <Item key={item?.id} item={item} payeeId={payeeId} />
        ))}
      </Card>
    </div>
  );
};
