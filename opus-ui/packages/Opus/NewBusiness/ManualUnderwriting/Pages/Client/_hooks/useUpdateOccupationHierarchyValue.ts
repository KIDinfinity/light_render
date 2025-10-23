import lodash from 'lodash';
import { useEffect } from 'react';
import { useDispatch } from 'dva';
import { NAMESPACE } from 'opus/NewBusiness/ManualUnderwriting/activity.config';

interface IParams {
  field: string;
  value: string;
  dicts: any[];
  id: string;
  readOnly?: boolean;
}

export default ({ id, field, value, dicts, readOnly }: IParams) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const isSingleOption = lodash.chain(dicts).size().isEqual(1).value();
    if (isSingleOption && !value && !readOnly) {
      const newValue = dicts?.[0]?.dictCode;
      dispatch({
        type: `${NAMESPACE}/saveFormData`,
        target: 'saveBackgroundInfo',
        payload: {
          id,
          changedFields: {
            [field]: newValue,
          },
        },
      });
    }
  }, [id, field, dicts, value, readOnly]);
};
