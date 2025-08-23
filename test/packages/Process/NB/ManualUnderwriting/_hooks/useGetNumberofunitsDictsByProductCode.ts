import { useMemo } from 'react';
import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';
import useGetCfgPlanDictProduct from 'process/NB/ManualUnderwriting/_hooks/useGetCfgPlanDictProduct';
import useGetCoverageList from 'process/NB/ManualUnderwriting/_hooks/useGetCoverageList';
import { getDrowDownList } from '@/utils/dictFormatMessage';

export default ({ id }: any) => {
  const coverageList: { coreCode: any; id: string }[] = useGetCoverageList();

  const dicts = getDrowDownList('Dropdown_POL_PlanOption');

  const ropPlanOptionListMap = useSelector(
    ({ [NAMESPACE]: modelNamespace }: any) => modelNamespace.ropPlanOptionListMap,
    shallowEqual
  );

  const numberOfUnitsList = useGetCfgPlanDictProduct();
  return useMemo(() => {
    const currentCoreCode = formUtils.queryValue(
      lodash
        .chain(coverageList)
        .find((item) => item.id === id)
        .get('coreCode')
        .value()
    );
    const targetData: {
      planHospitalBenefitList: any[];
      planHospitalBenefitUnitList?: any[];
    } = numberOfUnitsList.find((item: any) => item.productCode === currentCoreCode);
    const hospitalPlanCodeData = lodash
      .chain(targetData)
      .get('planHospitalBenefitList')
      .map((item: any) => {
        const dict = lodash.find(dicts, (data: any) => data?.dictCode === item?.benefitPlan);
        return {
          hospitalPlanCode: item?.benefitPlan,
          hospitalPlanName: dict ? dict?.dictName : item?.benefitPlan,
        };
      })
      .value();
    const targetRopPlanOptionListMap = lodash.get(ropPlanOptionListMap, currentCoreCode);
    if (lodash.isArray(targetRopPlanOptionListMap)) {
      return {
        dictCode: 'hospitalPlanCode',
        dictName: 'hospitalPlanName',
        dictData: lodash.map(targetRopPlanOptionListMap, (listItem) => ({
          ...listItem,
          hospitalPlanCode: listItem.dictCode,
          hospitalPlanName: listItem.dictName,
        })),
      };
    } else if (
      lodash.isArray(targetData?.planHospitalBenefitUnitList) &&
      targetData?.planHospitalBenefitUnitList?.length > 0
    ) {
      return {
        dictCode: 'numberOfUnits',
        dictName: 'numberOfUnits',
        dictData: lodash.get(targetData, 'planHospitalBenefitUnitList'),
      };
    } else {
      return {
        dictCode: 'hospitalPlanCode',
        dictName: 'hospitalPlanName',
        dictData: hospitalPlanCodeData,
      };
    }
  }, [numberOfUnitsList, coverageList, id, dicts, ropPlanOptionListMap]);
};
