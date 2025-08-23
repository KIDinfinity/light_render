import React from 'react';
import lodash from 'lodash';
import { connect } from 'dva';
import Process from '../Process';
import classNames from 'claim/components/CalculationPathModal/index.less';
import calculationUtil from '@/utils/calculation';

@connect(({ calculationPath: { treatmentCalculationDetail } }) => ({
  ...calculationUtil.getAmountsAndAddDefault(treatmentCalculationDetail, [
    'appliedDeductibleAmount',
    'appliedDeductibleAmountBefore',
    'deductibleAmount',
    'maximumDeductibleAmount',
    'remainingDeductibleAmountPerDisability',
    'remainingDeductibleAmountPerPolicyYear',
    'amountPerTreatmentDeduct',
    'accumulatedDeductibleAmountPerTreatment',
    'amountPerDisabilityDeduct',
    'accumulatedDeductibleAmountPerDisability',
    'amountPerPolicyYearDeduct',
    'accumulatedDeductibleAmountPerPolicyYear',
  ]),
  showRemainingDeductibleAmountPerTreatment: calculationUtil.checkParamsIsSet(
    treatmentCalculationDetail,
    ['amountPerPolicyYearDeduct', 'amountPerTreatmentDeduct', 'amountPerDisabilityDeduct']
  ),
  showAmountPerPolicyYearDeduct:
    lodash.get(treatmentCalculationDetail, 'amountPerPolicyYearDeduct') !== undefined,
  isShowmountPerTreatmentDeduct:
    lodash.get(treatmentCalculationDetail, 'amountPerTreatmentDeduct') !== undefined,
  showAmountPerDisabilityDeduct:
    lodash.get(treatmentCalculationDetail, 'amountPerDisabilityDeduct') !== undefined,
}))
class AppliedDeductibleAmountModel extends React.Component {
  render() {
    const {
      appliedDeductibleAmount,
      appliedDeductibleAmountBefore,
      deductibleAmount,
      maximumDeductibleAmount,
      remainingDeductibleAmountPerDisability,
      remainingDeductibleAmountPerPolicyYear,
      amountPerTreatmentDeduct,
      accumulatedDeductibleAmountPerTreatment,
      amountPerDisabilityDeduct,
      accumulatedDeductibleAmountPerDisability,
      amountPerPolicyYearDeduct,
      accumulatedDeductibleAmountPerPolicyYear,
      isShowmountPerTreatmentDeduct,
      showAmountPerDisabilityDeduct,
      showAmountPerPolicyYearDeduct,
      showRemainingDeductibleAmountPerTreatment,
    } = this.props;
    // const height =
    //   (180 / 3) *
    //   [
    //     isShowmountPerTreatmentDeduct,
    //     showAmountPerDisabilityDeduct,
    //     showAmountPerPolicyYearDeduct,
    //   ].filter(item => item).length;
    const height =
      53 *
        [
          isShowmountPerTreatmentDeduct,
          showAmountPerDisabilityDeduct,
          showAmountPerPolicyYearDeduct,
        ].filter((item) => item).length +
      10;

    return (
      <div className={classNames.levelBox}>
        <Process
          title="Applied Deductible Amount"
          calculationResult={appliedDeductibleAmount}
          processList={[
            {
              title: '',
              value: appliedDeductibleAmountBefore,
            },
            {
              title: 'Dedutible Amount',
              value: `- ${deductibleAmount}`,
              child: (
                <Process
                  showHeader={false}
                  showType="min"
                  processList={[
                    {
                      title: '',
                      value: appliedDeductibleAmountBefore,
                      key: 'appliedDeductibleAmountBefore',
                    },
                    {
                      title: 'Remaining Deductible Amount',
                      value: maximumDeductibleAmount,
                      key: 'maximumDeductibleAmount',
                    },
                  ]}
                />
              ),
            },
          ]}
        />
        {showRemainingDeductibleAmountPerTreatment && (
          <Process
            showHeader={false}
            height={height}
            size="big"
            processList={[
              {
                title: 'Remaining Deductible Amount / Treatment',
                value: maximumDeductibleAmount,
                key: 'maximumDeductibleAmount',
                hidden: !isShowmountPerTreatmentDeduct,
              },
              {
                title: 'Remaining Deductible  Amount  / Disability',
                value: remainingDeductibleAmountPerDisability,
                key: 'remainingDeductibleAmountPerDisability',
                hidden: !showAmountPerDisabilityDeduct,
              },
              {
                title: 'Remaining Deductible Amount  /  Policy Year',
                value: remainingDeductibleAmountPerPolicyYear,
                key: 'remainingDeductibleAmountPerPolicyYear',
                hidden: !showAmountPerPolicyYearDeduct,
              },
            ]}
            showType="max"
            detailProcess
            style={{ marginTop: 85 }}
          />
        )}
        <div className={classNames.verticalBox} style={{ marginTop: 95 }}>
          {isShowmountPerTreatmentDeduct && (
            <Process
              size="small"
              detailProcess
              showHeader={false}
              processList={[
                {
                  title: 'Deductible',
                  value: amountPerTreatmentDeduct,
                  key: 'amountPerTreatmentDeduct',
                },
                {
                  title: 'Accumulated',
                  value: `- ${accumulatedDeductibleAmountPerTreatment}`,
                  key: 'accumulatedDeductibleAmountPerTreatment',
                },
              ]}
            />
          )}
          {showAmountPerDisabilityDeduct && (
            <Process
              size="small"
              detailProcess
              showHeader={false}
              processList={[
                {
                  title: 'Deductible',
                  value: amountPerDisabilityDeduct,
                  key: 'amountPerDisabilityDeduct',
                },
                {
                  title: 'Accumulated',
                  value: `- ${accumulatedDeductibleAmountPerDisability}`,
                  key: 'accumulatedDeductibleAmountPerDisability',
                },
              ]}
            />
          )}
          {showAmountPerPolicyYearDeduct && (
            <Process
              size="small"
              detailProcess
              showHeader={false}
              processList={[
                {
                  title: 'Deductible',
                  value: amountPerPolicyYearDeduct,
                  key: 'amountPerPolicyYearDeduct',
                },
                {
                  title: 'Accumulated',
                  value: `- ${accumulatedDeductibleAmountPerPolicyYear}`,
                  key: 'accumulatedDeductibleAmountPerPolicyYear',
                },
              ]}
            />
          )}
        </div>
      </div>
    );
  }
}

export default AppliedDeductibleAmountModel;
