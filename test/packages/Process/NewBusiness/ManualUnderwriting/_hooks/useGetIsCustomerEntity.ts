import { formUtils } from 'basic/components/Form';
import CustomerType from 'process/NewBusiness/Enum/CustomerType';

export default (customer?: any): boolean =>
  !customer || formUtils.queryValue(customer.customerType) === CustomerType.Entity;
