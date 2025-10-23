import { useEffect } from 'react';
import { useSelector, useDispatch } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';
import { NAMESPACE } from '../activity.config';

type Iprops = {
  form: any,
  occupationCodeField: string,
  subTypeCode: string,
  currentField: string,
  reducer: string,
}
export default ({ form, occupationCodeField, subTypeCode, currentField, reducer }: Iprops) => {
  const occupationCode = form.getFieldValue(occupationCodeField)
  const hierarchyOccupation = useSelector(
    ({ dictionaryController }: any) =>
      lodash.get(
        dictionaryController,
        `hierarchyDicts.Dropdown_IND_Occupation.${occupationCode}`,
        []
      ),
    shallowEqual
  );

  const dicts = hierarchyOccupation.filter(
    (item: any) => item?.typeCode === subTypeCode
  );
  const currentValue = form.getFieldValue(currentField);
  const dispatch = useDispatch();
  useEffect(() => {
    const isSingleOption = lodash.chain(dicts).size().isEqual(1).value();
    if (isSingleOption && !currentValue) {
      const value = lodash.chain(dicts).first().get('dictCode').value();
      dispatch({
        type: `${NAMESPACE}/saveFormData`,
        target: reducer,
        payload: {
          changedFields: {
            [currentField]: value,
          },
        },
      });
    }
  }, [dicts, currentValue]);

  return dicts;
};
