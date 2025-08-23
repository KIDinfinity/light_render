import lodash from 'lodash';
import { useEffect } from 'react';
import { useDispatch } from 'dva';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';

export default ({ loadingEditAllowable, form, formName, loadingId }: any) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!loadingEditAllowable && !lodash.isNil(form.getFieldValue(formName))) {
      dispatch({
        type: `${NAMESPACE}/handleChangeAddingLoadingItem`,
        payload: {
          changedFields: { [formName]: null },
          id: loadingId,
        },
      });
    }
  }, [loadingEditAllowable]);
};
