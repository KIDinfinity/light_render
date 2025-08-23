import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { formatMessageApi } from '@/utils/dictFormatMessage';

export const VLD_000684 = ({ products, coverageList, coverageId }: any) => (
  rule: any,
  value: any,
  callback: Function
) => {
  const currentProductCode = value;
  const maxNo = lodash
    .chain(products)
    .find((item: any) => item.productCode === currentProductCode)
    .get('maxNo')
    .value();
  const productName = lodash
    .chain(products)
    .find((item: any) => item.productCode === currentProductCode)
    .gte('productName')
    .value();
  const sameProduct = lodash
    .chain(coverageList)
    .filter((item: any) => item.id !== coverageId)
    .filter((item) => formUtils.queryValue(item?.coreCode) === currentProductCode)
    .value();
  if (!lodash.isNil(maxNo) && maxNo < sameProduct?.length + 1) {
    callback(
      formatMessageApi(
        {
          Label_COM_WarningMessage: 'MSG_000625',
        },
        productName,
        maxNo
      )
    );
  } else {
    callback();
  }
};
