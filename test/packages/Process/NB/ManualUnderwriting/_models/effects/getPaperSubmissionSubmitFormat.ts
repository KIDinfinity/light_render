import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import requestHandleType from 'bpm/enum/requestHandleType';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { NAMESPACE } from '../../activity.config';
import { getDrowDownList } from '@/utils/dictFormatMessage';
// TODO: Discard can't find Reference
export default function* (_, { select }: any) {
  const businessData = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.businessData
  );
  const fundChartDataUrl = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.fundChartDataUrl
  );
  const roleDicts = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.roleDicts
  );

  const contactCountryCodeList = getDrowDownList('Dropdown_CFG_ContactCountryCode');

  const finalBusinessData = {
    businessData: formUtils.formatFlattenValue(formUtils.cleanValidateData(businessData)),
  };

  const policyList = lodash
    .chain(finalBusinessData)
    .get('businessData.policyList', [])
    .map((item: any) => {
      const coverageList =
        lodash
          .chain(item)
          .get('coverageList', [])
          .map((coverageItem: any) => {
            const coverageLoadingList = lodash
              .chain(coverageItem)
              .get('coverageLoadingList', [])
              .map((loadingItem: any) => {
                const reason = formatMessageApi({
                  Dropdown_POL_ReasonforLoading: formUtils.queryValue(
                    lodash.get(loadingItem, 'code')
                  ),
                });
                return {
                  ...loadingItem,
                  reason,
                };
              })
              .value();
            if (coverageItem?.isMain === 'Y') {
              return {
                ...coverageItem,
                coverageLoadingList,
                fundChartDataUrl,
              };
            }
            return {
              ...coverageItem,
              coverageLoadingList,
            };
          })
          .value() || [];
      const clientInfoList =
        lodash
          .chain(item)
          .get('clientInfoList', [])
          .map((infoItem: any) => {
            const consentsList =
              lodash
                .chain(infoItem)
                .get('consentsList', [])
                .map((consentsItem: any) => {
                  return {
                    ...consentsItem,
                    promotionsBy: lodash.isArray(consentsItem?.promotionsBy)
                      ? lodash
                          .chain(consentsItem?.promotionsBy)
                          .map((promotionsByItem) => promotionsByItem.replace(',', ''))
                          .join(',')
                          .value()
                      : consentsItem?.promotionsBy,
                  };
                })
                .value() || [];
            const roleList =
              lodash
                .chain(infoItem)
                .get('roleList')
                .map((roleListItem: any) => {
                  const roleItem = lodash.find(
                    roleDicts,
                    (role: any) => role.dictCode === roleListItem.customerRole
                  );
                  return {
                    ...roleListItem,
                    display: roleItem?.display === 'Y',
                  };
                })
                .value() || [];
            const addressList =
              lodash
                .chain(infoItem)
                .get('addressList', [])
                .filter((addressItem: any) => !!addressItem && !!addressItem?.addrType)
                .value() || [];
            const crtInfoList =
              lodash
                .chain(infoItem)
                .get('crtInfoList', [])
                .filter((crtItem: any) => {
                  if (crtItem?.type === 'S') {
                    return (
                      !!crtItem?.ctfId ||
                      !!crtItem?.reasonFlag ||
                      !!crtItem?.country ||
                      !!crtItem?.reason
                    );
                  }
                  if (crtItem?.type === 'P') {
                    return !!crtItem?.ctfType || !!crtItem?.ctfCountryCode;
                  }
                  return;
                })
                .value() || [];
            const contactInfoList =
              lodash
                .chain(infoItem)
                .get('contactInfoList', [])
                .filter(
                  (contactItem: any) =>
                    !!contactItem?.contactType ||
                    !!contactItem?.contactNo ||
                    !!contactItem?.countryCode
                )
                .map((contactItem: any) => {
                  const currentContryCode = formUtils.queryValue(
                    lodash.get(contactItem, 'countryCode')
                  );
                  if (
                    lodash.some(
                      contactCountryCodeList,
                      (dictItem) => dictItem.dictCode === currentContryCode
                    )
                  ) {
                    const countryCode = lodash
                      .chain(contactCountryCodeList)
                      .find((con: any) => lodash.get(con, 'dictCode') === currentContryCode)
                      .get('dictName')
                      .split(' - ')
                      .first()
                      .value();
                    return {
                      ...contactItem,
                      countryCode,
                    };
                  }
                  return contactItem;
                })
                .value() || [];
            return {
              ...infoItem,
              consentsList,
              crtInfoList,
              roleList,
              addressList,
              contactInfoList,
            };
          })
          .value() || [];
      const bankInfoList =
        lodash
          .chain(item)
          .get('bankInfoList', [])
          .map((bankItem: any) => {
            const bankAcctFactoryHouse = formUtils.queryValue(
              lodash.get(bankItem, 'bankAcctFactoryHouse')
            );
            if (bankAcctFactoryHouse && bankAcctFactoryHouse.indexOf('-') > -1) {
              return {
                ...bankItem,
                bankAcctFactoryHouse: lodash.chain(bankAcctFactoryHouse).split('-').last().value(),
              };
            }
            return bankItem;
          })
          .value() || [];
      const bankCardInfoList =
        lodash
          .chain(item)
          .get('bankCardInfoList', [])
          .map((bankCardItem: any) => {
            const factoringHouse = formUtils.queryValue(lodash.get(bankCardItem, 'factoringHouse'));
            if (factoringHouse && factoringHouse.indexOf('-') > -1) {
              return {
                ...bankCardItem,
                factoringHouse: lodash.chain(factoringHouse).split('-').last().value(),
              };
            }
            return bankCardItem;
          })
          .value() || [];
      return {
        ...item,
        coverageList,
        clientInfoList,
        bankInfoList,
        bankCardInfoList,
      };
    })
    .value();

  lodash.set(finalBusinessData, 'businessData.policyInfoDTO', policyList[0]);
  lodash.set(finalBusinessData, 'businessData.caseCategory', 'BP_NB_CTG001');
  lodash.set(
    finalBusinessData,
    'businessData.policyInfoDTO.manualExtendNtu',
    !!lodash.get(finalBusinessData, 'businessData.policyInfoDTO.manualExtendNtu')
  );
  if (lodash.isEmpty(finalBusinessData)) {
    return requestHandleType.break;
  }
  return finalBusinessData;
}
