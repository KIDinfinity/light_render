import lodash from 'lodash';
import calculationUtil from '@/utils/calculation';
import { multiply } from '@/utils/precisionUtils';

export default {
  namespace: 'calculationPath',
  state: {
    visible: false,
    calculationType: '',
    activeModel: '',
    treatmentCalculationDetail: {},
  },
  effects: {
    *openHospitalIncomeModal({ payload }, { put }) {
      const benefitItemName = lodash.get(payload, 'benefitItemName', '');
      const process = lodash.get(payload, 'detail.process', []);
      const systemCalculationAmount = lodash.get(payload, 'detail.systemCalculationAmount', 0);
      const payableDays = lodash.get(payload, 'detail.payableDays', 0) || 0;
      const payableAmountPerDay = lodash.get(payload, 'detail.payableAmountPerDay', 0);
      const payablePerDay = lodash.get(payload, 'detail.payablePerDay', 0);
      const modalTitle = `Calculation Step of ${benefitItemName}`;
      const treatmentCalculationDetail = {
        systemCalculationAmount,
        payableDays,
        payableAmountPerDay,
        payablePerDay,
        benefitItemName,
        modalTitle,
      };
      process.forEach((item) => {
        treatmentCalculationDetail[item.pointCode] = item.pointValue;
      });

      const appliedLimitedDays = calculationUtil.getMinProperty(treatmentCalculationDetail, [
        'calculatedDays10',
        'calculatedDays11',
        'calculatedDays20',
        'calculatedDays30',
      ]);
      lodash.set(treatmentCalculationDetail, 'appliedLimitedDays', appliedLimitedDays);
      // const appliedLimitedDaysBeforeCalculated = calculationUtil.getMaxProperty(
      //   treatmentCalculationDetail,
      //   ['enteredDays10', 'enteredDays11', 'enteredDays20', 'enteredDays30']
      // );
      // TODO: 暂时改为取最小值
      const appliedLimitedDaysBeforeCalculated = calculationUtil.getMinProperty(
        treatmentCalculationDetail,
        ['enteredDays10', 'enteredDays11', 'enteredDays20', 'enteredDays30']
      );
      lodash.set(
        treatmentCalculationDetail,
        'appliedLimitedDaysBeforeCalculated',
        appliedLimitedDaysBeforeCalculated
      );
      // outpatient && inpatient_per_hospitalization
      const appliedDeductibleAmount = calculationUtil.getMaxProperty(
        treatmentCalculationDetail,
        ['calculatedAmount07', 'calculatedAmount08', 'calculatedAmount09'],
        true
      );
      lodash.set(treatmentCalculationDetail, 'appliedDeductibleAmount', appliedDeductibleAmount);
      const appliedDeductibleAmountBefore = calculationUtil.getMaxProperty(
        treatmentCalculationDetail,
        ['enteredAmount07', 'enteredAmount08', 'enteredAmount09'],
        true
      );
      lodash.set(
        treatmentCalculationDetail,
        'appliedDeductibleAmountBefore',
        appliedDeductibleAmountBefore
      );
      const maximumDeductibleAmount = calculationUtil.getMaxProperty(
        treatmentCalculationDetail,
        [
          'remainingDeductibleAmountPerTreatment',
          'remainingDeductibleAmountPerDisability',
          'remainingDeductibleAmountPerPolicyYear',
        ],
        true
      );
      lodash.set(treatmentCalculationDetail, 'maximumDeductibleAmount', maximumDeductibleAmount);
      const appliedLimitAmount = calculationUtil.getMinProperty(
        treatmentCalculationDetail,
        [
          'calculatedAmount12',
          'calculatedAmount13',
          'calculatedAmount14',
          'calculatedAmount15',
          'calculatedAmount16',
          'calculatedAmount17',
        ],
        true
      );
      lodash.set(treatmentCalculationDetail, 'appliedLimitAmount', appliedLimitAmount);
      const appliedLimitAmountBefore = calculationUtil.getMaxProperty(
        treatmentCalculationDetail,
        [
          'enteredAmount12',
          'enteredAmount13',
          'enteredAmount14',
          'enteredAmount15',
          'enteredAmount16',
          'enteredAmount17',
        ],
        true
      );
      lodash.set(treatmentCalculationDetail, 'appliedLimitAmountBefore', appliedLimitAmountBefore);
      const remainingVisits = calculationUtil.getMinProperty(
        treatmentCalculationDetail,
        ['remainingVisitsPerDay', 'remainingVisitsPerDisability', 'remainingVisitsPerPolicyYear'],
        true
      );
      lodash.set(treatmentCalculationDetail, 'remainingVisits', remainingVisits);

      const remainingExpense = multiply(payablePerDay, payableDays);
      lodash.set(treatmentCalculationDetail, 'remainingExpense', remainingExpense);
      // inpatient per day
      const appliedLimitDays = calculationUtil.getMinProperty(treatmentCalculationDetail, [
        'calculatedDays021',
        'calculatedDays022',
        'calculatedDays03',
      ]);
      lodash.set(treatmentCalculationDetail, 'appliedLimitDays', appliedLimitDays);
      const appliedLimitDaysBefore = calculationUtil.getMaxProperty(treatmentCalculationDetail, [
        'enteredDays021',
        'enteredDays022',
        'enteredDays03',
      ]);
      lodash.set(treatmentCalculationDetail, 'appliedLimitDaysBefore', appliedLimitDaysBefore);
      const template = lodash.get(treatmentCalculationDetail, 'template');
      yield put({
        type: 'setTreatmentCalculationDetail',
        payload: {
          treatmentCalculationDetail,
        },
      });
      yield put({
        type: 'openModal',
        payload: {
          calculationType: template,
        },
      });
      yield put({
        type: 'setActiveModelByTemplate',
        payload: {
          template,
        },
      });
      // const deafultActiveModelSet = {
      //   hospital_income: 'payable_days',
      //   inpatient_per_hospitalization: 'Calculation_Amount',
      //   inpatient_per_day: 'payableAmountPerDay',
      // };
      // yield put({
      //   type: 'setActiveModel',
      //   payload: {
      //     activeModel: deafultActiveModelSet[template],
      //   },
      // });
    },
    *openModal({ payload }, { put }) {
      const calculationType = lodash.get(payload, 'calculationType', '');
      yield put({
        type: 'setCalculationType',
        payload: {
          calculationType,
        },
      });
      yield put({
        type: 'toggleModal',
        payload: {
          visible: true,
        },
      });
    },
    *closeModal(_, { put }) {
      yield put({
        type: 'setCalculationType',
        payload: {
          calculationType: ',',
        },
      });
      yield put({
        type: 'toggleModal',
        payload: {
          visible: false,
        },
      });
    },
  },
  reducers: {
    setActiveModelByTemplate(state, action) {
      const { payload } = action;
      const template = lodash.get(payload, 'template');
      const deafultActiveModelSet = {
        hospital_income: 'payable_days',
        inpatient_per_hospitalization: 'Calculation_Amount',
        inpatient_per_day: 'payableAmountPerDay',
        outpatient: 'Calculation_Amount',
      };
      const activeModel = deafultActiveModelSet[template];

      return {
        ...state,
        activeModel,
      };
    },
    setTreatmentCalculationDetail(state, action) {
      const treatmentCalculationDetail = lodash.get(
        action,
        'payload.treatmentCalculationDetail',
        {}
      );

      return {
        ...state,
        treatmentCalculationDetail,
      };
    },
    setCalculationType(state, action) {
      const calculationType = lodash.get(action, 'payload.calculationType', '');

      return {
        ...state,
        calculationType,
      };
    },
    toggleModal(state, action) {
      const visible = lodash.get(action, 'payload.visible', false);

      return {
        ...state,
        visible,
      };
    },
    setActiveModel(state, action) {
      const activeModel = lodash.get(action, 'payload.activeModel');

      return {
        ...state,
        activeModel,
      };
    },
  },
};
