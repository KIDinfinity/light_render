import React from 'react';
import { Icon } from 'antd';
import { connect } from 'dva';
import lodash from 'lodash';
import Arrow from '../../Arrow';
import classNames from './index.less';
import CountModel from './CountModel';

@connect(({ calculationPath }) => ({
  benefitAmount: lodash.get(calculationPath, 'treatmentCalculationDetail.benefitAmount', 0),
  payableDays: lodash.get(calculationPath, 'treatmentCalculationDetail.payableDays', 0),
  systemCalculationAmount: lodash.get(
    calculationPath,
    'treatmentCalculationDetail.systemCalculationAmount',
    0
  ),
  calculatedAmount35: lodash.get(
    calculationPath,
    'treatmentCalculationDetail.calculatedAmount35',
    0
  ),
  isShowDiscountPect: !(
    lodash.get(calculationPath, 'treatmentCalculationDetail.discountPect') === undefined
  ),
}))
class HospitalIncomeHeader extends React.PureComponent {
  render() {
    const {
      benefitAmount,
      payableDays,
      systemCalculationAmount,
      calculatedAmount35,
      isShowDiscountPect,
    } = this.props;

    return (
      <div className={classNames.headerContainer} style={{ width: 500 }}>
        <CountModel title="Benefit Amount" amount={benefitAmount} />
        <Icon type="close" style={{ fontSize: 16 }} />
        <CountModel title="Payable Days" amount={payableDays} hasDetail name="payable_days" />
        <span className={classNames.computation}>=</span>
        <CountModel title="Calculative Amount" amount={calculatedAmount35} />
        <Arrow />
        <CountModel
          title="Calculation Amount"
          amount={systemCalculationAmount}
          hasDetail={isShowDiscountPect}
          name="calculation_amount"
        />
      </div>
    );
  }
}

export default HospitalIncomeHeader;
