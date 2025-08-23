import lodash from 'lodash';
import { tenant, Region } from '@/components/Tenant';
import { formUtils } from 'basic/components/Form';
import requestHandleType from 'bpm/enum/requestHandleType';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { NAMESPACE } from '../../activity.config';
import dropEmptyAddress from 'process/NB/ManualUnderwriting/utils/dropEmptyAddress';
import dropEmptyObj from 'process/NB/ManualUnderwriting/utils/dropEmptyObj';
import dropEmptyData from 'process/NB/ManualUnderwriting/utils/dropEmptyData';
import CustomerRole from 'basic/enum/CustomerRole';
import ProductType from 'process/NB/ManualUnderwriting/Enum/ProductType';
import isGBSN from 'basic/components/CaseContainer/utils/isGBSN';
import updateAgentSplitPercent from 'process/NB/ManualUnderwriting/utils/updateAgentSplitPercent';
import { getDrowDownList } from '@/utils/dictFormatMessage';
import useGetIsCustomerIndividual from 'process/NB/hooks/useGetIsCustomerIndividual';

export default function* (_, { select }: any) {
  const businessData = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.businessData
  );

  const chequeInfoList = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.chequeInfoList
  );

  let fundChartDataUrl = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.fundChartDataUrl
  );
  const roleDicts = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.roleDicts
  );

  const contactCountryCodeList = getDrowDownList('Dropdown_CFG_ContactCountryCode');

  if (businessData.taskId) {
    delete businessData.taskId;
  }
  if (businessData.taskId) {
    delete businessData.activityKey;
  }

  const finalBusinessData = {
    businessData: formUtils.formatFlattenValue(formUtils.cleanValidateData(businessData)),
  };

  let hasAuthorisedSignatory = false; // 初始值
  if (lodash.isArray(roleDicts)) {
    for (let i = 0; i < roleDicts?.length; i++) {
      if (
        roleDicts[i]?.dictCode === CustomerRole.AuthorisedSignatory &&
        roleDicts[i]?.display === 'Y'
      ) {
        hasAuthorisedSignatory = true;
        break;
      }
    }
  }
  function checkIsJudgeAuthorisedSignatoryDisplayExist(policyListItem) {
    const isJudgeAuthorisedSignatoryDisplayExist = lodash
      .chain(policyListItem)
      .get('clientInfoList')
      .some((item: any) => {
        const isCustomerIndividual: boolean = useGetIsCustomerIndividual(item);
        // 判断roleList里是否有PolicyOwner
        const isOwner: boolean =
          lodash
            .chain(item)
            .get('roleList')
            .findIndex(
              (roleItem: any) =>
                roleItem.customerRole === CustomerRole.PolicyOwner && !roleItem.deleted
            )
            .value() >= 0;
        return hasAuthorisedSignatory && !isCustomerIndividual && isOwner;
      })
      .value();
    return isJudgeAuthorisedSignatoryDisplayExist;
  }

  const policyList = lodash
    .chain(finalBusinessData)
    .get('businessData.policyList', [])
    .map((item: any) => {
      const isJudgeAuthorisedSignatoryDisplay = checkIsJudgeAuthorisedSignatoryDisplayExist(item);
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
            const waiveProductList = lodash
              .chain(coverageItem)
              .get('waiveProductList')
              .map((waive: any) => {
                if (lodash.isString(waive)) {
                  return {
                    waiveProduct: waive,
                    productCode: coverageItem.productCode,
                  };
                }
                return waive;
              })
              .value();
            if (coverageItem?.isMain === 'Y') {
              const isGBSNprocess = isGBSN({
                caseCategory: businessData.caseCategory,
              });
              const isILPproduct = coverageItem.productType === ProductType.ILP;
              if (isGBSNprocess && isILPproduct) {
                fundChartDataUrl = '';
              }
              return {
                ...coverageItem,
                coverageLoadingList,
                fundChartDataUrl,
                waiveProductList,
              };
            }
            return {
              ...coverageItem,
              coverageLoadingList,
              waiveProductList,
            };
          })
          .value() || [];
      const clientInfoList =
        lodash
          .chain(item)
          .get('clientInfoList', [])
          .filter((clientItem: any) => {
            const rolesInEffect = clientItem?.roleList?.filter((roleData) => !roleData.deleted);
            return (
              isJudgeAuthorisedSignatoryDisplay ||
              !(rolesInEffect?.length === 1 && rolesInEffect?.[0]?.customerRole === 'CUS011')
            );
          })
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
            const addressList = (() => {
              const list = tenant.region({
                notMatch: dropEmptyAddress({
                  addressList: lodash.get(infoItem, 'addressList'),
                }),
                [Region.VN]: lodash.get(infoItem, 'addressList'),
                [Region.KH]: lodash.get(infoItem, 'addressList'),
              });
              return lodash.filter(
                list,
                (listItem: any) =>
                  !dropEmptyData({
                    objItem: listItem,
                    loseFileds: ['id', 'communicationLane', 'addrType'],
                  })
              );
            })();
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
                      !!crtItem?.reason ||
                      !!crtItem?.ctfType
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
                .filter(
                  (contactItem: any) =>
                    !dropEmptyData({ objItem: contactItem, loseFileds: ['id', 'contactSeqNum'] })
                )
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
          .filter((bankItem) => {
            let isEmpty = true;
            lodash
              .chain(bankItem)
              .entries()
              .forEach((valueItem: any) => {
                const [key, value] = valueItem;
                if (!!value && key !== 'type') {
                  isEmpty = false;
                }
              })
              .value();
            return !isEmpty;
          })
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
          .filter((bankCardItem: any) => dropEmptyObj(bankCardItem))
          .value() || [];
      const backDate = (() => {
        if (lodash.get(item, 'isBack') === 'Y') {
          return lodash.get(item, 'effectiveDate');
        } else {
          return lodash.get(item, 'backDate');
        }
      })();
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
        backDate,
        charityOrganizationList,
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
  const agentList = updateAgentSplitPercent(
    lodash.get(finalBusinessData, 'businessData.agentList', [])
  );
  lodash.set(finalBusinessData, 'businessData.policyList', policyList);
  lodash.set(finalBusinessData, 'businessData.agentList', agentList);
  lodash.set(
    finalBusinessData,
    'businessData.policyList[0].manualExtendNtu',
    !!lodash.get(finalBusinessData, 'businessData.policyList[0].manualExtendNtu')
  );
  if (lodash.isEmpty(finalBusinessData)) {
    return requestHandleType.break;
  }
  return finalBusinessData;
}
