import { formUtils } from 'basic/components/Form';
import CustomerType from '../Enum/CustomerType';

export default (customer?: any): CustomerType =>
  customer?.customerType ? formUtils.queryValue(customer.customerType) : CustomerType.Individual;
