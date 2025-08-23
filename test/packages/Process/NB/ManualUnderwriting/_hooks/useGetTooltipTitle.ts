import { useMemo } from 'react';
import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';
import moment from 'moment';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { NAMESPACE } from '../activity.config';

export default ({ tagList, id }: any) => {
  const clientInfoList =
    useSelector(
      ({ [NAMESPACE]: modelnamepsace }: any) =>
        modelnamepsace.businessData?.policyList?.[0]?.clientInfoList,
      shallowEqual
    ) || [];
  const currentClientInfo = lodash.find(clientInfoList, (item: any) => item?.id === id);
  return useMemo(() => {
    return lodash.map(tagList, (item: any) => {
      let tooltipTitle;
      switch (item?.label) {
        case 'FATCA': {
          const { fatca, fatcaDate, usTn } = lodash.pick(currentClientInfo, [
            'fatca',
            'fatcaDate',
            'usTn',
          ]);
          tooltipTitle = `${
            fatca ? `FATCA:${formatMessageApi({ Dropdown_IND_FATCA: fatca })},` : ''
          }${fatcaDate ? `FATCA Date:${moment(fatcaDate).format('L')},` : ''}${
            usTn ? `US TN:${usTn}` : ''
          }`;
          return {
            ...item,
            tooltipTitle,
          };
        }
        case 'FEC': {
          tooltipTitle =
            item?.status === 'match'
              ? `${!lodash.isEmpty(item?.riskScore) ? `Score:${item?.riskScore}` : ''}${
                  !lodash.isEmpty(item?.fecRiskMsg) ? `/Message:${item.fecRiskMsg}` : ''
                }`
              : '';
          return {
            ...item,
            tooltipTitle,
          };
        }
        default: {
          tooltipTitle = lodash.get(currentClientInfo, `${item.label.toLowerCase()}`);
          return {
            ...item,
            tooltipTitle,
          };
        }
      }
    });
  }, [tagList, id]);
};
