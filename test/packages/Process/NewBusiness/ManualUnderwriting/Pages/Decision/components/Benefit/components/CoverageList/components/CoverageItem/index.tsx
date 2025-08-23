import React from 'react';
import BenefitDecision from './components/BenefitDecision/index';
import CustomisationCol from 'basic/components/CustomisationCol';
import ClientNames from './components/ClientNames/index';
import useGetDecisionColumnsMW from 'process/NewBusiness/ManualUnderwriting/Pages/Decision/components/Benefit/_hooks/useGetDecisionColumnsMW';
import CustomisationContainer from 'basic/components/CustomisationContainer';
import lodash from 'lodash';
import Expander from './components/Expander/index';
import useCalculateCoverageTotalSpan from 'process/NewBusiness/ManualUnderwriting/Pages/Decision/components/Benefit/_hooks/useCalculateCoverageTotalSpan';
import useGetFieldOrderAtomConfigCallback from 'basic/components/Elements/hooks/useGetFieldOrderAtomConfigCallback';
import useGetFieldSpanAtomConfigCallback from 'process/NewBusiness/ManualUnderwriting/Pages/Decision/components/Benefit/components/CoverageList/_hooks/useGetFieldSpanAtomConfigCallback';
import classnames from 'classnames';
import ValueItem from './components/ValueItem';
import styles from './index.less';
import useJudgeWaiveProductDisplay from 'process/NewBusiness/ManualUnderwriting/Pages/Decision/components/Benefit/_hooks/useJudgeWaiveProductDisplay';
import CustomerDecision from './components/CustomerDecision';

export default ({ item }: any) => {
  const decisionColumns = useGetDecisionColumnsMW();
  const totalSpan = useCalculateCoverageTotalSpan();

  const handleGetOrder = useGetFieldOrderAtomConfigCallback({
    localConfig: {},
    section: 'UWDecision-Table',
  });

  const fore = lodash.every(decisionColumns, (column: any) => column?.field !== 'customerDecision')
    ? 2
    : 3; // 前面放了多少
  const newDecisionColumns = lodash.drop(decisionColumns, fore);
  const handleGetSpan = useGetFieldSpanAtomConfigCallback();
  const hasWaiveCol = useJudgeWaiveProductDisplay();

  return (
    <div data-id="coverage-row" data-coverage-id={item?.id} className={styles.coverageItem}>
      <CustomisationContainer totalSpan={totalSpan} className={classnames(styles.row)}>
        <CustomisationCol
          span={handleGetSpan({ field: 'uwDecision' })}
          order={handleGetOrder({ field: 'uwDecision' })}
          field={'uwDecision'}
        >
          <BenefitDecision record={item} id={item?.id} />
        </CustomisationCol>
        <CustomisationCol
          span={hasWaiveCol ? 3 : handleGetSpan({ field: 'name' })}
          order={handleGetOrder({ field: 'name' })}
          field={'name'}
        >
          <ClientNames item={item} />
        </CustomisationCol>
        <CustomisationCol
          span={handleGetSpan({ field: 'customerDecision' })}
          order={handleGetOrder({ field: 'customerDecision' })}
          field={'customerDecision'}
        >
          <CustomerDecision item={item} />
        </CustomisationCol>
        {lodash.map(newDecisionColumns, (col: any) => {
          return <ValueItem item={item} col={col} key={col?.key} />;
        })}
      </CustomisationContainer>
      <Expander record={item} />
    </div>
  );
};
