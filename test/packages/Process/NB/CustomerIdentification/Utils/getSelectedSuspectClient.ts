import lodash from 'lodash';
import { Selection } from '../Enum';

export default (item: any) => {
  const selectedSuspectClient = lodash.some(
    item.identificationList,
    (subItem: any) => subItem.selection === Selection.Y
  );
  return selectedSuspectClient;
};
