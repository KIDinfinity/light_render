import { useMemo } from 'react';
import lodash from 'lodash';
import getVisbleByVisibleCondition from '../Utils/getVisbleByVisibleCondition';

export default ({ columnList, data }: any) => {
  return useMemo(() => {
    return lodash.map(columnList, (column: any) => {
      if (column?.visible === 'C') {
        let visible;
        const visibleCondition = lodash.get(column, 'visibleCondition');
        if (lodash.isEmpty(visibleCondition)) {
          visible = 'Y';
        } else {
          visible = getVisbleByVisibleCondition({ visibleCondition, data });
        }
        return { ...column, visible };
      } else {
        return column;
      }
    });
  }, [columnList, data]);
};
