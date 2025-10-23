import React from 'react';
import Proptypes from 'prop-types';
import { connect } from 'dva';
import { Modal } from 'antd';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import lodash from 'lodash';
import calculationUtil from '@/utils/calculation';
import HospitalIncomeHeader from './complex/Header/HospitalIncomeHeader';
import Process from './complex/Process';
import classNames from './index.less';

@connect(
  ({ calculationPath: { treatmentCalculationDetail, visible, calculationType, activeModel } }) => ({
    modalTitle: lodash.get(treatmentCalculationDetail, 'modalTitle', ''),
    visible: visible && calculationType === 'hospital_income',
    activeModel,
    treatmentCalculationDetail,
    ...calculationUtil.getAmountsAndAddDefault(treatmentCalculationDetail, [
      'hospitalizationDays',
      'dateOfDischarge',
      'dateOfAdmission',
      'calculatedDays10',
      'enteredDays10',
      'deductibleDays',
      'daysPerIllnessDeduct',
      'accumulatedDeductPerIllness',
      'remainingDeductPerIllness',
      'appliedLimitedDays',
      'appliedLimitedDaysBeforeCalculated',
      'daysPerTreatmentLimit',
      'accumulatedDaysPerTreatment',
      'remainingDaysPerDisability',
      'remainingDaysPerPolicyYear',
      'remainingDaysPerLifetime',
      'daysPerLifetimeLimit',
      'accumulatedDaysPerLifetime',
      'daysPerPolicyYearLimit',
      'accumulatedDaysPerPolicyYear',
      'remainingDaysPerTreatment',
      'calculatedAmount40',
      'enteredAmount40',
      'discountPect',
      'daysPerDisabilityLimit',
      'accumulatedDaysPerDisability',
    ]),
    isShowAppliedLimitedDaysProcess: !!parseInt(
      lodash.get(treatmentCalculationDetail, 'calculatedDays10', 0),
      10
    ),
    isShowDeductibleDaysModel: calculationUtil.checkParamsIsSet(treatmentCalculationDetail, [
      'calculatedDays10',
      'enteredDays10',
      'deductibleDays',
      'enteredDays10',
      'remainingDeductPerIllness',
      'daysPerIllnessDeduct',
      'accumulatedDeductPerIllness',
    ]),
    isShowDaysPerIllnessDeduct:
      lodash.get(treatmentCalculationDetail, 'daysPerIllnessDeduct') !== undefined,
    isShowDaysPerTreatmentLimit:
      lodash.get(treatmentCalculationDetail, 'daysPerTreatmentLimit') !== undefined,
    isShowDaysPerPolicyYearLimit:
      lodash.get(treatmentCalculationDetail, 'daysPerPolicyYearLimit') !== undefined,
    isShowDaysPerDisabilityLimit:
      lodash.get(treatmentCalculationDetail, 'daysPerDisabilityLimit') !== undefined,
    isShowDaysPerLifetimeLimit:
      lodash.get(treatmentCalculationDetail, 'daysPerLifetimeLimit') !== undefined,
  })
)
class HospitalIncomeModal extends React.Component {
  getMessageText = (name) => {
    const modelPath = 'components.calculationPath.HospitalIncomeModal';
    const text = formatMessageApi({ Label_BIZ_Claim: `${modelPath}.${name}` });

    return text;
  };

