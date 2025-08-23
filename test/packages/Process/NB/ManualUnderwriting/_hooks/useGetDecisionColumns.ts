import { useMemo } from 'react';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import useJudgeIsDisplayPlanOption from 'process/NB/ManualUnderwriting/_hooks/useJudgeIsDisplayPlanOption';
import useJudgeDisplayAnnualPrem from 'process/NB/ManualUnderwriting/_hooks/useJudgeDisplayAnnualPrem';
import useJudgeDisplayRop from 'process/NB/ManualUnderwriting/_hooks/useJudgeDisplayRop';
import useGetSectionAtomConfig from 'basic/components/Elements/hooks/useGetSectionAtomConfig';
import useJudgeWaiveProductDisplay from 'process/NB/ManualUnderwriting/_hooks/useJudgeWaiveProductDisplay';
import useGetCoverageDataSource from 'process/NB/ManualUnderwriting/_hooks/useGetCoverageDataSource';
import useHaveSaMultiplierInd from 'process/NB/ManualUnderwriting/_hooks/useHaveSaMultiplierInd';
import useJudgeDisplayJointLifeColumn from 'process/NB/ManualUnderwriting/_hooks/useJudgeDisplayJointLifeColumn';
import useGetHasFamilyGroupInd from 'process/NB/ManualUnderwriting/_hooks/useGetHasFamilyGroupInd';
import { ZEproduct } from 'basic/components/Form';

export default () => {
  const isDisplayPlanOption = useJudgeIsDisplayPlanOption();
  const isDisplayAnnualPrem = useJudgeDisplayAnnualPrem();
  const isDisplayWaiveProduct = useJudgeWaiveProductDisplay();
  const isDisplayRop = useJudgeDisplayRop();
  const coverageDataSoure = useGetCoverageDataSource();
  const haveSaMultiplierInd = useHaveSaMultiplierInd();
  const isDisplayJointLifeColumn = useJudgeDisplayJointLifeColumn();
  const isDisplayLaSharingGroupNumber = useGetHasFamilyGroupInd()
  const isIncludeZEtype = lodash.some(coverageDataSoure, (item) => {
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
    ]);
    return lodash
      .chain(sectionConfig)
      .filter((fieldConfig: any) => {
        return lodash.get(fieldConfig, 'field-props.visible') !== 'N';
      })
      .filter((fieldConfig: any) => {
        const field = lodash.get(fieldConfig, 'field');
        if (field === 'numberOfUnits') {
          return isDisplayPlanOption;
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
        return !(field === 'laSharingGroupNumber' && !isDisplayLaSharingGroupNumber);
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
    isDisplayLaSharingGroupNumber
  ]);
  return result;
};
