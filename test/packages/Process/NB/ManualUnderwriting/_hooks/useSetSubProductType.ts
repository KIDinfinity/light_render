import { useDispatch } from 'dva';
import { useEffect } from 'react';
import lodash from 'lodash';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';

export default ({ id, dicts, coreCode }: any) => {
  const dispatch = useDispatch();
  const target = lodash.find(dicts, { productCode: coreCode });

  useEffect(() => {
    dispatch({
      type: `${NAMESPACE}/setDecisionFieldData`,
      payload: {
        changedFields: {
          subProductType: target?.subProductType,
        },
        id,
      },
    });
  }, [id, coreCode]);
};
