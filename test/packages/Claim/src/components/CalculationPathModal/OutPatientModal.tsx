import React from 'react';
import { connect } from 'dva';
import { Modal } from 'antd';
import lodash from 'lodash';
import classNames from './index.less';
import calculationUtil from '@/utils/calculation';
import OutPatientHeader from './complex/Header/OutPatientHeader';
import InpatientPerHospitalizationHeader from './complex/Header/InpatientPerHospitalizationHeader';
import AppliedDeductibleAmountModel from './complex/SessionModel/AppliedDeductibleAmountModel';
import AppliedCoPayAmountModel from './complex/SessionModel/AppliedCoPayAmountModel';
import AppliedCoInsuranceModel from './complex/SessionModel/AppliedCoInsuranceModel';
import AppliedLimitAmountModel from './complex/SessionModel/AppliedLimitAmountModel';
import RemainingExpenseModel from './complex/SessionModel/RemainingExpenseModel';

@connect(({ calculationPath: { visible, calculationType, treatmentCalculationDetail } }) => ({
  visible:
    (visible && calculationType === 'outpatient') ||
    (visible && calculationType === 'inpatient_per_hospitalization'),
  calculationType,
  modalTitle: lodash.get(treatmentCalculationDetail, 'modalTitle', ''),
  // showProcessDetail: true,
  showProcessDetail:
    (calculationType === 'outpatient' &&
      !!parseInt(lodash.get(treatmentCalculationDetail, 'remainingVisits', 0), 10)) ||
    calculationType === 'inpatient_per_hospitalization',
  showAppliedInsurance: lodash.get(treatmentCalculationDetail, 'coInsurancePect10') !== undefined,
  ...calculationUtil.getAmountsAndAddDefault(treatmentCalculationDetail, [
    'calculationAmount',
    'appliedDeductibleAmount',
    'appliedDeductibleAmountBefore',
    'deductibleAmount',
    'maximumDeductibleAmount',
    'expenseAmount',
    'calculatedExpense',
  ]),
  // 特殊情况判定
  showInpatientPerHospitalizationHeader:
    !calculationUtil.checkParamsIsSet(treatmentCalculationDetail, [
      'remainingVisitsPerDay',
      'remainingVisitsPerDisability',
      'remainingVisitsPerPolicyYear',
    ]) && calculationType === 'outpatient',
  // showRemainingExpenseModel: lodash.get(treatmentCalculationDetail, 'calculationAmount', 0) > 0,
  showRemainingExpenseModel: true,
  showAppliedDeductibleAmountModel: calculationUtil.checkParamsIsSet(treatmentCalculationDetail, [
    'amountPerPolicyYearDeduct',
    'amountPerTreatmentDeduct',
    'amountPerDisabilityDeduct',
  ]),
  showAppliedCoPayAmountModel: calculationUtil.checkParamsIsSet(treatmentCalculationDetail, [
    'calculatedAmount11',
    'enteredAmount11',
    'remainingCopayAmount',
    'copay',
    'accumulatedCopayAmount',
  ]),
  showAppliedLimitAmountModel: calculationUtil.checkParamsIsSet(treatmentCalculationDetail, [
    'amountPerVisitLimit',
    'overallMaximumPerVisitLimit',
    'amountPerDisabilityLimit',
    'overallMaximumPerDisabilityLimit',
    'amountPerPolicyYearLimit',
    'overallMaximumPerPolicyYearLimit',
  ]),
}))
class OutPatientModal extends React.Component {
  UNSAFE_componentWillReceiveProps() {
    const { showInpatientPerHospitalizationHeader, dispatch } = this.props;
    if (showInpatientPerHospitalizationHeader) {
      dispatch({
        type: 'calculationPath/setActiveModelByTemplate',
        payload: {
          template: 'inpatient_per_hospitalization',
        },
      });
    }
  }

  render() {
    const {
      visible,
      dispatch,
      showProcessDetail,
      calculationType,
      showAppliedInsurance,
      showInpatientPerHospitalizationHeader,
      showRemainingExpenseModel,
      showAppliedDeductibleAmountModel,
      showAppliedCoPayAmountModel,
      modalTitle,
      showAppliedLimitAmountModel,
    } = this.props;

    return (
      <Modal
        visible={visible}
        title={modalTitle}
        mask={false}
        footer={null}
        width={1000}
        className={classNames.calculationModal}
        onCancel={() => {
          dispatch({
            type: 'calculationPath/closeModal',
          });
        }}
      >
        {calculationType === 'outpatient' && !showInpatientPerHospitalizationHeader && (
          <OutPatientHeader />
        )}
        {(calculationType === 'inpatient_per_hospitalization' ||
          showInpatientPerHospitalizationHeader) && <InpatientPerHospitalizationHeader />}
        {(showProcessDetail || showInpatientPerHospitalizationHeader) && (
          <div className="outpatientBody">
            {showRemainingExpenseModel && <RemainingExpenseModel />}
            {showAppliedDeductibleAmountModel && <AppliedDeductibleAmountModel />}
            {showAppliedInsurance && <AppliedCoInsuranceModel />}
            {showAppliedCoPayAmountModel && <AppliedCoPayAmountModel />}
            {showAppliedLimitAmountModel && <AppliedLimitAmountModel />}
          </div>
        )}
      </Modal>
    );
  }
}

export default OutPatientModal;
