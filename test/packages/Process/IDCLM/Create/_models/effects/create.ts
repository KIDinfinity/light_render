import { denormalizeClaimData } from '@/utils/claimUtils';
import { formUtils } from 'basic/components/Form';
import navigatorCaseOperationControllerService from '@/services/navigatorCaseOperationControllerService';
import lodash from 'lodash';
import { CREATEINTERFACE } from '@/utils/claimConstant';

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
  const { caseCategory } = payload;
  const { claimProcessData, claimEntities } = yield select((state) => state.idProcessController);
  const user = yield select((state) => state.user);
  const userId = lodash.get(user, 'currentUser.userId', '');
  const denormalizedData = denormalizeClaimData(claimProcessData, claimEntities);
  const cleanDenormalizedData = formUtils.cleanValidateData(denormalizedData);
  const submitData = clearId(cleanDenormalizedData);

  const response = yield call(navigatorCaseOperationControllerService.create, {
    ...CREATEINTERFACE,
    caseCategory: submitData?.caseCategory,
    submissionChannel: submitData?.submissionChannel,
    submissionDate: submitData?.submissionDate,
    activityVariables: {
      applicant: userId,
    },
    businessData: submitData
  });
  return response;
}
