import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';

export function getNotRepeatableCodes({
  repeatableServiceItemList,
  invoiceId,
  serviceItemListMap,
}: any) {
  const notRepeatableCode = lodash
    .chain(repeatableServiceItemList)
    .filter((item: any) => item.invoiceId === invoiceId)
    .map((item: any) => formUtils.queryValue(item.serviceItemCode))
    .compact()
    .uniq()
    .value();
  const existServiceItems: any = [];
  lodash.map(serviceItemListMap, (item) => {
    if (item.invoiceId === invoiceId) {
      existServiceItems.push(formUtils.queryValue(item.serviceItem));
    }
  });
  const notRepeatableCodeList: any = [];
  lodash
    .chain(notRepeatableCode)
    .filter((item: any) => {
      lodash.forEach(existServiceItems, (existItem) => {
        if (item === existItem) {
          notRepeatableCodeList.push(item);
        }
      });
    })
    .value();
  return notRepeatableCodeList;
}
export default getNotRepeatableCodes;
