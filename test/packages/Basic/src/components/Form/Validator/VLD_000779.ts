import { formatMessageApi } from '@/utils/dictFormatMessage';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import CustomerRole from 'process/NB/Enum/CustomerRole';
import CustomerTypeEnum from 'process/NB/ManualUnderwriting/Enum/CustomerTypeEnum';

import { tenant, Region } from '@/components/Tenant';

export const VLD_000779 = ({ clientInfoList, id, adultAge }: any) => (
  rule: any,
  value: any,
  callback: Function
) => {
  const regionCode = tenant.region();
  const haveEntityPO = (() => {
    return lodash
      .chain(clientInfoList)
      .find((item: any) => {
        const isCompany =
          formUtils.queryValue(lodash.get(item, 'customerType')) === CustomerTypeEnum?.Company;
        const isPolicyOwner = lodash
          .chain(item)
          .get('customerRole', [])
          .map((role: any) => role)
          .includes(CustomerRole.PolicyOwner)
          .value();
        return isPolicyOwner && isCompany;
      })
      .value();
  })();

  const CoBorrowerId = lodash
    .chain(clientInfoList)
    .find((item: any) =>
      lodash
        .chain(item)
        .get('customerRole', [])
        .map((role: any) => role)
        .includes(CustomerRole.AuthorisedSignatory)
        .value()
    )
    .get('id')
    .value();

  const primaryInsuredId = lodash
    .chain(clientInfoList)
    .find((item: any) => {
      return lodash
        .chain(item)
        .get('customerRole', [])
        .find((role: any) => role === CustomerRole.Insured && role?.roleSeqNo == '01')
        .value();
    })
    .get('id')
    .value();

  if (regionCode === Region.MY && !lodash.isEmpty(haveEntityPO)) {
    if (id === CoBorrowerId || id === primaryInsuredId) {
      const customerAge = lodash
        .chain(clientInfoList)
        .find((clientInfo) => clientInfo.id === id)
        .get('customerAge')
        .value();
      if (customerAge < adultAge) {
        callback(formatMessageApi({ Label_COM_WarningMessage: 'MSG_000769' }));
      }
    }
  }
  callback();
};
