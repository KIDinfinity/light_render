import lodash from 'lodash';
import HKDoop from '../HKDoop';
import { formUtils } from 'basic/components/Form';

const getBenefitItemCode = ({ draftState, Ids = [], dex = 0, benefitCategory }) => {
  const mapKey = HKDoop?.[benefitCategory]?.[dex]?.mapKey || HKDoop.default?.[dex]?.mapKey;
  const listKey = HKDoop?.[benefitCategory]?.[dex]?.listKey;

  if (!listKey) {
    return Ids.map((id) => draftState.claimEntities?.[mapKey]?.[id]?.benefitItemCode) || [];
  }

  const children = lodash
    .chain(Ids)
    .compact()
    .map((id) => draftState.claimEntities?.[mapKey]?.[id]?.[listKey] || [])
    .flatten()
    .value();

  if (lodash.size(children) > 0) {
    return getBenefitItemCode({ draftState, Ids: children, dex: dex + 1, benefitCategory });
  } else {
    return [];
  }
};

export default (draftState, listPolicyItem, { isOverride, isRemove, isAdd } = {}) => {
  const { policyNo, ncdFlag } = listPolicyItem || {};
  if (!draftState.claimProcessData?.claimPolicyPayableList) {
    draftState.claimProcessData.claimPolicyPayableList = [];
  }
  const claimPolicyPayableList = draftState.claimProcessData.claimPolicyPayableList;
  const policyItem = policyNo && claimPolicyPayableList.find((item) => item.policyNo === policyNo);

  if (!policyItem && !isRemove && policyNo) {
    claimPolicyPayableList.push({
      claimNo: draftState.claimProcessData?.claimNo,
      ncdFlag,
      policyNo,
    });
  } else if (isOverride || (!!policyItem && !!isAdd)) {
    // 新增payable,后端已经理算出来一条数据
    if (policyItem) policyItem.ncdFlag = ncdFlag;
  } else if (!!isRemove) {
    draftState.claimProcessData.claimPolicyPayableList =
      draftState.claimProcessData.claimPolicyPayableList.filter(
        (item: any) => item.policyNo !== policyNo
      );
  } else if (!isAdd) {
    const claimPayableList = draftState.claimProcessData.claimPayableList.map(
      (id) => draftState.claimEntities.claimPayableListMap[id]
    );
    const nextClaimPolicyPayableList = claimPolicyPayableList.filter((item) =>
      claimPayableList.some((claimPayable) => claimPayable.policyNo === item.policyNo)
    );
    if (nextClaimPolicyPayableList.length !== claimPolicyPayableList.length) {
      draftState.claimProcessData.claimPolicyPayableList = nextClaimPolicyPayableList;
    }
    const matchedPayableList =
      policyNo &&
      claimPayableList.filter((claimPayable: any) => claimPayable.policyNo === policyNo);

    if (policyItem && matchedPayableList?.length) {
      const benefitList = matchedPayableList.flatMap((claimPayable) => {
        const filterObj = lodash.pick(claimPayable, [
          'benefitCategory',
          'benefitTypeCode',
          'policyNo',
        ]);
        const benefitCategory = claimPayable.benefitCategory;
        const benefitItemCodeList = lodash.compact(
          getBenefitItemCode({
            draftState,
            Ids: [claimPayable.id],
            dex: 0,
            benefitCategory,
          })
        );

        return benefitItemCodeList.length > 0
          ? benefitItemCodeList.map((benefitItemCode) => ({
              ...filterObj,
              benefitItemCode,
            }))
          : [{ ...filterObj }];
      });
      const newNcdFlag = benefitList.some(
        (matchObj: any) => lodash.find(draftState.listPolicy, matchObj)?.ncdFlag
      );

      policyItem.ncdFlag =
        formUtils.queryValue(policyItem.ncdFlag) === 'Y' ||
        formUtils.queryValue(policyItem.ncdFlag) === 'N'
          ? policyItem.ncdFlag
          : newNcdFlag
          ? 'N'
          : void 0;
    }
  }
};
