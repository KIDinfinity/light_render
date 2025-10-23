import { formUtils } from 'basic/components/Form';
import CustomerType from 'opus/NewBusiness/Enum/CustomerType';

export default (customer?: any): CustomerType =>
  customer && customer?.customerType
    ? formUtils.queryValue(customer.customerType)
    : CustomerType.Individual;
