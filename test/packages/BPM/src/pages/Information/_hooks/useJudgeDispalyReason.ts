import { useMemo } from 'react';
import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';

export default ({ category }) => {
  const currentActivity = useSelector(
    ({ navigatorInformationController }: any) => navigatorInformationController?.currentActivity,
    shallowEqual
  );
  return useMemo(() => {
    return lodash
      .chain(currentActivity)
      .get('activityCategoryList')
      .find((categoryItem: any) => categoryItem?.categoryCode === category)
      .get('showReadButton')
      .isEqual(1)
      .value();
  }, [category, currentActivity]);
};
