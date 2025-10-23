import React from 'react';
import { connect } from 'dva';
import Process from '../Process';
import classNames from 'claim/components/CalculationPathModal/index.less';
import calculationUtil from '@/utils/calculation';

@connect(({ calculationPath: { treatmentCalculationDetail } }) => ({
  treatmentCalculationDetail,
  ...calculationUtil.getAmountsAndAddDefault(treatmentCalculationDetail, [
    'calculationAmount',
    'expenseAmount',
    'calculatedExpense',
  ]),
}))
class RemainingExpenseModel extends React.Component {
  render() {
    const { calculationAmount, expenseAmount, calculatedExpense } = this.props;

    return (
      <div className={classNames.levelBox}>
        <Process
          title="Remaining Expense"
          calculationResult={calculationAmount}
          processList={[
            {
              title: 'Expense',
              value: expenseAmount,
              key: 'expenseAmount',
            },
            {
              title: 'Calculated Expense',
              value: `- ${calculatedExpense}`,
              key: 'calculatedExpense',
            },
          ]}
        />
      </div>
    );
  }
}

export default RemainingExpenseModel;
