import { tenant } from '@/components/Tenant';

export default (envList: string[]) => {
  const result = envList?.length ? envList.includes(tenant.activeProfile()) : false;
  return result;
};
