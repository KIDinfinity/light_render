import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { selsctColor } from '@/utils/claimUtils';
import { colorsPond } from '@/utils/constant';
import getPolicyYearValue from 'process/HKCLM/ManualAssessment/_models/functions/getPolicyYearValue';

export default {
  namespace: 'formCommonController',

  state: {
    forms: {},
    submited: false,
    validating: false,
    policyBackgrounds: {},
    errorRefs: {},
  },
  effects: {
    *getErrorRefs(_, { select }) {
      const errorRefs = yield select((state) => state.formCommonController.errorRefs);
      return errorRefs;
    },
  },
  reducers: {
    handleValidating(state) {
      state.validating = true;
      return state;
    },
    handleUnValidating(state) {
      state.validating = false;
      return state;
    },
    handleSubmited(state) {
      state.submited = true;
      return state;
    },
    handleUnSubmited(state) {
      state.submited = false;
      return state;
    },
    saveErrorRef(state, action) {
      const { errorRefs } = state;
      const { ref, errorRefId } = action.payload;
      if (!errorRefs[errorRefId]) errorRefs[errorRefId] = ref;
      return state;
    },
    removeErrorRef(state, action) {
      const { errorRefs } = state;
      const { errorRefId } = action.payload;
      if (errorRefs[errorRefId]) delete errorRefs[errorRefId];
      return state;
    },
    registerForm(state, action) {
      const { forms } = state;
      const { form, formId, section } = action.payload;
      const newForms = formUtils.registerForm(forms, form, formId, section, false);
      state.forms = forms || newForms;

      return state;
    },
    unRegisterForm(state, action) {
      const { forms } = state;
      const { form, formId } = action.payload;
      const newForms = formUtils.unRegisterForm(forms, form, formId, false);

      state.forms = forms || newForms;
      return state;
    },
    clearForm(state) {
      state.forms = null;
      if (!lodash.isEmpty(state.policyBackgrounds)) state.policyBackgrounds = {};
      return state;
    },

    saveFormListBGColorByPolicyNoPolicyYear(state, action) {
      const { claimPayableList, apIncidentDecisionList } = action.payload;
      const policyBackgrounds = {};
      const target =
        lodash.compact(claimPayableList).length > 0
          ? lodash.compact(claimPayableList)
          : lodash.compact(apIncidentDecisionList);

      const policyKey = lodash.compact(claimPayableList).length > 0 ? 'policyNo' : 'policyId';
      lodash.forEach(target, (item: any) => {
        const BackgroundsKey = `${item[policyKey]}${getPolicyYearValue(item)}`;
        if (item[policyKey] && !policyBackgrounds[BackgroundsKey]) {
          policyBackgrounds[BackgroundsKey] = selsctColor(policyBackgrounds, colorsPond);
        }
      });
      return {
        ...state,
        policyBackgrounds,
      };
    },

    saveFormListBGColor(state, action) {
      const { claimPayableList, apIncidentDecisionList } = action.payload;
      const policyBackgrounds = {};
      const target =
        lodash.compact(claimPayableList).length > 0
          ? lodash.compact(claimPayableList)
          : lodash.compact(apIncidentDecisionList);
      const policyKey = lodash.compact(claimPayableList).length > 0 ? 'policyNo' : 'policyId';
      lodash.forEach(target, (item: any) => {
        if (item[policyKey] && !policyBackgrounds[item[policyKey]]) {
          policyBackgrounds[item[policyKey]] = selsctColor(policyBackgrounds, colorsPond);
        }
      });
      return {
        ...state,
        policyBackgrounds,
      };
    },

    addPayableItemBGColor(state, action) {
      const { policyBackgrounds } = state;
      const { policyNo } = action.payload;
      // 添加保单时，判断修改后的保单有没有对应的背景色，没有则新增，有则无操作

      if (!policyBackgrounds[`${policyNo}`]) {
        const color = selsctColor(policyBackgrounds, colorsPond);
        policyBackgrounds[`${policyNo}`] = color;
      }

      return state;
    },
    saveFormItemBGColor(state, action) {
      const { policyBackgrounds } = state;
      const { changedFields } = action.payload;
      const fieldsArray = Object.entries(changedFields);
      // 修改保单号时，判断修改后的保单有没有对应的背景色，没有则新增，有则无操作
      if (fieldsArray.length === 1) {
        const [name, { value }] = fieldsArray[0];
        if (name === 'policyNo' && !policyBackgrounds[`${value}`]) {
          const color = selsctColor(policyBackgrounds, colorsPond);

          policyBackgrounds[`${value}`] = color;
        }
      }

      return state;
    },
    saveDecisionsBGColor(state, action) {
      const { apIncidentDecisionList } = action.payload;
      const policyBackgrounds = {};
      lodash.forEach(lodash.compact(apIncidentDecisionList), (item) => {
        if (item.policyId && !policyBackgrounds[item.policyId]) {
          policyBackgrounds[item.policyId] = selsctColor(policyBackgrounds, colorsPond);
        }
      });

      return {
        ...state,
        policyBackgrounds,
      };
    },
    saveDecisionBGColor(state, action) {
      const { policyBackgrounds } = state;
      const { changedFields } = action.payload;
      const fieldsArray = Object.entries(changedFields);
      // 修改保单号时，判断修改后的保单有没有对应的背景色，没有则新增，有则无操作
      if (fieldsArray.length === 1) {
        const [name, { value }] = fieldsArray[0];
        if (name === 'policyId' && !policyBackgrounds[`${value}`]) {
          const color = selsctColor(policyBackgrounds, colorsPond);

          policyBackgrounds[`${value}`] = color;
        }
      }

      return state;
    },
  },
};
