import lodash from 'lodash';
import dcProposalControllerService from '@/services/dcProposalControllerService';

export default function* ({ payload }: any, { call }: any) {
  const { applicationNo, id } = lodash.pick(payload, ['applicationNo', 'id']);
  const response = yield call(dcProposalControllerService.getEwsById, {
    applicationNo,
    id,
  });
  return response;
}
