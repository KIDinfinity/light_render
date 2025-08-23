import { formUtils } from 'basic/components/Form';
import CustomerType from '../Enum/CustomerType';

export default (customer?: any): boolean =>
  !customer || formUtils.queryValue(customer.customerType) === CustomerType.Individual;
