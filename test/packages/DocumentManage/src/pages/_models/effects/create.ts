import lodash from 'lodash';
import { create } from '@/services/navigatorCaseOperationControllerService';
import handleMessageModal from '@/utils/commonMessage';
import moment from 'moment';

export default function* caseCreate(_: any, { call, select, put }: any) {
  const caseInfo = yield select(({ documentManagement }: any) => documentManagement.caseInfo) || {};
  const {
    caseCategory,
    currentActivityKey: currentActivity,
    modifier: applicant,
    businessNo,
    caseNo,
  } = caseInfo || {};

  const params = {
    caseCategory: 'BP_DD_CTG001',
    submissionDate: moment().format(),
    activityVariables: {
      applicant,
    },
    businessData: {
      relatedCaseInfo: {
        businessNo,
        caseNo,
        caseCategory,
        currentActivity: currentActivity,
      },
    },

    operationType: 'manualCreate',
  };

  const response: any = yield call(create, params);

  if (
    lodash.isPlainObject(response) &&
    !!response.success &&
    lodash.isPlainObject(response.resultData)
  ) {
    yield put({
      type: 'global/visitTaskDetail',
      payload: response?.resultData,
    });
  }
  if(!response.success){
    handleMessageModal(response?.promptMessages);
  }
}
