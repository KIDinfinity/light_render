import { formatMessageApi } from '@/utils/dictFormatMessage';
import useGetSectionAtomConfig from 'basic/components/Elements/hooks/useGetSectionAtomConfig';
import { formUtils, ZEproduct } from 'basic/components/Form';
import lodash from 'lodash';
import { useMemo } from 'react';
import useGetCoverageDataSource from './useGetCoverageDataSource';
import useHaveSaMultiplierInd from './useHaveSaMultiplierInd';
import useJudgeDisplayAnnualPrem from './useJudgeDisplayAnnualPrem';
import useJudgeDisplayJointLifeColumn from './useJudgeDisplayJointLifeColumn';
import useJudgeDisplayRop from './useJudgeDisplayRop';
import useJudgeIsDisplayPlanOption from './useJudgeIsDisplayPlanOption';
import useJudgeWaiveProductDisplay from './useJudgeWaiveProductDisplay';
import useJugeDisplayIntialIvestment from './useJugeDisplayIntialIvestment';
import useJudgePremiumInUnitBasis from './useJudgePremiumInUnitBasis';
import useJudgeIsDisplayDeductibleOption from './useJudgeIsDisplayDeductibleOption';

export default () => {
  const isDisplayDeductibleOption = useJudgeIsDisplayDeductibleOption();
  const isDisplayPlanOption = useJudgeIsDisplayPlanOption();
  const isDisplayAnnualPrem = useJudgeDisplayAnnualPrem();
  const isDisplayWaiveProduct = useJudgeWaiveProductDisplay('edit');
  const isDisplayRop = useJudgeDisplayRop();
  const coverageDataSource = useGetCoverageDataSource();
  const haveSaMultiplierInd = useHaveSaMultiplierInd();
  const isDisplayJointLifeColumn = useJudgeDisplayJointLifeColumn();
  const isDisplayInitialInvestmentAnnualPremium = useJugeDisplayIntialIvestment();
  const isDisplayUnit = useJudgePremiumInUnitBasis();

  const isIncludeZEtype = lodash.some(coverageDataSource, (item) => {
    return lodash.includes([ZEproduct.ZE01, ZEproduct.ZE02], formUtils.queryValue(item.coreCode));
  });

  const sectionConfig = useGetSectionAtomConfig({
    section: 'UWDecision-Table',
  });

  const result = useMemo(() => {
    const extraConfigMap = new Map([
      [
        'sumAssured',
        {
          formatter: true,
        },
      ],
      [
        'annualPrem',
        {
          formatter: true,
        },
      ],
      [
        'basePremium',
        {
          formatter: true,
        },
      ],
      [
        'finalCoi',
        {
          formatter: true,
        },
      ],
      [
        'loadingPremium',
        {
          formatter: true,
        },
      ],
      [
        'instalmentPremiumWithTax',
        {
          formatter: true,
        },
      ],
      [
        'coreCode',
        {
          format: ['coreCode', 'productName'],
        },
      ],
      [
        'waiverProductList',
        {
          format: ['waiveProduct', 'productName'],
        },
      ],
      [
        'gmp',
        {
          format: ['guaranteedMonthlyPayout'],
        },
      ],
      [
        'guaranteedMonthlyPayout',
        {
          formatter: true,
          fieldType: 'Text',
        },
      ],
      [
        'initialInvestmentAnnualPremium',
        {
          formatter: true,
        },
      ],
    ]);
    return lodash
      .chain(sectionConfig)
      .filter((fieldConfig: any) => {
        const visible = lodash.get(fieldConfig, 'field-props.visible');
        return visible && visible !== 'N';
      })
      .filter((fieldConfig: any) => {
        const field = lodash.get(fieldConfig, 'field');
        if (field === 'numberOfUnits') {
          return isDisplayPlanOption;
        }
        if (field === 'deductibleOption') {
          return isDisplayDeductibleOption;
        }
        if (field === 'sumAssuredMultiplier') {
          return !!haveSaMultiplierInd;
        }
        if (field === 'customerDecision') {
          return isDisplayJointLifeColumn;
        }
        return true;
      })
      .filter((fieldConfig: any) => {
        const field = lodash.get(fieldConfig, 'field');
        return !(field === 'annualPrem' && !isDisplayAnnualPrem);
      })
      .filter((fieldConfig: any) => {
        const field = lodash.get(fieldConfig, 'field');
        return !(field === 'unit' && !isDisplayUnit);
      })
      .filter((fieldConfig: any) => {
        const field = lodash.get(fieldConfig, 'field');
        return !(field === 'waiveProductList' && !isDisplayWaiveProduct);
      })
      .filter((fieldConfig: any) => {
        const field = lodash.get(fieldConfig, 'field');
        return !(field === 'guaranteedMonthlyPayout' && !isIncludeZEtype);
      })
      .filter((fieldConfig: any) => {
        const field = lodash.get(fieldConfig, 'field');
        return !(field === 'returnOfPremium' && !isDisplayRop);
      })
      .filter((fieldConfig: any) => {
        const field = lodash.get(fieldConfig, 'field');
        return !(
          field === 'initialInvestmentAnnualPremium' && !isDisplayInitialInvestmentAnnualPremium
        );
      })
      .map((fieldConfig: any) => {
        const span = lodash.get(fieldConfig, 'field-props.x-layout.lg.span');
        const field = lodash.get(fieldConfig, 'field');
        const dictTypeCode = lodash.get(fieldConfig, 'field-props.label.dictTypeCode');
        const dictCode = lodash.get(fieldConfig, 'field-props.label.dictCode');
        const order = lodash.get(fieldConfig, 'field-props.x-layout.lg.order');
        const extra = (() => {
          if (extraConfigMap.has(field)) {
            return extraConfigMap.get(field);
          }
          return {};
        })();
        return {
          ...fieldConfig,
          span,
          key: field,
          title: formatMessageApi({
            [dictTypeCode]: dictCode,
          }),
          id: field,
          order,
          ...extra,
        };
      })
      .orderBy(['order'])
      .value();
  }, [
    sectionConfig,
    isDisplayPlanOption,
    isDisplayAnnualPrem,
    isDisplayWaiveProduct,
    isIncludeZEtype,
    haveSaMultiplierInd,
    isDisplayRop,
    isDisplayJointLifeColumn,
    isDisplayInitialInvestmentAnnualPremium,
    isDisplayUnit,
    isDisplayDeductibleOption,
  ]);

  return result;
};
