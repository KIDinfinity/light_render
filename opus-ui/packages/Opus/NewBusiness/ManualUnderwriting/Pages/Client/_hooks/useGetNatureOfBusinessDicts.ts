import { useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';

export default ({ parentField, form }: any) => {
  const occupationCode = form.getFieldValue(parentField);
  const hierarchyOccupation = useSelector(
    ({ dictionaryController }: any) =>
      lodash.get(
        dictionaryController,
        `hierarchyDicts.Dropdown_IND_Occupation.${occupationCode}`,
        []
      ),
    shallowEqual
  );

  const hierarchyNatureOfBusinessDicts = hierarchyOccupation.filter(
    (item: any) => item?.typeCode === 'Dropdown_IND_NatureofBusiness'
  );

  return hierarchyNatureOfBusinessDicts;
};