  render() {
    const {
      visible,
      dispatch,
      activeModel,
      hospitalizationDays,
      dateOfDischarge,
      dateOfAdmission,
      calculatedDays10,
      enteredDays10,
      deductibleDays,
      daysPerIllnessDeduct,
      accumulatedDeductPerIllness,
      remainingDeductPerIllness,
      appliedLimitedDays,
      appliedLimitedDaysBeforeCalculated,
      daysPerTreatmentLimit,
      accumulatedDaysPerTreatment,
      remainingDaysPerDisability,
      remainingDaysPerPolicyYear,
      remainingDaysPerLifetime,
      daysPerLifetimeLimit,
      accumulatedDaysPerLifetime,
      daysPerPolicyYearLimit,
      accumulatedDaysPerPolicyYear,
      remainingDaysPerTreatment,
      calculatedAmount40,
      enteredAmount40,
      discountPect,
      isShowAppliedLimitedDaysProcess,
      isShowDeductibleDaysModel,
      isShowDaysPerIllnessDeduct,
      daysPerDisabilityLimit,
      accumulatedDaysPerDisability,
      isShowDaysPerPolicyYearLimit,
      isShowDaysPerDisabilityLimit,
      isShowDaysPerLifetimeLimit,
      isShowDaysPerTreatmentLimit,
      modalTitle,
      // isShowDiscountPect,
    } = this.props;
    // const appliedLimitDaysHeight =
    //   [
    //     isShowDaysPerPolicyYearLimit,
    //     isShowDaysPerDisabilityLimit,
    //     isShowDaysPerLifetimeLimit,
    //     isShowDaysPerTreatmentLimit,
    //   ].filter(item => item).length *
    //     67.5 +
    //   10;
    const appliedLimitDaysHeight =
      ([
        isShowDaysPerPolicyYearLimit,
        isShowDaysPerDisabilityLimit,
        isShowDaysPerLifetimeLimit,
        isShowDaysPerTreatmentLimit,
      ].filter((item) => item).length +
        1) *
        53 +
      10 -
      37;

    return (
      <div>
        <Modal
          width={1080}
          visible={visible}
          footer={null}
          title={modalTitle}
          mask={false}
          className={classNames.calculationModal}
          onCancel={() => {
            dispatch({
              type: 'calculationPath/closeModal',
            });
          }}
          onOk={() => {
            dispatch({
              type: 'calculationPath/closeModal',
            });
          }}
        >
          <HospitalIncomeHeader />
          {activeModel === 'calculation_amount' && (
            <div className={classNames.levelBox} style={{ marginTop: 40 }}>
              <Process
                title="Applied Discount"
                calculationResult={calculatedAmount40}
                processList={[
                  {
                    title: '',
                    value: enteredAmount40,
                  },
                  {
                    title: 'Discount %',
                    value: `x ${discountPect}%`,
                  },
                ]}
              />
            </div>
          )}
          {activeModel === 'payable_days' && (
            <div>
              <div className={classNames.levelBox} style={{ marginTop: 40 }}>
                <Process
                  title="Hospitalized Days"
                  calculationResult={hospitalizationDays}
                  processList={[
                    {
                      title: 'Discharge Date',
                      value: dateOfDischarge,
                      key: 'dateOfDischarge',
                    },
                    {
                      title: 'Admission Date',
                      value: dateOfAdmission,
                      key: 'dateOfAdmission',
                    },
                  ]}
                />
              </div>
              {isShowDeductibleDaysModel && (
                <div className={classNames.levelBox}>
                  <Process
                    title="Applied Deductible Days"
                    calculationResult={calculatedDays10}
                    processList={[
                      {
                        title: '',
                        value: enteredDays10,
                        key: 'enteredDays10',
                      },
                      {
                        title: 'Deductible Days',
                        value: `- ${deductibleDays}`,
                        key: 'deductibleDays',
                        child: (
                          <Process
                            showHeader={false}
                            showType="min"
                            processList={[
                              {
                                title: '',
                                value: enteredDays10,
                                key: 'enteredDays10',
                              },
                              {
                                title: 'Maximum Deductible Days',
                                value: remainingDeductPerIllness,
                                key: 'remainingDeductPerIllness',
                              },
                            ]}
                          />
                        ),
                      },
                    ]}
                  />
                  <Process
                    showHeader={false}
                    processList={[
                      {
                        title: 'Deductible Days/Illness',
                        value: remainingDeductPerIllness,
                        key: 'remainingDeductPerIllness',
                      },
                    ]}
                    style={{ marginTop: 85 }}
                    showType="max"
                    detailProcess
                  />
                  {isShowDaysPerIllnessDeduct && (
                    <Process
                      showHeader={false}
                      style={{ marginTop: 77 }}
                      processList={[
                        {
                          title: 'Deductible',
                          value: daysPerIllnessDeduct,
                          key: 'daysPerIllnessDeduct',
                        },
                        {
                          title: 'Accumulated',
                          value: `- ${accumulatedDeductPerIllness}`,
                          key: 'accumulatedDeductPerIllness',
                        },
                      ]}
                      detailProcess
                    />
                  )}
                </div>
              )}
              {isShowAppliedLimitedDaysProcess && (
                <div className={classNames.levelBox} style={{ width: 640 }}>
                  <Process
                    title="Applied Limit Days"
                    calculationResult={appliedLimitedDays}
                    showType="min"
                    height={appliedLimitDaysHeight}
                    processList={[
                      {
                        title: '',
                        value: appliedLimitedDaysBeforeCalculated,
                        key: 'appliedLimitedDaysBeforeCalculated',
                      },
                      {
                        title: 'Remaining Days / Treatment',
                        value: remainingDaysPerTreatment,
                        key: 'remainingDaysPerTreatment',
                        hidden: !isShowDaysPerTreatmentLimit,
                      },
                      {
                        title: 'Remaining Days / Disability',
                        value: remainingDaysPerDisability,
                        key: 'treatmentCalculationDetail',
                        hidden: !isShowDaysPerDisabilityLimit,
                      },
                      {
                        title: 'Remaining Days / Policy Year ',
                        value: remainingDaysPerPolicyYear,
                        key: 'remainingDaysPerPolicyYear',
                        hidden: !isShowDaysPerPolicyYearLimit,
                      },
                      {
                        title: 'Remaining Days / Life',
                        value: remainingDaysPerLifetime,
                        key: 'remainingDaysPerLifetime',
                        hidden: !isShowDaysPerLifetimeLimit,
                      },
                    ]}
                  />
                  <div className={classNames.verticalBox} style={{ marginTop: 95 }}>
                    {isShowDaysPerTreatmentLimit && (
                      <Process
                        showHeader={false}
                        detailProcess
                        size="small"
                        processList={[
                          {
                            title: 'Maxnum',
                            value: daysPerTreatmentLimit,
                          },
                          {
                            title: 'Accumulated',
                            value: `- ${accumulatedDaysPerTreatment}`,
                          },
                        ]}
                      />
                    )}
                    {isShowDaysPerDisabilityLimit && (
                      <Process
                        showHeader={false}
                        detailProcess
                        size="small"
                        processList={[
                          {
                            title: 'Maxnum',
                            value: daysPerDisabilityLimit,
                          },
                          {
                            title: 'Accumulated',
                            value: `- ${accumulatedDaysPerDisability}`,
                          },
                        ]}
                      />
                    )}
                    {isShowDaysPerPolicyYearLimit && (
                      <Process
                        showHeader={false}
                        detailProcess
                        size="small"
                        processList={[
                          {
                            title: 'Maxnum',
                            value: daysPerPolicyYearLimit,
                          },
                          {
                            title: 'Accumulated',
                            value: `- ${accumulatedDaysPerPolicyYear}`,
                          },
                        ]}
                      />
                    )}
                    {isShowDaysPerLifetimeLimit && (
                      <Process
                        showHeader={false}
                        detailProcess
                        size="small"
                        processList={[
                          {
                            title: 'Maxnum',
                            value: daysPerLifetimeLimit,
                          },
                          {
                            title: 'Accumulated',
                            value: `- ${accumulatedDaysPerLifetime}`,
                          },
                        ]}
                      />
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </Modal>
      </div>
    );
  }
}

HospitalIncomeModal.propsType = {
  visible: Proptypes.bool.isRequired,
};
export default HospitalIncomeModal;
