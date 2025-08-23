import lodash from 'lodash';
import formUtils from 'basic/components/Form/formUtils';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import CustomerRole from 'basic/enum/CustomerRole';

export const VLD_000681 = ({ products, clientInfoList, clientId }: any) => (
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
    .get('wpPbCode')
    .isEqual('PB')
    .value();
  const insuredNotPolicyOwner = !lodash.includes(targetClientRoles, CustomerRole.PolicyOwner);
  if (needValidate && insuredNotPolicyOwner) {
    callback(
      formatMessageApi(
        {
          Label_COM_WarningMessage: 'MSG_000621',
        },
        productName
      )
    );
  } else {
    callback();
  }
};
