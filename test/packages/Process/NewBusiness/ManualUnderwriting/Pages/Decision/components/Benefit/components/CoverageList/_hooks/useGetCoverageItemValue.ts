import { useMemo } from 'react';
import lodash from 'lodash';
import useGetcfgPlanHospitalBenefitTarget from './useGetcfgPlanHospitalBenefitTarget';
import { getFieldDisplayAmount } from '@/utils/accuracy';
import useGetNumberofunitsDictsByProductCode from 'decision/components/Benefit/_hooks/useGetNumberofunitsDictsByProductCode';
import { useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import { tenant, Region } from '@/components/Tenant';
// TODO:
import useGetRopListByCoreCode from 'process/NewBusiness/ManualUnderwriting/Pages/Decision/components/Benefit/_hooks/useGetRopListByCoreCode.ts';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';
import { getDrowDownList } from '@/utils/dictFormatMessage';
import useGetSustainabilityCaseCheckStatus from 'process/NewBusiness/ManualUnderwriting/Pages/SustainabilityCaseModal/CheckingProvider/hooks/useGetSustainabilityCaseCheckStatus';

export default ({ item, col, type }: any) => {
  const cfgPlanHospitalBenefitTarget = useGetcfgPlanHospitalBenefitTarget({
    benefitPlan: item?.hospitalPlanCode,
    productCode: item?.productCode,
  });

  const { checking } = useGetSustainabilityCaseCheckStatus();
  const dict = getDrowDownList('Dropdown_POL_PlanOption');
  const { dictCode } = item.id
    ? useGetNumberofunitsDictsByProductCode({ id: item?.id, type })
    : { dictCode: 'numberOfUnits' };
  const dicts = useGetNumberofunitsDictsByProductCode({ id: item?.id, type });
  const regionCode = tenant.region();
  const currentRopList = useGetRopListByCoreCode({ coreCode: item.coreCode });
  const SAMultiplierOPUSListMap = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.SAMultiplierOPUSListMap,
    shallowEqual
  );
  return useMemo(() => {
    const getValueByKey = (key: string) => {
      if (!lodash.isEmpty(col.format)) {
        return lodash
          .chain(col.format)
          .map((colkey) => item?.[colkey])
          .join('-')
          .value();
      }
      if (col.formatter) {
        const value = lodash.get(item, key) || 0;
        if (lodash.isNumber(value)) {
          return getFieldDisplayAmount(value, `nb.policyList.coverageList.${col.key}`);
        }
      }
      return lodash.get(item, key);
    };
    const dataMapping = new Map();
    if (col.key === 'numberOfUnits' && dictCode === 'hospitalPlanCode') {
      if (!!item?.hospitalPlanCode) {
        dataMapping.set(
          'normal',
          lodash
            .chain(dicts?.dictData)
            .find((data: any) => {
              return data?.hospitalPlanCode === cfgPlanHospitalBenefitTarget?.benefitPlan;
            })
            .get('hospitalPlanName')
            .value()
        );
      }
    } else if (col.key === 'numberOfUnits' && dictCode === 'dictCode') {
      dataMapping.set(
        'normal',
        lodash
          .chain(dicts?.dictData)
          .find((data: any) => {
            return data?.dictCode === cfgPlanHospitalBenefitTarget?.benefitPlan;
          })
          .get('dictName')
          .value()
      );
    } else {
      dataMapping.set('normal', getValueByKey(col.key));
    }
    if (item.subProductType === 'MD' && col.key === 'sumAssured') {
      if (
        !lodash.isEmpty(cfgPlanHospitalBenefitTarget) &&
        (cfgPlanHospitalBenefitTarget.annualLimit || cfgPlanHospitalBenefitTarget.sumAssured)
      ) {
        dataMapping.set(
          'normal',
          getFieldDisplayAmount(
            cfgPlanHospitalBenefitTarget.annualLimit || cfgPlanHospitalBenefitTarget.sumAssured,
            `nb.policyList.coverageList.${col.key}`
          )
        );
      }
    }
    if (
      !lodash.isEmpty(cfgPlanHospitalBenefitTarget) &&
      regionCode === Region.VN &&
      col.key === 'sumAssured'
    ) {
      dataMapping.set(
        'normal',
        getFieldDisplayAmount(
          cfgPlanHospitalBenefitTarget.sumAssured || '',
          `nb.policyList.coverageList.${col.key}`
        )
      );
    }

    if (checking) {
      lodash.has(item, `${col.key}BE`);
      dataMapping.set('outdatedValue', lodash.get(item, `${col.key}BE`));
      dataMapping.set('effectiveValue', lodash.get(item, `${col.key}`));
    }

    if (col.key === 'waiveProductList') {
      if (!!item?.waiveProductList) {
        dataMapping.set(
          'normal',
          lodash
            .chain(item?.waiveProductList)
            .map((waiveProduct: any) => {
              return lodash
                .chain(['waiveProduct', 'productName'])
                .map((colkey) => waiveProduct?.[colkey])
                .join('-')
                .value();
            })
            .value()
        );
      }
    }
    if (col.key === 'returnOfPremium') {
      dataMapping.set(
        'normal',
        lodash
          .chain(currentRopList)
          .find((currentRop: any) => currentRop.dictCode == item.returnOfPremium)
          .get('dictName')
          .value() || item?.returnOfPremium
      );
    }
    if (col.key === 'sumAssuredMultiplier') {
      dataMapping.set(
        'normal',
        lodash
          .chain(SAMultiplierOPUSListMap)
          .get(item.coreCode)
          .find((SAMultiplierOPUS: any) => SAMultiplierOPUS.dictCode == item.sumAssuredMultiplier)
          .get('dictName')
          .value() || item?.sumAssuredMultiplier
      );
    }
    return Object.fromEntries(dataMapping);
  }, [col, dictCode, item, checking, dict, currentRopList, SAMultiplierOPUSListMap]);
};
