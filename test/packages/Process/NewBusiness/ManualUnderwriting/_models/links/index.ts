import { has, size } from 'lodash';

import { tenant, Region } from '@/components/Tenant';

import nationality_link from './nationality_link';

const handleLink = ({
  changedFields,
  name,
  handleVn = () => {},
  handleMy = () => {},
  handleTh = () => {},
  handleId = () => {},
  handlePh = () => {},
  notMatch = () => {},
}) => {
  if (has(changedFields, name) && size(changedFields) === 1) {
    tenant.region({
      [Region.VN]: handleVn,
      [Region.MY]: handleMy,
      [Region.TH]: handleTh,
      [Region.ID]: handleId,
      [Region.PH]: handlePh,
      notMatch: notMatch,
    });
  }
};

export default handleLink;

export { nationality_link };
