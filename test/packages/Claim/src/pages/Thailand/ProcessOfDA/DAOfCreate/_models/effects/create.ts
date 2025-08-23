import { denormalizeClaimData } from '@/utils/claimUtils';
import { formUtils } from 'basic/components/Form';
import navigatorCaseOperationControllerService from '@/services/navigatorCaseOperationControllerService';
import claimCreateValidationOperationControllerService from '@/services/claimCreateValidationOperationControllerService';
import lodash from 'lodash';
import { CREATEHBINTERFACE } from '@/utils/claimConstant';
import { eOperationType } from '@/enum/eOperationType';
import { LS, LSKey } from '@/utils/cache';
import { enumCaseCategory } from '../dto';

const listIterator = (target: any) => {
  lodash.forEach(target, (item) => {
    const temp = item;
    lodash.forEach(item, (value, key) => {
      switch (key) {
        case 'id':
          temp.id = '';
          break;
        case 'incidentId':
          temp.incidentId = '';
          break;
        default:
          break;
      }
      if (lodash.isArray(value)) {
        listIterator(value);
      }
    });
  });
};

const clearId = (source: any) => {
  const target = lodash.cloneDeep(source);
  target.id = '';
  target.insured.id = '';
  listIterator(target.payeeList);
  listIterator(target.incidentList);
  return target;
};

export default function* create({ payload }: any, { call, select }: any) {
  const { claimProcessData, claimEntities } = yield select(
    (state: any) => state.daProcessController
  );
  const stateUserId = yield select(({ user }: any) => user.currentUser?.userId);
  const { variables } = payload;
  const currentUser = LS.getItem(LSKey.CURRENTUSER);
  const userId = lodash.get(currentUser, 'userId', '') || stateUserId;
  const denormalizedData = denormalizeClaimData(claimProcessData, claimEntities);
  const cleanDenormalizedData = formUtils.cleanValidateData(denormalizedData);
  const businessData = clearId(cleanDenormalizedData);
  if (businessData.caseCategory === enumCaseCategory.IAPC) {
    lodash.set(businessData, 'incidentList[0].treatmentList[0].invoiceList', []);
  }
  const submitData = {
    ...CREATEHBINTERFACE,
    caseCategory: businessData.caseCategory,
    submissionDate: businessData.submissionDate,
    submissionChannel: businessData.submissionChannel,
    activityVariables: { applicant: userId },
    operationType: eOperationType.create,
    businessData,
  };
  if (submitData.caseCategory === enumCaseCategory.TH_IHB_CTG01) {
    lodash.set(businessData, 'insured', null);
    submitData.businessData = {
      claimCase: businessData,
      hospitalBillCoverPage: {
        ...businessData.hospitalBillCoverPage,
        receivedDate: businessData.hospitalBillCoverPage.scanDate,
      },
    };
  }
  if (submitData.caseCategory === enumCaseCategory.TH_GC_CTG02) {
    businessData.variables = variables;
  }
  const validateRepose = yield call(
    claimCreateValidationOperationControllerService.createClaimCaseValidate,
    submitData
  );
  if (!validateRepose?.success) {
    return;
  }
  const response = yield call(navigatorCaseOperationControllerService.create, submitData);
  return response;
}
