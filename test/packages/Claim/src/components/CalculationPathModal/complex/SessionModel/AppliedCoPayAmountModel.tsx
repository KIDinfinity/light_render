import React from 'react';
import lodash from 'lodash';
import { connect } from 'dva';
import Process from '../Process';
import classNames from 'claim/components/CalculationPathModal/index.less';
import calculationUtil from '@/utils/calculation';

@connect(({ calculationPath: { treatmentCalculationDetail } }) => ({
  ...calculationUtil.getAmountsAndAddDefault(treatmentCalculationDetail, [
    'calculatedAmount11',
    'enteredAmount11',
    'remainingCopayAmount',
    'copay',
    'accumulatedCopayAmount',
  ]),
  showCopay: lodash.get(treatmentCalculationDetail, 'copay') !== undefined,
}))
class AppliedCoPayAmountModel extends React.Component {
  render() {
    const {
      calculatedAmount11,
      enteredAmount11,
      remainingCopayAmount,
      copay,
      accumulatedCopayAmount,
      showCopay,
    } = this.props;

    return (
      <div className={classNames.levelBox}>
        <Process
          title="Applied Co-pay Amount"
          calculationResult={calculatedAmount11}
          processList={[
            {
              title: '',
              value: enteredAmount11,
              key: 'enteredAmount11',
            },
            {
              title: 'Remaining Co-pay Amount',
              key: 'remainingCopayAmount',
              value: `- ${remainingCopayAmount}`,
            },
          ]}
        />
        {showCopay && (
          <Process
            showHeader={false}
            detailProcess
            size="small"
            processList={[
              {
                title: 'Co-pay Amount',
                value: copay,
                key: 'copay',
              },
              {
                title: 'Accumulated',
                key: 'accumulatedCopayAmount',
                value: `- ${accumulatedCopayAmount}`,
              },
            ]}
            style={{ marginTop: 50 }}
          />
        )}
      </div>
    );
  }
}

export default AppliedCoPayAmountModel;
