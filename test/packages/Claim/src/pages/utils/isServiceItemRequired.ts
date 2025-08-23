import lodash from 'lodash';
import { ServiceCode } from 'claim/pages/Enum';
import { formUtils } from 'basic/components/Form';

export const serviceItemCode = [
  ServiceCode['10.0.0'],
  ServiceCode['10.1.0'],
  ServiceCode['10.2.0'],
  ServiceCode['10.3.0'],
  ServiceCode['10.4.0'],
  ServiceCode['10.6.0'],
  ServiceCode['10.7.0'],
  ServiceCode['11.0.0'],
  ServiceCode['11.1.0'],
  ServiceCode['11.2.0'],
  ServiceCode['11.6.0'],
  ServiceCode['6.4.0'],
];
export const isServiceItemRequired = (serviceItemValue: string) => {
  return lodash.includes(serviceItemCode, serviceItemValue);
};

export const ServiceItemCodeForDefaultUnit = [
  ServiceCode['11.0.0'],
  ServiceCode['11.1.0'],
  ServiceCode['11.2.0'],
];

export const getDefaultUnit = (unit: any, serviceItem: any) => {
  if (
    !lodash.isObject(unit) &&
    lodash.includes(ServiceItemCodeForDefaultUnit, formUtils.queryValue(serviceItem))
  ) {
    return 1;
  }
  return null;
};

export default { isServiceItemRequired, serviceItemCode, ServiceItemCodeForDefaultUnit };
