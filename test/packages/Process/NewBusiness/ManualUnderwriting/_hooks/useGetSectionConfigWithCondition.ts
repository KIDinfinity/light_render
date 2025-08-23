import { useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';
import useGetSectionAtomConfig from 'basic/components/Elements/hooks/useGetSectionAtomConfig';
import useGetRoleDisplayConfigCode from 'basic/components/Elements/hooks/useGetRoleDisplayConfigCode';
import getApplicableByDisableCondidtions from 'process/NewBusiness/ManualUnderwriting/_utils/getApplicableByDisableCondidtions';
import { tenant, Region } from '@/components/Tenant';
import useGetCoverageList from 'process/NewBusiness/ManualUnderwriting/_hooks/useGetCoverageList';
import ProductType from 'process/NB/ManualUnderwriting/Enum/ProductType';

export default ({ section, localConfig, condition = 'mw' }: any) => {
  const roleDisplayConfigCode = useGetRoleDisplayConfigCode();

  const disableFieldsConditions = useSelector((state: any) => {
    return lodash.get(state, `atomConfig.groups.${roleDisplayConfigCode}_disable_condition`, []);
  }, shallowEqual);
  const config = useGetSectionAtomConfig({
    section,
    localConfig,
  });
  const coverageList = useGetCoverageList();
  const mainCoverageItem = lodash.find(
    coverageList,
    (coverageItem) => coverageItem?.isMain === 'Y'
  );
  const isILPproduct = mainCoverageItem?.productType === ProductType.ILP;
  const isTHRegion = tenant.region() === Region.TH;
  const THFilterField = [
    'rpqScore',
    'rpqRiskLevel',
    'rpqExecuteDate',
    'privateFundFlag',
    'rebalancingType',
  ];
  return lodash
    .chain(config)
    .filter((item) => {
      return ['Y', 'C'].includes(lodash.get(item, 'field-props.visible')) && item.field;
    })
    .filter((item) => {
      if (isTHRegion && !isILPproduct) {
        return !THFilterField.includes(item.field);
      } else {
        return true;
      }
    })
    .map((item: any) => {
      return getApplicableByDisableCondidtions({
        fieldConfig: item,
        condition,
        disableFieldsConditions,
      });
    })
    .filter((item) => {
      return ['Y', 'C'].includes(lodash.get(item, 'field-props.visible'));
    })
    .value();
};
