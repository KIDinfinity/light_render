import { serialize as objectToFormData } from 'object-to-formdata';
import lodash from 'lodash';
import bpmProcessTaskService from '@/services/bpmProcessTaskService';

export default function* getLastTask({ payload }: any, { call }: any) {
  const { claimNo, caseCategory } = payload;

  if (claimNo && caseCategory) {
    const respone = yield call(
      bpmProcessTaskService.getLastTask,
      objectToFormData({ claimNo, caseCategory })
    );

    if (respone && respone.success) {
      const { id } = lodash.pick(respone.resultData, ['id']);
      return id;
    }

    return null;
  }
}
