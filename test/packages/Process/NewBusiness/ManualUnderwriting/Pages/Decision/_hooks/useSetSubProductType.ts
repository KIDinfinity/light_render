import { useDispatch, useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import { useEffect, useMemo } from 'react';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';

export default ({ id, dicts }: any) => {
  const dispatch = useDispatch();
  const coverageList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.modalData?.processData?.coverageList,
    shallowEqual
  );
  const coreCode = useMemo(() => lodash.get(lodash.find(coverageList, { id }), 'coreCode'), [
    coverageList,
    id,
  ]);
  const subProductType = lodash.find(dicts, { productCode: formUtils.queryValue(coreCode) })
    ?.subProductType;

  useEffect(() => {
    if (lodash.has(coreCode, 'touched') && coreCode.touched) {
      dispatch({
        type: `${NAMESPACE}/setDecisionFieldData`,
        payload: {
          changedFields: {
            subProductType: subProductType,
          },
          id,
        },
      });
    }
  }, [id, coreCode, subProductType]);
};
