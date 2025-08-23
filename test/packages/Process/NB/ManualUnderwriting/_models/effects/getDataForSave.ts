import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { getDrowDownList } from '@/utils/dictFormatMessage';
import { NAMESPACE } from '../../activity.config';

export default function* (_, { select }: any) {
  const businessData = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.businessData
  );

  const chequeInfoList = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.chequeInfoList
  );

  const contactCountryCodeList = getDrowDownList('Dropdown_CFG_ContactCountryCode');

  const finalBusinessData: any = formUtils.formatFlattenValue(
    formUtils.cleanValidateData(businessData)
  );
  if (lodash.isEmpty(finalBusinessData)) {
    return false;
  }

  const policyList = lodash
    .chain(finalBusinessData)
    .get('policyList', [])
    .map((item: any) => {
      const coverageList = lodash
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
          return {
            ...coverageItem,
            coverageLoadingList,
          };
        })
        .value();
      const clientInfoList = lodash
        .chain(item)
        .get('clientInfoList', [])
        .map((infoItem: any) => {
          const contactInfoList = lodash
            .chain(infoItem)
            .get('contactInfoList', [])
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
            .filter((contactItem: any, contactIndex: number) => {
              // TODO 防止保存了一个空的联系人信息以及auditlog
              const size = lodash.size(infoItem.contactInfoList);
              if (size === contactIndex + 1 && lodash.isEmpty(contactItem.contactType)) {
                return false;
              }
              return true;
            })
            .value();
          const crtInfoList = lodash.chain(infoItem?.crtInfoList).filter((crtItem, crtIndex) => {
              // TODO 防止保存了一个空的item以及auditlog
              const size = lodash.size(infoItem.crtInfoList);
              if (size === crtIndex + 1 && lodash.isEmpty(crtItem.ctfCountryCode)) {
                return false;
              }
              return true;
          }
          ).value();
          const addressList = lodash.chain(infoItem?.addressList).filter((addressItem, addressIndex) => {
              // TODO 防止保存了一个空的item以及auditlog
              const size = lodash.size(infoItem.addressList);
              if (size === addressIndex + 1 && lodash.isEmpty(addressItem.addrType)) {
                return false;
              }
              return true;
          }
          ).value();
          const consentsList = lodash.chain(infoItem?.consentsList).filter((consentItem, consentIndex) => {
              // TODO 防止保存了一个空的item以及auditlog
              const size = lodash.size(infoItem.consentsList);
              if (size === consentIndex + 1 && lodash.values(consentItem).every(contentItemValue => !contentItemValue)) {
                return false;
              }
              return true;
          }).value()
          return {
            ...infoItem,
            contactInfoList,
            crtInfoList,
            addressList,
            consentsList
          };
        })
        .value();
      const bankInfoList = lodash
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
        .value();
      const bankCardInfoList = lodash
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
        .value();
      const charityFields = ['charityOrganizationCode', 'donationPercentage'];
      const charityOrganizationList = lodash
        .chain(item)
        .get('charityOrganizationList', [])
        .filter((charityItem: any) =>
          lodash.some(charityFields, (field: string) => {
            return !!charityItem[field];
          })
        )
        .value();
      const policyItem = {
        ...item,
        coverageList,
        clientInfoList,
        bankInfoList,
        bankCardInfoList,
        charityOrganizationList
      };
      if (lodash.isArray(chequeInfoList) && !lodash.isEmpty(chequeInfoList)) {
        return {
          ...policyItem,
          chequeInfoList,
        };
      }
      return policyItem;
    })
    .value();
  lodash.set(finalBusinessData, 'policyList', policyList);
  lodash.set(
    finalBusinessData,
    'policyList[0].manualExtendNtu',
    !!lodash.get(finalBusinessData, 'policyList[0].manualExtendNtu')
  );
  return finalBusinessData;
}
