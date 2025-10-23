import React from 'react';
import lodash from 'lodash';

import { tenant } from '@/components/Tenant';

import Duration from './Duration';
import Organization from './Organization';

import styles from './index.less';

const ButtonComponents = [
  { key: 'organization', component: Organization, order: 1 },
  { key: 'duration', component: Duration, order: 2 },
];

export default ({ config }: any) => {
  return (
    <div className={styles.buttonWrap}>
      {lodash
        .chain(config)
        .filter((item) => !item.region || lodash.includes(item.region, tenant.region()))
        .map((item) => {
          const temp: any = lodash.find(ButtonComponents, { key: item.key }) || {};
          if (lodash.isEmpty(temp)) return null;
          const { component: Component } = temp;
          return <Component key={item.key} callback={item.callback} code={item.code} />;
        })
        .compact()
        .sortBy('order')
        .value()}
    </div>
  );
};
