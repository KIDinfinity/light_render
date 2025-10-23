import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { ServiceCode } from 'claim/pages/Enum';

export function getCurrentServiceItemNo({
  treatmentId,
  serviceItemListMap,
  invoiceListMap,
  procedureLength,
}: any) {
  const serviceItemList = lodash
    .chain(invoiceListMap)
    .map((item: any) => {
      if (item.treatmentId === treatmentId) {
        const serviceItemIdList = item?.serviceItemList;
        return lodash
          .chain(serviceItemIdList)
          .map((serviceId: any) => formUtils.queryValue(serviceItemListMap[serviceId]))
          .value();
      }
    })
    .flatten()
    .value();
  const isEqual =
    lodash
      .chain(serviceItemList)
      .filter(
        (item: any) =>
          lodash.includes(
            [ServiceCode.code, ServiceCode.code2],
            formUtils.queryValue(item?.serviceItem)
          ) && item?.isAdjustment !== 'Y'
      )
      .size()
      .value() === procedureLength;
  return lodash.size(serviceItemList) === 0 || isEqual;
}
export default getCurrentServiceItemNo;
