import { FormateEP } from '@/utils/accuracy/Tools';
import { tenant } from '@/components/Tenant';
import { getDefaultAmount } from '@/utils/accuracy';
import lodash from 'lodash';

export const formatCurrency = ({currency, value}: any) => {
  if(lodash.isNil(value))
    return value;
  return `${tenant.getCurrencySymbol(currency)} ${FormateEP?.getThousandsFormat({
    value: getDefaultAmount(value, 'c360.baseAmount'), precision: 2
  })}`
}
