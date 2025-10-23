import React from 'react';
import lodash from 'lodash';

import { formatMessageApi } from '@/utils/dictFormatMessage';
import Card from '../card';
import PolicyItem from './PolicyItem';

export default ({ policyExclusionList }: any) => {
  const list = lodash.groupBy(policyExclusionList, 'productCode');

  return (
    (!lodash.isEmpty(list) && (
      <Card title={formatMessageApi({ Label_BIZ_Policy: 'PolicyExclusion' })}>
        {lodash.map(list, (item, key) => (
          <PolicyItem key={key} item={item} productCode={key} />
        ))}
      </Card>
    )) ||
    null
  );
};
