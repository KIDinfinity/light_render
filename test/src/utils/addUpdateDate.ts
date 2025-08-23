import { updateOperationDate } from '@/services/bpmBusinessProcessControllerV2Service.ts';

export default async (processInstanceId) => {
  return await updateOperationDate({ processInstanceId });
};
