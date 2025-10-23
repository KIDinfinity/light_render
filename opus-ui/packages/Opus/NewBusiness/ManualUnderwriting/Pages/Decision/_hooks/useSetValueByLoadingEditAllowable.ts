import lodash from 'lodash';
import { useEffect } from 'react';
import { useDispatch } from 'dva';
import { NAMESPACE } from 'opus/NewBusiness/ManualUnderwriting/activity.config';

export default ({ loadingEditAllowable, formEditable, form, formName, coverageId, id }: any) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!loadingEditAllowable && formEditable && !lodash.isNil(form.getFieldValue(formName))) {
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
