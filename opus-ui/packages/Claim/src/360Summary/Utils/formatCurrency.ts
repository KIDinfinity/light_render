import { FormateEP } from '@/utils/accuracy/Tools';
import { tenant } from '@/components/Tenant';

export default ({ currency, value }: any) => {
  return `${tenant.getCurrencySymbol(currency)} ${FormateEP?.getThousandsFormat({
    value,
  })}`;
};
