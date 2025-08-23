import { useMemo } from 'react';
import { useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';

import AtomGroupCode from 'enum/AtomGroupCode';

export default (item?: { categoryCode: string }) => {
  const informationConfigGroup = useSelector(
    (state: any) => state?.atomConfig?.groups?.[AtomGroupCode.InformationAdd],
    shallowEqual
  );
  const category = item?.categoryCode ?? null;

  return useMemo(() => {
    if (!category || lodash.size(informationConfigGroup) === 0) {
      return { maxSize: 20000 };
    }

    const maxLength = lodash
      .chain(informationConfigGroup)
      .find((configAtom) => {
        return configAtom?.atomCode === `information_add_config_${category}`;
      })
      .get('maxLength')
      .value();
    return maxLength ? { maxSize: maxLength } : { maxSize: 20000 };
  }, [informationConfigGroup, category]);
};
