import { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'dva';
import { NAMESPACE } from '../activity.config';
import lodash from 'lodash';

export default ({ form, isInsured, isSecondary }: { form: any, isInsured: boolean, isSecondary: boolean }) => {
  const occupationCode = form.getFieldValue(isSecondary ? 'otherOccupation' : 'occupationName');
  const hierarchyOccupation = useSelector(
    ({ dictionaryController }: any) =>
      lodash.get(
        dictionaryController,
        `hierarchyDicts.Dropdown_IND_Occupation.${occupationCode}`
      )
  ) || [];

  const hierarchyOccupationGroupDictsTH = hierarchyOccupation.filter(
    (item: any) => item?.typeCode === 'Dropdown_IND_OccupationGroup'
  );

  const dispatch = useDispatch();
  const firstMatchValue = hierarchyOccupationGroupDictsTH[0]?.dictCode;
  useEffect(() => {
    dispatch({
      type: `${NAMESPACE}/${isInsured? 'saveInsuredOccupation' : 'savePayorOccupation'}`,
      payload: {
        changedFields: {
          [isSecondary? 'otherOccupationGroup' : 'occupationGroup']: firstMatchValue
        }
      }
    })
  }, [firstMatchValue])
};
