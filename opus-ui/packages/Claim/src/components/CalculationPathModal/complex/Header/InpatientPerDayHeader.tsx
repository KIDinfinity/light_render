import React from 'react';
import { connect } from 'dva';
import Arrow from '../../Arrow';
import calculationUtil from '@/utils/calculation';
import classNames from './index.less';
import CountModel from './CountModel';

@connect(({ calculationPath: { treatmentCalculationDetail } }) => ({
  ...calculationUtil.getAmountsAndAddDefault(treatmentCalculationDetail, [
    'payableAmountPerDay',
    'payableDays',
    'remainingExpense',
    'systemCalculationAmount',
    'payablePerDay',
  ]),
}))
class InpatientPerDayHeader extends React.Component {
  render() {
    const {
      // payableAmountPerDay,
      payableDays,
      remainingExpense,
      systemCalculationAmount,
      payablePerDay,
    } = this.props;

    return (
      <div className={classNames.headerContainer} style={{ width: 550 }}>
        <CountModel
          title="Calculation Expense / Day"
          amount={payablePerDay}
          hasDetail
          name="payableAmountPerDay"
          descStyle={{ maxWidth: 80 }}
        />
        <span className={classNames.computation}>X</span>
        <CountModel
          amount={payableDays}
          isInteger
          title="Calculation Days"
          name="Calculation_Days"
          hasDetail
        />
        <span className={classNames.computation}>=</span>
        <CountModel title="Remaining Expense" amount={remainingExpense} />
        <Arrow />
        <CountModel
          title="Calculation Amount"
          amount={systemCalculationAmount}
          hasDetail
          name="Calculation_Amount"
        />
      </div>
    );
  }
}

export default InpatientPerDayHeader;
