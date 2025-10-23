import lodash from 'lodash';
import { create } from '@/services/navigatorCaseOperationControllerService';
import { eOperationType } from '@/enum/eOperationType';
import moment from 'moment';
import { LS, LSKey } from '@/utils/cache';
import CaseCategory from 'enum/CaseCategory';

export default function* ({ payload }: any, { select, call, put }: any): Generator<any, any, any> {
  const { userId } = LS.getItem(LSKey.CURRENTUSER) || {};
  const { caseCategory } = payload;

  const createParams: any = {
    operationType: eOperationType.manualCreate,
    createLocation: '01',
    caseCategory: caseCategory,
    activityVariables: {
      applicant: userId,
    },
    submissionChannel: 'M',
    submissionDate: moment().format(),
  };

  if (caseCategory === CaseCategory.HK_PAPER_CTG001) {
    createParams.activityVariables.isManual = 'Y';
  } else if (caseCategory === CaseCategory.TH_PAPER_CTG001) {
    createParams.businessCode = 'BIZ003';
  }

  const response = yield call(create, createParams);
  if (lodash.isPlainObject(response) && !!response?.success) {
    return response;
  }
}
