import { useMemo, useEffect, useState } from 'react';
import lodash from 'lodash';
import navigatorLabelService from '@/services/navigatorLabelService';

interface Pagination {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}
interface InquiryData {
  list: any[];
  pagination: Pagination;
}

export default (originData: InquiryData) => {
  const [attachData, setAttachData] = useState([]);
  const businessNoList = useMemo(() => {
    return lodash
      .chain(originData)
      .get('list', [])
      .map((item: any) => item?.procInstId)
      .uniq()
      .value();
  }, [originData]);
  useEffect(() => {
    (async () => {
      if (!lodash.isEmpty(businessNoList)) {
        const res = await navigatorLabelService.getLabelByBusinessNo(businessNoList);
        if (res?.success) {
          setAttachData(res?.resultData);
        }
      }
    })();
  }, [businessNoList]);

  return useMemo(() => {
    const list = lodash
      .chain(originData)
      .get('list', [])
      .map((item: any) => {
        const extraMap = new Map();
        lodash
          .chain(attachData)
          .find((attchDataItem: any) => {
            return attchDataItem?.applicationNo === item?.businessNo;
          })
          .pick(['saleSubChannel', 'gsIndicator'])
          .entries()
          .forEach((dataItem: any) => {
            const [key, value] = dataItem;
            const trimValue = lodash.trim(value);
            if (!!trimValue) {
              extraMap.set(key, trimValue);
            }
          })
          .value();
        return {
          ...item,
          ...Object.fromEntries(extraMap),
        };
      })
      .value();
    return {
      ...originData,
      list,
    };
  }, [attachData, originData]);
};
