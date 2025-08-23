import lodash from 'lodash';
import getDropDownFormat from '../../Utils/getDropDownFormat';
import { AtomType, TypeCode } from '../../Enum';

export default (requireAtoms: any[]) => {
  const atomsMap = lodash
    .chain(requireAtoms)
    .map((item) => ({
      ...item,
      formatName: getDropDownFormat({
        lableId: item.atomCode,
        defaultName: item.formatName || item.atomName || item.atomCode,
        type: TypeCode.AtomCode,
      }),
    }))
    .groupBy('type')
    .value();
  return {
    requiredConditions: atomsMap[AtomType.conditions] || [],
    requiredResults: atomsMap[AtomType.results] || [],
  };
};
