import React from 'react';
import { connect } from 'dva';
import Process from '../Process';
import classNames from 'claim/components/CalculationPathModal/index.less';
import calculationUtil from '@/utils/calculation';

@connect(({ calculationPath: { treatmentCalculationDetail } }) => ({
  ...calculationUtil.getAmountsAndAddDefault(treatmentCalculationDetail, [
    'calculatedAmount10',
    'enteredAmount10',
    'coInsurancePect10',
  ]),
}))
class AppliedCoInsuranceModel extends React.Component {
  render() {
    const { calculatedAmount10, enteredAmount10, coInsurancePect10 } = this.props;

    return (
      <div className={classNames.levelBox}>
        <Process
          title="Applied Co-insurance %"
          calculationResult={calculatedAmount10}
          processList={[
            {
              title: '',
              value: enteredAmount10,
              key: 'enteredAmount10',
            },
            {
              title: 'Co-insurance %',
              value: `x ${parseInt(coInsurancePect10, 10)}%`,
              key: 'coInsurancePect10',
            },
          ]}
        />
      </div>
    );
  }
}

export default AppliedCoInsuranceModel;
