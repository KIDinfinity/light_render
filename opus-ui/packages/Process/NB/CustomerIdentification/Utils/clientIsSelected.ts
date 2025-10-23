import lodash from 'lodash';
import { Selection } from '../Enum';

export default (item: any) => {
  const suspectSelect = lodash.every(
    item.identificationList,
    (subItem: any) => subItem.selection !== Selection.Y
  );
  return suspectSelect && item.newClientFlag !== Selection.Y;
};
