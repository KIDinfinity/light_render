import React from 'react';
import styles from './index.less';
import { getFieldDisplayAmount } from '@/utils/accuracy';
import useGetDecisionData from 'process/NB/ManualUnderwriting/_hooks/useGetDecisionData';
import CustomisationContainer from 'basic/components/CustomisationContainer';
import CustomisationCol from 'basic/components/CustomisationCol';
import useCalculateCoverageTotalSpan from 'process/NB/ManualUnderwriting/_hooks/useCalculateCoverageTotalSpan';
import useCalculateCoverageSpanBefore from 'process/NB/ManualUnderwriting/_hooks/useCalculateCoverageSpanBefore';
import useGetFieldSpanAtomConfigCallback from 'basic/components/Elements/hooks/useGetFieldSpanAtomConfigCallback';

export default () => {
  const {
    policyInstalmentPremiumWithTax,
    policyBasePremium,
    policyLoadingPremium,
  }: any = useGetDecisionData();
  const totalSpan = useCalculateCoverageTotalSpan();
  const totalLabelSpan = useCalculateCoverageSpanBefore({
    field: 'basePremium',
  });
  const handleGetSpan = useGetFieldSpanAtomConfigCallback({
    localConfig: {},
    section: 'UWDecision-Table',
  });

  return (
    <CustomisationContainer className={styles.calculate} totalSpan={totalSpan}>
      <CustomisationCol span={totalLabelSpan} field="total">
        <div className={styles.total}>Total</div>
      </CustomisationCol>
      <CustomisationCol
        span={handleGetSpan({
          field: 'basePremium',
        })}
        field="basePremium"
      >
        {getFieldDisplayAmount(policyBasePremium || 0, 'nb.policyList.policyBasePremium')}
      </CustomisationCol>
      <CustomisationCol span={handleGetSpan({ field: 'loadingPremium' })} field="loadingPremium">
        {getFieldDisplayAmount(policyLoadingPremium || 0, 'nb.policyList.policyLoadingPremium')}
      </CustomisationCol>
      <CustomisationCol
        span={handleGetSpan({ field: 'instalmentPremiumWithTax' })}
        field="instalmentPremiumWithTax "
      >
        {getFieldDisplayAmount(
          policyInstalmentPremiumWithTax || 0,
          'nb.policyList.policyInstalmentPremiumWithTax'
        )}
      </CustomisationCol>
    </CustomisationContainer>
  );
};
