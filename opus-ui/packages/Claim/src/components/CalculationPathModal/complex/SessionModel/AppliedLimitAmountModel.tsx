import React from 'react';
import { connect } from 'dva';
import lodash from 'lodash';
import Process from '../Process';
import classNames from 'claim/components/CalculationPathModal/index.less';
import calculationUtil from '@/utils/calculation';
import { precisionEnsure } from '@/utils/precisionUtils';

@connect(({ calculationPath: { treatmentCalculationDetail } }) => ({
  ...calculationUtil.getAmountsAndAddDefault(treatmentCalculationDetail, [
    'appliedLimitAmount',
    'appliedLimitAmountBefore',
    'remainingAmountPerVisit',
    'remainingOverallAmountPerVisit',
    'remainingAmountPerDisability',
    'remainingOverallAmountPerDisability',
    'remainingAmountPerPolicyYear',
    'remainingOverallAmountPerPolicyYear',
    'amountPerVisitLimit',
    'accumulatedAmountPerVisit',
    'overallMaximumPerVisitLimit',
    'accumulatedOverallAmountPerVisit',
    'amountPerDisabilityLimit',
    'accumulatedAmountPerDisability',
    'overallMaximumPerDisabilityLimit',
    'accumulatedOverallAmountPerDisability',
    'amountPerPolicyYearLimit',
    'accumulatedAmountPerPolicyYear',
    'overallMaximumPerPolicyYearLimit',
    'accumulatedOverallAmountPerPolicyYear',
  ]),
  showAmountPerVisitLimit:
    lodash.get(treatmentCalculationDetail, 'amountPerVisitLimit') !== undefined,
  showOverallMaximumPerVisitLimit:
    lodash.get(treatmentCalculationDetail, 'overallMaximumPerVisitLimit') !== undefined,
  showAmountPerDisabilityLimit:
    lodash.get(treatmentCalculationDetail, 'amountPerDisabilityLimit') !== undefined,
  showOverallMaximumPerDisabilityLimit:
    lodash.get(treatmentCalculationDetail, 'overallMaximumPerDisabilityLimit') !== undefined,
  showAmountPerPolicyYearLimit:
    lodash.get(treatmentCalculationDetail, 'amountPerPolicyYearLimit') !== undefined,
  showoverallMaximumPerPolicyYearLimit:
    lodash.get(treatmentCalculationDetail, 'overallMaximumPerPolicyYearLimit') !== undefined,
  showAppliedLimitAmount: calculationUtil.checkParamsIsSet(treatmentCalculationDetail, [
    'amountPerVisitLimit',
    'overallMaximumPerVisitLimit',
    'amountPerDisabilityLimit',
    'overallMaximumPerDisabilityLimit',
    'amountPerPolicyYearLimit',
    'overallMaximumPerPolicyYearLimit',
  ]),
}))
class AppliedLimitAmountModel extends React.Component {
  render() {
    const {
      appliedLimitAmount,
      appliedLimitAmountBefore,
      remainingAmountPerVisit,
      remainingOverallAmountPerVisit,
      remainingAmountPerDisability,
      remainingOverallAmountPerDisability,
      remainingAmountPerPolicyYear,
      remainingOverallAmountPerPolicyYear,
      amountPerVisitLimit,
      accumulatedAmountPerVisit,
      overallMaximumPerVisitLimit,
      accumulatedOverallAmountPerVisit,
      amountPerDisabilityLimit,
      accumulatedAmountPerDisability,
      overallMaximumPerDisabilityLimit,
      accumulatedOverallAmountPerDisability,
      amountPerPolicyYearLimit,
      accumulatedAmountPerPolicyYear,
      overallMaximumPerPolicyYearLimit,
      accumulatedOverallAmountPerPolicyYear,
      showOverallMaximumPerVisitLimit,
      showAmountPerVisitLimit,
      showAmountPerDisabilityLimit,
      showOverallMaximumPerDisabilityLimit,
      showAmountPerPolicyYearLimit,
      showoverallMaximumPerPolicyYearLimit,
    } = this.props;
    // const height =
    //   ([
    //     showOverallMaximumPerVisitLimit,
    //     showAmountPerVisitLimit,
    //     showAmountPerDisabilityLimit,
    //     showOverallMaximumPerDisabilityLimit,
    //     showAmountPerPolicyYearLimit,
    //     showoverallMaximumPerPolicyYearLimit,
    //   ].filter(item => item).length +
    //     1) *
    //     (370 / 7) +
    //   10;
    const height =
      ([
        showOverallMaximumPerVisitLimit,
        showAmountPerVisitLimit,
        showAmountPerDisabilityLimit,
        showOverallMaximumPerDisabilityLimit,
        showAmountPerPolicyYearLimit,
        showoverallMaximumPerPolicyYearLimit,
      ].filter((item) => item).length +
        1) *
        53 +
      10 -
      37;

    return (
      <div className={classNames.levelBox}>
        <Process
          title="Applied Limit  Amount"
          calculationResult={appliedLimitAmount}
          showType="min"
          height={height}
          processList={[
            {
              title: '',
              key: 'appliedLimitAmountBefore',
              value: precisionEnsure(appliedLimitAmountBefore),
            },
            {
              title: 'Remaining Amount / Treatment',
              value: remainingAmountPerVisit,
              key: 'remainingAmountPerVisit',
              hidden: !showAmountPerVisitLimit,
            },
            {
              title: 'Remaining Overall Amount / Treatment',
              value: remainingOverallAmountPerVisit,
              key: 'remainingOverallAmountPerVisit',
              hidden: !showOverallMaximumPerVisitLimit,
            },
            {
              title: 'Remaining Amount / Disability',
              key: 'remainingAmountPerDisability',
              value: remainingAmountPerDisability,
              hidden: !showAmountPerDisabilityLimit,
            },
            {
              title: 'Remaining Overall Amount / Disability',
              value: remainingOverallAmountPerDisability,
              key: 'remainingOverallAmountPerDisability',
              hidden: !showOverallMaximumPerDisabilityLimit,
            },
            {
              title: 'Remaining Amount / Policy Year',
              value: remainingAmountPerPolicyYear,
              key: 'remainingAmountPerPolicyYear',
              hidden: !showAmountPerPolicyYearLimit,
            },
            {
              title: 'Remaining Overall Amount / Policy Year',
              key: 'remainingOverallAmountPerPolicyYear',
              value: remainingOverallAmountPerPolicyYear,
              hidden: !showoverallMaximumPerPolicyYearLimit,
            },
          ]}
        />
        <div className={classNames.verticalBox}>
          {showAmountPerVisitLimit && (
            <Process
              detailProcess
              showHeader={false}
              size="small"
              processList={[
                {
                  title: 'Maximum',
                  key: 'amountPerVisitLimit',
                  value: amountPerVisitLimit,
                },
                {
                  title: 'Accumulated',
                  key: 'accumulatedAmountPerVisit',
                  value: `- ${accumulatedAmountPerVisit}`,
                },
              ]}
            />
          )}
          {showOverallMaximumPerVisitLimit && (
            <Process
              detailProcess
              showHeader={false}
              size="small"
              processList={[
                {
                  title: 'Maximum',
                  key: 'overallMaximumPerVisitLimit',
                  value: overallMaximumPerVisitLimit,
                },
                {
                  title: 'Accumulated',
                  key: 'accumulatedOverallAmountPerVisit',
                  value: `- ${accumulatedOverallAmountPerVisit}`,
                },
              ]}
            />
          )}
          {showAmountPerDisabilityLimit && (
            <Process
              detailProcess
              showHeader={false}
              size="small"
              processList={[
                {
                  title: 'Maximum',
                  key: 'amountPerDisabilityLimit',
                  value: amountPerDisabilityLimit,
                },
                {
                  title: 'Accumulated',
                  key: 'accumulatedAmountPerDisability',
                  value: `- ${accumulatedAmountPerDisability}`,
                },
              ]}
            />
          )}
          {showOverallMaximumPerDisabilityLimit && (
            <Process
              detailProcess
              showHeader={false}
              size="small"
              processList={[
                {
                  title: 'Maximum',
                  value: overallMaximumPerDisabilityLimit,
                  key: 'overallMaximumPerDisabilityLimit',
                },
                {
                  title: 'Accumulated',
                  key: 'accumulatedOverallAmountPerDisability',
                  value: `- ${accumulatedOverallAmountPerDisability}`,
                },
              ]}
            />
          )}
          {showAmountPerPolicyYearLimit && (
            <Process
              detailProcess
              showHeader={false}
              size="small"
              processList={[
                {
                  title: 'Maximum',
                  value: amountPerPolicyYearLimit,
                  key: 'amountPerPolicyYearLimit',
                },
                {
                  title: 'Accumulated',
                  value: `- ${accumulatedAmountPerPolicyYear}`,
                  key: 'accumulatedAmountPerPolicyYear',
                },
              ]}
            />
          )}
          {showoverallMaximumPerPolicyYearLimit && (
            <Process
              detailProcess
              showHeader={false}
              size="small"
              processList={[
                {
                  title: 'Maximum',
                  key: 'overallMaximumPerPolicyYearLimit',
                  value: overallMaximumPerPolicyYearLimit,
                },
                {
                  title: 'Accumulated',
                  key: 'accumulatedOverallAmountPerPolicyYear',
                  value: `- ${accumulatedOverallAmountPerPolicyYear}`,
                },
              ]}
            />
          )}
        </div>
      </div>
    );
  }
}

export default AppliedLimitAmountModel;
