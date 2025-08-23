import { create } from '@/services/bpmUnknownDocFlowControllerService';
import{ v4 as  uuidv4 } from 'uuid';

export default function* ({ payload }: any, { call }: any) {
  return yield call(create, {
    ...payload,
    submissionId: uuidv4(),
  });
}

/**
 *
{
  "firstName": "Garfield",
  "identityId": "123456",
  "identityType": "I",
  "lastName": "GU",
  "processParam": {
      "caseCategory": "TH_UD_CTG01",
  },
  "submissionId": "testestestsetestsetset11111"
}
 */
