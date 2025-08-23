import lodash from 'lodash';
import { serialize as objectToFormData } from 'object-to-formdata';
import { remain } from '@/services/slaStatsControllerService';

export default async ({ processInstanceId, taskDefKey }: any) => {
  const response = await remain(
    objectToFormData({
      caseId: processInstanceId,
      activityKey: taskDefKey,
    })
  );

  if (lodash.isPlainObject(response) && response.success) {
    return response.resultData;
  }

  return null;
};
