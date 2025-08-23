import lodash from 'lodash';
import formUtils from 'basic/components/Form/formUtils';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import CustomerRole from 'basic/enum/CustomerRole';

export const VLD_000680 = ({ products, clientInfoList, clientId }: any) => (
  rule: any,
  value: any,
  callback: Function
) => {
  const currentProductCode = value;
  const productName = lodash
    .chain(products)
    .find((item: any) => item.productCode === currentProductCode)
    .gte('productName')
    .value();
  const targetClientRoles = lodash
    .chain(clientInfoList)
    .find((item: any) => item.id === clientId)
    .get('customerRole', [])
    .map((item: any) => formUtils.queryValue(item))
    .value();
  const needValidate = lodash
    .chain(products)
    .find((item: any) => item.productCode === currentProductCode)
    .get('lifeCode')
    .isEqual('PO')
    .value();
  const insuredNotPolicyOwner = !lodash.includes(targetClientRoles, CustomerRole.PolicyOwner);
  if (clientId && needValidate && insuredNotPolicyOwner) {
    callback(
      formatMessageApi(
        {
          Label_COM_WarningMessage: 'MSG_000619',
        },
        productName
      )
    );
  } else {
    callback();
  }
};
