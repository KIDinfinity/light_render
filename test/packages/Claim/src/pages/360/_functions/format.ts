import { FormateEP } from '@/utils/accuracy/Tools';
import { tenant } from '@/components/Tenant';

export const formatCurrency = ({currency, value}: any) => {
  return `${tenant.getCurrencySymbol(currency)} ${FormateEP?.getThousandsFormat({
    value, precision: 2
  })}`
}
