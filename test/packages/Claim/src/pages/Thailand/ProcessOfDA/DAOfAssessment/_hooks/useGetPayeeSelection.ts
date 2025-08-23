import { useMemo } from 'react';
import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';

export default () => {
  const payeeListMap = useSelector(
    (state: any) => state?.daOfClaimAssessmentController?.claimEntities?.payeeListMap,
    shallowEqual
  );

  return useMemo(() => {
    return lodash
      .chain(payeeListMap)
      .values()
      .find((payeeItem: any) => payeeItem.select === 1)
      .get('id')
      .value();
  }, [payeeListMap]);
};
