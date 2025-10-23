import CustomerRole from 'basic/enum/CustomerRole';
import { NAMESPACE } from 'opus/NewBusiness/ManualUnderwriting/activity.config';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';

export default function* ({ payload }: any, { put, select }: any) {
  const { clientId } = payload;

  const clientMap = yield select(({ [NAMESPACE]: modelnamepsace }: any) => {
    return lodash.get(modelnamepsace, 'modalData.entities.clientMap', {});
  });

  const uboInfoList = lodash
    .values(clientMap)
    .filter((item: any) => {
      return lodash.isEqual(formUtils.queryValue(item.personalInfo.customerRole), [
        CustomerRole.UBO,
      ]);
    })
    .map((info) => info.id);

  yield put({ type: 'clearUBOInfoList' });

  for (const id of uboInfoList) {
    yield put({
      type: `removeErrorLog`,
      payload: { paths: [clientId, id] },
    });
  }
}
