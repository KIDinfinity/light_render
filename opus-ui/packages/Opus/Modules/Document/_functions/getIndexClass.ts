import lodash from 'lodash';
import type { DropdownConfigureModel } from '../_dto/model';

const getIndexClass = (
  dropdownConfigures?: DropdownConfigureModel[],
  fieldName?: string
): DropdownConfigureModel[] => {
  if (!lodash.isArray(dropdownConfigures)) return [];
  return lodash
    .chain(dropdownConfigures)
    .filter((dropdown: DropdownConfigureModel) => !!dropdown.indexClass)
    .uniqBy('indexClass')
    .orderBy(fieldName)
    .value();
};

export default getIndexClass;
