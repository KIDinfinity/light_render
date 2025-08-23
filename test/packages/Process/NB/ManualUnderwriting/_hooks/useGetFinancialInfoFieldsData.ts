import { useMemo } from 'react';
import lodash from 'lodash';
import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import { multiply } from '@/utils/precisionUtils';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';
import CustomerRole from 'process/NB/Enum/CustomerRole';
import useGetDataBySection from 'process/NB/ManualUnderwriting/_hooks/useGetDataBySection';
import useGetIncomeTypeVisible from 'process/NB/ManualUnderwriting/_hooks/useGetIncomeTypeVisible';
import useCrtInfoListHaveTn from 'process/NB/ManualUnderwriting/_hooks/useCrtInfoListHaveTn';
import { tenant, Region } from '@/components/Tenant';
import TaskDefKey from 'enum/TaskDefKey';
import CaseCategory from 'enum/CaseCategory';
import useJudgeIndisiaReasonRequired from 'process/NB/ManualUnderwriting/_hooks/useJudgeIndisiaReasonRequired';
import useGetTaskDetail from 'navigator/components/CaseTaskDetail/hooks/useGetTaskDetail';

export default ({ id, config, roles }: any) => {
  const incomeTypeVisible = useGetIncomeTypeVisible();
  const indisiaReasonVisible = useJudgeIndisiaReasonRequired({ id });
  const data = useGetDataBySection({
    section: 'FinancialInfo-Field',
    id,
    config,
  });
  const crtInfoListHaveTn = useCrtInfoListHaveTn({ id });
  const exchangeRate = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.exchangeRate,
    shallowEqual
  );
  const clientInfoList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.businessData?.policyList[0]?.clientInfoList,
    shallowEqual
  );
  const taskDetail = useGetTaskDetail();

  const annualIncomeCurrency = lodash.find(clientInfoList, (item: any) => item?.id === id)
    ?.annualIncomeCurrency;
  const incomeRange = lodash.find(clientInfoList, (item: any) => item?.id === id)?.incomeRange;
  const rate = lodash.get(exchangeRate, `${annualIncomeCurrency}`, 1);
  const { caseCategory, taskDefKey } = lodash.pick(taskDetail, ['caseCategory', 'taskDefKey']);

  return useMemo(() => {
    return lodash
      .chain(data)
      .map((item: any) => {
        if (
          item?.key === 'annualIncomeInLocalCurrency' ||
          item?.key === 'monthlyIncomeInLocalCurrency'
        ) {
          const IncomeKey =
            item?.key === 'annualIncomeInLocalCurrency' ? 'annualIncome' : 'monthlyIncome';
          const IncomeValue = lodash.find(data, (dataItem: any) => dataItem?.key === IncomeKey)
            ?.value;
          return { ...item, value: multiply(IncomeValue, rate).toFixed(2) };
        }
        if (item?.key === 'annualPremEquivalent') {
          const annualPrem = lodash.find(
            data,
            (dataItem: any) => dataItem?.key === 'annualPremEquivalent'
          )?.value;
          return { ...item, value: annualPrem.toFixed(2) };
        }
        if(item?.key === 'tsarPI' && item?.value != 0){
          item.value = Number(item?.value).toFixed(2);
        }
        if(item?.key === 'tsarPH' && item?.value != 0){
          item.value = Number(item?.value).toFixed(2);
        }
        return item;
      })
      .filter((item: any) => {
        if (item?.key === 'tsarPI' && item?.value === 0) {
          return false;
        }
        if (item?.key === 'tsarPH' && item?.value === 0) {
          return false;
        }
        if (item?.key === 'annualIncome') {
          return tenant.region({
            [Region.MY]: incomeRange === '08',
            notMatch: true,
          });
        }
        if (item?.key === 'noTin') {
          // Post QC暂不支持通过配置控制字段是否显示，作特殊处理
          return !(
            caseCategory === CaseCategory.BP_NB_CTG003 && taskDefKey === TaskDefKey.BP_NB_ACT008
          );
        }
        if (item?.key === 'annualIncomeInLocalCurrency') {
          return lodash.includes(incomeTypeVisible, 'annualIncome');
        } else if (item?.key === 'monthlyIncomeInLocalCurrency') {
          return lodash.includes(incomeTypeVisible, 'monthlyIncome');
        } else if (
          item?.key === 'reasonForPaying' &&
          roles.includes(CustomerRole.Payor) &&
          roles.includes(CustomerRole.PolicyOwner)
        ) {
          return false;
        } else if (item?.key === 'ctfId' && !crtInfoListHaveTn) {
          return false;
        }
        return true;
      })
      .filter((item: any) => {
        if (item?.key === 'indisiaReason') {
          return indisiaReasonVisible;
        }
        return true;
      })
      .value();
  }, [
    data,
    rate,
    roles,
    crtInfoListHaveTn,
    incomeRange,
    caseCategory,
    taskDefKey,
    incomeTypeVisible,
    indisiaReasonVisible,
  ]);
};
