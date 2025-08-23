import lodash from 'lodash';
import moment from 'moment';
import { LS, LSKey } from '@/utils/cache';
import { create } from '@/services/navigatorCaseOperationControllerService';
import CaseCategory from 'enum/CaseCategory';
import { eOperationType } from '@/enum/eOperationType';
import { Mode } from '../../Enum';

export default function* (action: any, { call, put }: any) {
  const { userId } = LS.getItem(LSKey.CURRENTUSER) || {};

  const response = yield call(create, {
    activityVariables: {
      applicant: userId,
    },
    caseCategory: CaseCategory.BP_AL_CTG001,
    createLocation: '01',
    operationType: eOperationType.manualCreate,
    submissionChannel: 'M',
    submissionDate: moment().format(),
  });

  if (
    lodash.isPlainObject(response) &&
    response.success &&
    lodash.isPlainObject(response.resultData) &&
    response.resultData?.taskId
  ) {
    const { taskId } = response.resultData;
    yield put({
      type: 'saveState',
      payload: {
        modalTaskId: taskId,
        draftTaskId: taskId,
        mode: Mode.Expansion,
      },
    });
  }
}
