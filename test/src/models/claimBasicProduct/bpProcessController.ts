import lodash from 'lodash';
import navigatorCaseOperationControllerService from '@/services/navigatorCaseOperationControllerService';
import { formUtils } from 'basic/components/Form';
import { CREATEINTERFACE } from '@/utils/claimConstant';

export default {
  namespace: 'bpProcessController',

  state: {
    claimProcessData: {
      caseSource: '',
      caseCategory: 'Claim Request',
      claimNo: '',
      closeDate: '',
      creator: '',
      deleted: 0,
      gmtCreate: '',
      gmtModified: '',
      id: '',
      incidentList: [],
      insured: {
        address: 'Chang Xing Street',
        claimNo: '',
        creator: '',
        currentState: '',
        dateOfBirth: '1989-12-31T16:00:00.000+0000',
        dateTimeOfDeath: '',
        deleted: 0,
        email: '84232274@outlook.com',
        firstName: 'Jerry',
        gender: 'M',
        gmtCreate: '',
        gmtModified: '',
        id: '',
        identityNo: 'J******1',
        identityType: 'I',
        insuredId: '',
        modifier: '',
        nationality: 'CN',
        occupation: '002',
        phoneNo: '13758458323',
        surname: 'Sirrs',
        transId: '',
      },
      modifier: '',
      processInstanceId: '',
      status: '',
      submissionChannel: 'W',
      submissionDate: '2019-08-21T16:00:00.000+0000',
      transId: '',
      variables: {},
    },
  },

  effects: {
    *create({ payload }: any, { call }: any) {
      const response = yield call(navigatorCaseOperationControllerService.create, {
        ...CREATEINTERFACE,
        caseCategory: payload?.caseCategory,
        submissionChannel: payload?.submissionChannel,
        submissionDate: payload?.submissionDate,
        businessData: payload,
      });

      return {
        ...response,
        resultData: {
          ...response?.resultData,
        },
      };
    },
  },

  reducers: {
    saveCaseInfo(state, action) {
      const dataSource = lodash.cloneDeep(state.claimProcessData);
      const { changedFields } = action.payload;
      let finalChangedFields = { ...changedFields };
      if (lodash.has(changedFields, 'submissionDate')) {
        finalChangedFields = formUtils.onFieldsChangeOfDateOrgin(finalChangedFields, [
          'submissionDate',
        ]);
      }
      const finalData = {
        ...dataSource,
        ...finalChangedFields,
      };

      return {
        ...state,
        claimProcessData: finalData,
      };
    },
    saveInsured(state, action) {
      const dataSource = lodash.cloneDeep(state.claimProcessData);
      const { changedFields } = action.payload;

      const finalData = {
        ...dataSource,
        insured: {
          ...dataSource?.insured,
          ...changedFields,
        },
      };

      return {
        ...state,
        claimProcessData: finalData,
      };
    },
  },
};
