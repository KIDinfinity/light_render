import React from 'react';
import BenefitDecision from './components/BenefitDecision';
import FacultativeOption from './components/FacultativeOption';
import FacultativeReason from './components/FacultativeReason';
import CustomisationCol from 'basic/components/CustomisationCol';
import ClientNames from './components/ClientNames/index';
import useGetDecisionColumnsMW from 'opus/NewBusiness/ManualUnderwriting/Pages/Decision/components/Benefit/_hooks/useGetDecisionColumnsMW';
import CustomisationContainer from 'basic/components/CustomisationContainer';
import lodash from 'lodash';
import Expander from './components/Expander/index';
import useCalculateCoverageTotalSpan from 'opus/NewBusiness/ManualUnderwriting/Pages/Decision/components/Benefit/_hooks/useCalculateCoverageTotalSpan';
import useGetFieldOrderAtomConfigCallback from 'basic/components/Elements/hooks/useGetFieldOrderAtomConfigCallback';
import useGetFieldSpanAtomConfigCallback from 'opus/NewBusiness/ManualUnderwriting/Pages/Decision/components/Benefit/components/CoverageList/_hooks/useGetFieldSpanAtomConfigCallback';
import classnames from 'classnames';
import ValueItem from './components/ValueItem';
import styles from './index.less';
import useJudgeWaiveProductDisplay from 'opus/NewBusiness/ManualUnderwriting/Pages/Decision/components/Benefit/_hooks/useJudgeWaiveProductDisplay';
import CustomerDecision from './components/CustomerDecision';

interface IRenderCoverageColumn {
  column: { field: string };
  item: any;
}

const RenderCoverageColumn = ({ column, item }: IRenderCoverageColumn) => {
  switch (column.field) {
    case 'uwDecision':
      return <BenefitDecision record={item} id={item?.id} />;
    case 'name':
      return <ClientNames item={item} />;
    case 'customerDecision':
      return <CustomerDecision item={item} />;
    case 'facultativePackageCode':
      return <FacultativeOption coverage={item} />;
    case 'facultativeReason':
      return <FacultativeReason coverage={item} />;
    default:
      return <ValueItem item={item} col={column} />;
  }
};

export default ({ item }: any) => {
  const decisionColumns = useGetDecisionColumnsMW();
  const totalSpan = useCalculateCoverageTotalSpan();

  const handleGetOrder = useGetFieldOrderAtomConfigCallback({
    localConfig: {},
    section: 'UWDecision-Table',
  });

  const sortedDecisionColumns = lodash(decisionColumns)
    .sortBy((col: any) => handleGetOrder({ field: col.field }))
    .value();

  const handleGetSpan = useGetFieldSpanAtomConfigCallback();
  const hasWaiveCol = useJudgeWaiveProductDisplay();

  return (
    <div data-id="coverage-row" data-coverage-id={item?.id}>
      <CustomisationContainer totalSpan={totalSpan} className={classnames(styles.row)}>
        {lodash.map(sortedDecisionColumns, (col: any) => (
          <CustomisationCol
            span={col.field === 'name' && hasWaiveCol ? 3 : handleGetSpan({ field: col.field })}
            order={handleGetOrder({ field: col.field })}
            field={col.field}
          >
            <RenderCoverageColumn column={col} item={item} />
          </CustomisationCol>
        ))}
      </CustomisationContainer>
      <Expander record={item} />
    </div>
  );
};
