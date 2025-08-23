import lodash from 'lodash';
import CustomerRole from 'process/NB/Enum/CustomerRole';
import { tenant } from '@/components/Tenant';

export default (currentItem: any, clientList: any) => {
  const currentRoleList = lodash
    .chain(clientList)
    .find((item: any) => item.id === currentItem.id)
    .get('roleList')
    .value();

  const haveDisplay = lodash
    .chain(currentRoleList)
    .some((item: any) => !!item.display)
    .value();

  const isAS = lodash
    .chain(currentRoleList)
    .map((role: any) => role?.customerRole)
    .isEqual([CustomerRole.AuthorisedSignatory])
    .value();

  return haveDisplay && (tenant.isMY() || !isAS);
};
