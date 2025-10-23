import React from 'react';
import { connect } from 'dva';
import lodash from 'lodash';
import { Modal } from 'antd';
import Process from './complex/Process';
import calculationUtil from '@/utils/calculation';
import InpatientPerDayHeader from './complex/Header/InpatientPerDayHeader';
import classNames from './index.less';
import AppliedDeductibleAmountModel from './complex/SessionModel/AppliedDeductibleAmountModel';
import AppliedCoPayAmountModel from './complex/SessionModel/AppliedCoPayAmountModel';
import AppliedLimitAmountModel from './complex/SessionModel/AppliedLimitAmountModel';

@connect(
  ({ calculationPath: { treatmentCalculationDetail, calculationType, visible, activeModel } }) => ({
    visible: calculationType === 'inpatient_per_day' && visible,
    activeModel,
    treatmentCalculationDetail,
    modalTitle: lodash.get(treatmentCalculationDetail, 'modalTitle', ''),
    ...calculationUtil.getAmountsAndAddDefault(treatmentCalculationDetail, [
      'calculationAmountPerDay',
      'expensePerUnit',
      'calculatedExpensePerDay',
      'payableAmountPerDay002',
      'enteredAmount10',
      'coInsurancePect10',
      'payableAmountPerDay01',
      'enteredAmountPerDay01',
      'remainingAmountPerDay',
      'amountPerDayLimit',
      'accumulatedAmountPerDay',
      'calculationDays',
      'expenseUnit',
      'calculatedDays',
      'appliedLimitDays',
      'appliedLimitDaysBefore',
      'remainingDaysPerDisability',
      'daysPerDisabilityLimit',
      'accumulatedDaysPerDisability',
      'remainingDaysPerPolicyYear',
      'daysPerPolicyYearLimit',
      'accumulatedDaysPerPolicyYear',
      'remainingSharedDaysPerDisability',
      'sharedDaysPerDisabilityLimit',
      'accumulatedSharedDaysPerDisability',
      'enteredAmountPerDay002',
      'payableAmountPerDay002',
      'coInsurancePect002',
    ]),
    showAppliedLimitDaysModel: calculationUtil.checkParamsIsSet(treatmentCalculationDetail, [
      'daysPerDisabilityLimit',
      'daysPerPolicyYearLimit',
      'sharedDaysPerDisabilityLimit',
    ]),
    showAppliedLimitAmount: calculationUtil.checkParamsIsSet(treatmentCalculationDetail, [
      'payableAmountPerDay01',
      'enteredAmountPerDay01',
      'remainingAmountPerDay',
    ]),
    showAppliedCoPayAmountModel: calculationUtil.checkParamsIsSet(treatmentCalculationDetail, [
      'calculatedAmount11',
      'enteredAmount11',
      'remainingCopayAmount',
      'copay',
      'accumulatedCopayAmount',
    ]),
    showAppliedDeductibleAmountModel: calculationUtil.checkParamsIsSet(treatmentCalculationDetail, [
      'amountPerPolicyYearDeduct',
      'amountPerTreatmentDeduct',
      'amountPerDisabilityDeduct',
    ]),
    showAppliedLimitAmountModel: calculationUtil.checkParamsIsSet(treatmentCalculationDetail, [
      'amountPerVisitLimit',
      'overallMaximumPerVisitLimit',
      'amountPerDisabilityLimit',
      'overallMaximumPerDisabilityLimit',
      'amountPerPolicyYearLimit',
      'overallMaximumPerPolicyYearLimit',
    ]),
    showCoInsurancePect10:
      lodash.get(treatmentCalculationDetail, 'coInsurancePect002') !== undefined,
    showDaysPerDisabilityLimit:
      lodash.get(treatmentCalculationDetail, 'daysPerDisabilityLimit') !== undefined,
    showDaysPerPolicyYearLimit:
      lodash.get(treatmentCalculationDetail, 'daysPerPolicyYearLimit') !== undefined,
    showSharedDaysPerDisabilityLimit:
      lodash.get(treatmentCalculationDetail, 'sharedDaysPerDisabilityLimit') !== undefined,
    showAmountPerDayLimit:
      lodash.get(treatmentCalculationDetail, 'amountPerDayLimit') !== undefined,
  })
)
class InpatientPerDayModal extends React.Component {
  render() {
    const {
      visible,
      dispatch,
      calculationAmountPerDay,
      expensePerUnit,
      calculatedExpensePerDay,
      activeModel,
      // enteredAmount10,
      // coInsurancePect10,
      payableAmountPerDay01,
      enteredAmountPerDay01,
      remainingAmountPerDay,
      amountPerDayLimit,
      accumulatedAmountPerDay,
      calculationDays,
      expenseUnit,
      calculatedDays,
      appliedLimitDays,
      appliedLimitDaysBefore,
      remainingDaysPerDisability,
      daysPerDisabilityLimit,
      accumulatedDaysPerDisability,
      remainingDaysPerPolicyYear,
      daysPerPolicyYearLimit,
      accumulatedDaysPerPolicyYear,
      remainingSharedDaysPerDisability,
      sharedDaysPerDisabilityLimit,
      accumulatedSharedDaysPerDisability,
      showAmountPerDayLimit,
      showCoInsurancePect10,
      showDaysPerDisabilityLimit,
      showDaysPerPolicyYearLimit,
      showSharedDaysPerDisabilityLimit,
      showAppliedLimitDaysModel,
      showAppliedLimitAmount,
      showAppliedCoPayAmountModel,
      showAppliedDeductibleAmountModel,
      modalTitle,
      showAppliedLimitAmountModel,
      payableAmountPerDay002,
      enteredAmountPerDay002,
      coInsurancePect002,
    } = this.props;
    const PayableDaysSession = (
      <div>
        <div className={classNames.levelBox}>
          <Process
            title="Remaining Expense / Day"
            isInteger
            calculationResult={calculationAmountPerDay}
            processList={[
              {
                title: 'Expense / Day',
                value: expensePerUnit,
                key: 'expensePerUnit',
              },
              {
                title: 'Calculated Expense / Day',
                value: `- ${calculatedExpensePerDay}`,
                key: 'calculatedExpensePerDay',
              },
            ]}
          />
        </div>
        {showCoInsurancePect10 && (
          <div className={classNames.levelBox}>
            <Process
              title="Applied Co-insurance %"
              calculationResult={payableAmountPerDay002}
              processList={[
                {
                  title: '',
                  value: enteredAmountPerDay002,
                  key: 'payableAmountPerDay002',
                },
                {
                  title: 'Co-insurance %',
                  value: `x ${parseInt(coInsurancePect002, 10)}%`,
                  key: 'coInsurancePect002',
                },
              ]}
            />
          </div>
        )}
        {showAppliedLimitAmount && (
          <div className={classNames.levelBox}>
            <Process
              title="Applied Limit Amount"
              calculationResult={payableAmountPerDay01}
              showType="min"
              height={2 * 53 + 10 - 37}
              processList={[
                {
                  title: '',
                  value: enteredAmountPerDay01,
                  key: 'enteredAmountPerDay01',
                },
                {
                  title: 'Remaining Amount / Day',
                  value: remainingAmountPerDay,
                  hidden: !showAmountPerDayLimit,
                },
              ]}
            />
            {showAmountPerDayLimit && (
              <div className={classNames.verticalBox}>
                <Process
                  detailProcess
                  showHeader={false}
                  size="small"
                  processList={[
                    {
                      title: 'Maximum',
                      value: amountPerDayLimit,
                      key: 'amountPerDayLimit',
                    },
                    {
                      title: 'Accumulated',
                      key: 'accumulatedAmountPerDay',
                      value: `- ${accumulatedAmountPerDay}`,
                    },
                  ]}
                />
              </div>
            )}
          </div>
        )}
      </div>
    );
    // const appliedLimitDaysModelHeight =
    //   (210 / 4) *
    //   ([
    //     showDaysPerDisabilityLimit,
    //     showDaysPerPolicyYearLimit,
    //     showSharedDaysPerDisabilityLimit,
    //   ].filter(item => item).length +
    //     1) + 10;
    const appliedLimitDaysModelHeight =
      53 *
        ([
          showDaysPerDisabilityLimit,
          showDaysPerPolicyYearLimit,
          showSharedDaysPerDisabilityLimit,
        ].filter((item) => item).length +
          1) +
      10 -
      37;
    const CollectionDaysSession = (
      <div>
        <div className={classNames.levelBox}>
          <Process
            calculationResult={calculationDays}
            title="Remaining Days"
            processList={[
              {
                title: 'Expense Days',
                key: 'expenseUnit',
                value: expenseUnit,
              },
              {
                title: 'Calculated Days',
                key: 'calculatedDays',
                value: `- ${calculatedDays}`,
              },
            ]}
          />
        </div>
        {showAppliedLimitDaysModel && (
          <div className={classNames.levelBox}>
            <Process
              height={appliedLimitDaysModelHeight}
              title="Applied Limit Days"
              isInteger
              calculationResult={appliedLimitDays}
              showType="min"
              processList={[
                {
                  key: 'appliedLimitDaysBefore',
                  value: appliedLimitDaysBefore,
                },
                {
                  title: 'Remaining Days / Disability',
                  key: 'remainingDaysPerDisability',
                  value: remainingDaysPerDisability,
                  hidden: !showDaysPerDisabilityLimit,
                },
                {
                  title: 'Remaining Days / Policy Year',
                  key: 'remainingDaysPerPolicyYear',
                  value: remainingDaysPerPolicyYear,
                  hidden: !showDaysPerPolicyYearLimit,
                },
                {
                  title: 'Remaining Shared Days / Disability',
                  key: 'remainingSharedDaysPerDisability',
                  value: remainingSharedDaysPerDisability,
                  hidden: !showSharedDaysPerDisabilityLimit,
                },
              ]}
            />
            <div className={classNames.verticalBox}>
              {showDaysPerDisabilityLimit && (
                <Process
                  size="small"
                  showHeader={false}
                  detailProcess
                  processList={[
                    {
                      title: 'Maximum',
                      value: daysPerDisabilityLimit,
                    },
                    {
                      title: 'Accumulated',
                      value: `- ${accumulatedDaysPerDisability}`,
                      key: 'accumulatedDaysPerDisability',
                    },
                  ]}
                />
              )}
              {showDaysPerPolicyYearLimit && (
                <Process
                  size="small"
                  showHeader={false}
                  detailProcess
                  processList={[
                    {
                      title: 'Maximum',
                      value: daysPerPolicyYearLimit,
                      key: 'daysPerPolicyYearLimit',
                    },
                    {
                      title: 'Accumulated',
                      key: 'accumulatedDaysPerPolicyYear',
                      value: `- ${accumulatedDaysPerPolicyYear}`,
                    },
                  ]}
                />
              )}
              {showSharedDaysPerDisabilityLimit && (
                <Process
                  size="small"
                  showHeader={false}
                  detailProcess
                  processList={[
                    {
                      title: 'Maximum',
                      value: sharedDaysPerDisabilityLimit,
                      key: 'sharedDaysPerDisabilityLimit',
                    },
                    {
                      title: 'Accumulated',
                      value: `- ${accumulatedSharedDaysPerDisability}`,
                      key: 'accumulatedSharedDaysPerDisability',
                    },
                  ]}
                />
              )}
            </div>
          </div>
        )}
      </div>
    );
    const CalculationAmountSession = (
      <div>
        {showAppliedDeductibleAmountModel && <AppliedDeductibleAmountModel />}
        {showAppliedCoPayAmountModel && <AppliedCoPayAmountModel />}
        {showAppliedLimitAmountModel && <AppliedLimitAmountModel />}
      </div>
    );

    return (
      <Modal
        visible={visible}
        title={modalTitle}
        width={1000}
        mask={false}
        footer={null}
        className={classNames.calculationModal}
        onCancel={() => {
          dispatch({
            type: 'calculationPath/closeModal',
          });
        }}
      >
        <InpatientPerDayHeader />
        {activeModel === 'payableAmountPerDay' && PayableDaysSession}
        {activeModel === 'Calculation_Days' && CollectionDaysSession}
        {activeModel === 'Calculation_Amount' && CalculationAmountSession}
      </Modal>
    );
  }
}

export default InpatientPerDayModal;
