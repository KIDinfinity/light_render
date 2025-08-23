import lodash from 'lodash';
import { useEffect } from 'react';
import { useDispatch } from 'dva';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';

export default ({ loadingEditAllowable, form, formName, coverageId, id }: any) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!loadingEditAllowable && !lodash.isNil(form.getFieldValue(formName))) {
      dispatch({
        type: `${NAMESPACE}/saveEntry`,
        target: 'saveLoading',
        payload: {
          changedFields: { [formName]: null },
          coverageId,
          id,
        },
      });
    }
  }, [loadingEditAllowable]);
};
