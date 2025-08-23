import { useMemo } from 'react';
import lodash from 'lodash';
import useGetSectionAtomConfig from 'basic/components/Elements/hooks/useGetSectionAtomConfig';
import useGetFieldsFieldsDisableConditionConfig from 'process/NB/ManualUnderwriting/_hooks/useGetFieldsFieldsDisableConditionConfig';
import getApplicableByDisableCondidtions from 'process/NB/ManualUnderwriting/utils/getApplicableByDisableCondidtions';
import useJudgeTargetBaseProductDisplay from 'process/NB/ManualUnderwriting/_hooks/useJudgeTargetBaseProductDisplay';
import useJudgeIsGBSN from 'basic/components/CaseContainer/hooks/useJudgeIsGBSN';
import useproductCategorUL from 'process/NB/ManualUnderwriting/_hooks/useproductCategorUL';
import ProductType from 'process/NB/ManualUnderwriting/Enum/ProductType';
import { tenant, Region } from '@/components/Tenant';
import useGetCoverageList from 'process/NB/ManualUnderwriting/_hooks/useGetCoverageList';
import TaskDefKey from 'enum/TaskDefKey';
import CaseCategory from 'enum/CaseCategory';
import useGetHasFamilyGroupInd from './useGetHasFamilyGroupInd';
import useGetTaskDetail from 'navigator/components/CaseTaskDetail/hooks/useGetTaskDetail';
import useDisplayPolicyTaxAmount from 'process/NB/ManualUnderwriting/_hooks/useDisplayPolicyTaxAmount';
import useDisplayPaymentContinuation from './useDisplayPaymentContinuation';

export default ({ section, localConfig }: any) => {
  const config = useGetSectionAtomConfig({
    section,
    localConfig,
  });
  const disableFieldsConditions = useGetFieldsFieldsDisableConditionConfig();
  const targetBaseProductIsUL07 = useJudgeTargetBaseProductDisplay({ targetProduct: 'UL07' });
  const isUL = useproductCategorUL();
  const isGBSN = useJudgeIsGBSN();
  const hasFamilyGroupInd = useGetHasFamilyGroupInd();
  const coverageList = useGetCoverageList();
  const taskDetail = useGetTaskDetail();
  const { caseCategory, taskDefKey } = lodash.pick(taskDetail, ['caseCategory', 'taskDefKey']);
  const mainCoverageItem = lodash.find(
    coverageList,
    (coverageItem) => coverageItem?.isMain === 'Y'
  );
  const isILPproduct = mainCoverageItem?.productType === ProductType.ILP;
  const isTHRegion = tenant.region() === Region.TH;
  const isPostQC =
    caseCategory === CaseCategory.BP_NB_CTG003 && taskDefKey === TaskDefKey.BP_NB_ACT008;

  const THFilterField = [
    'rpqScore',
    'rpqRiskLevel',
    'rpqExecuteDate',
    'privateFundFlag',
    'rebalancingType',
  ];

  const isShowPolicyTaxAmount = useDisplayPolicyTaxAmount();
  const isShowPaymentContinuation = useDisplayPaymentContinuation();

  return useMemo(() => {
    return lodash
      .chain(config)
      .filter((item: any) => !['payType', 'renewalPayType'].includes(item?.field))
      .filter((item) => {
        const field = lodash.get(item, 'field');
        switch (field) {
          case 'withdrawalTerm':
            return targetBaseProductIsUL07;
          case 'facType':
            return isGBSN;
          case 'rebalancingType':
            return isUL;
          case 'privateFundFlag':
            return isUL;
          case 'eDocument':
            // Post QC暂不支持通过配置控制字段是否显示，作特殊处理
            return !isPostQC;
          case 'firstPolicyFlag':
          case 'sharingGroupNumber':
            return hasFamilyGroupInd;
          case 'policyTaxAmount':
            return isShowPolicyTaxAmount;
          case 'isContinuePremiumPay':
            return isShowPaymentContinuation;
          default:
            return true;
        }
      })
      .filter((item) => {
        if (isTHRegion && !isILPproduct) {
          return !THFilterField.includes(item.field);
        } else {
          return true;
        }
      })
      .filter((item) => {
        return item.field !== 'refundPayType';
      })
      .map((item: any) => {
        const configItem = getApplicableByDisableCondidtions({
          fieldConfig: item,
          condition: 'mw',
          disableFieldsConditions,
        });
        return configItem;
      })
      .orderBy((item: any) => [item['field-props']?.['x-layout']?.lg?.order, item?.field])
      .value();
  }, [config, disableFieldsConditions, isGBSN, coverageList, isShowPolicyTaxAmount, isShowPaymentContinuation]);
};
