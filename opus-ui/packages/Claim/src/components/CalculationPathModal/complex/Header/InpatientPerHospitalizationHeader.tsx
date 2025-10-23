import React from 'react';
import { connect } from 'dva';
import Arrow from '../../Arrow';
import calculationUtil from '@/utils/calculation';
import classNames from './index.less';
import CountModel from './CountModel';

@connect(({ calculationPath: { treatmentCalculationDetail } }) => ({
  ...calculationUtil.getAmountsAndAddDefault(treatmentCalculationDetail, [
    'systemCalculationAmount',
  ]),
}))
class InpatientPerHospitalizationHeader extends React.PureComponent {
  render() {
    const { systemCalculationAmount } = this.props;

    return (
      <div className={classNames.headerContainer}>
        <span className={classNames.title}>APPLY BENEFIT SETTING</span>
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

export default InpatientPerHospitalizationHeader;
