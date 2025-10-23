import { tenant, Region } from '@/components/Tenant';
import CustomerRole from 'basic/enum/CustomerRole';
import { produce } from 'immer';
import lodash from 'lodash';

export default (state: any) => {
  const nextState = produce(state, (draftState: any) => {
    const riskIndicatorConfigList = draftState.riskIndicatorConfigList;
    const businessDataRiskIndicatorConfigList = draftState.processData?.riskIndicatorConfigList;
    let customers = draftState.entities?.clientMap;
    customers = tenant.region({
      [Region.VN]: lodash.filter(customers, (item) => {
        return lodash.includes(item?.personalInfo?.customerRole, CustomerRole.PolicyOwner);
      }),
      notMatch: null,
    });
    const result = lodash.some(customers, (item) => {
      const customerRole = item?.personalInfo?.customerRole;
      const tagList = lodash
        .chain(businessDataRiskIndicatorConfigList)
        .filter((indicatorItem) => {
          return (
            lodash.some(customerRole, (roleItem) =>
              lodash.includes(indicatorItem?.customerRoleList, roleItem)
            ) &&
            (indicatorItem?.riskFactorCode === 'CRR' || indicatorItem?.riskFactorCode === 'AML')
          );
        })
        .map((indicatorItem) => {
          const targetRisk = lodash.find(riskIndicatorConfigList, {
            clientId: item.id,
            riskFactorCode: indicatorItem?.riskFactorCode,
          });
          const targetProp = lodash.pick(targetRisk, ['status', 'fecRiskMsg', 'riskScore']);
          const itemProp = lodash.pick(indicatorItem, [
            'id',
            'linkTo',
            'orderNo',
            'riskFactorCode',
          ]);
          return { ...targetProp, ...itemProp };
        })
        .value();
      const AMLItem = lodash.find(tagList, (tagItem) => tagItem?.riskFactorCode === 'AML');
      const CRRItem = lodash.find(tagList, (tagItem) => tagItem?.riskFactorCode === 'CRR');
      return (
        lodash.size(tagList) &&
        AMLItem?.status === 'Y' &&
        (CRRItem?.status === 'Y' || item?.checkAmlCloseCase !== 'Y')
      );
    });
    return lodash.set(draftState, `shouldCheckAMLOrCRRHighlight`, result);
  });
  return { ...nextState };
};
