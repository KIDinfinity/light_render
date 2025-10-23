import { formUtils } from 'basic/components/Form';
import { NAMESPACE } from '../../../activity.config';
import lodash from 'lodash';
import CustomerRole from 'basic/enum/CustomerRole';

export default function* ({ payload }: any, { select, put }: any) {
  const { companyRegistrationNumber, clientId } = payload;
  const currentClient = yield select(
    ({ [NAMESPACE]: modelnamespace }: any) =>
      modelnamespace.modalData.entities?.clientMap?.[clientId]
  );

  yield put({
    type: `${NAMESPACE}/deleteCurrentClient`,
    payload: {
      clientId,
    },
  });

  yield put({
    type: `${NAMESPACE}/addNewClient`,
    payload: {
      changedValues: {
        personalInfo: {
          customerType: currentClient?.personalInfo?.customerType,
          customerRole: currentClient?.personalInfo?.customerRole,
          companyRegistrationNumber,
        },
      },
    },
  });

  const clientMap = yield select(({ [NAMESPACE]: modelnamepsace }: any) =>
    lodash.get(modelnamepsace, `modalData.entities.clientMap`, {})
  );

  const apList = lodash.values(clientMap).filter((item: any) => {
    return lodash.isEqual(formUtils.queryValue(item.personalInfo.customerRole), [
      CustomerRole.AuthorisedSignatory,
    ]);
  });

  if (apList.length === 0) {
    yield put({ type: 'addAuthorisedPerson', payload: { withInsured: true } });
  }

  yield put({ type: 'clearError' });
}
