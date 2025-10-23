import lodash from 'lodash';
import CustomerRole from 'process/NB/Enum/CustomerRole';
import handleMessageModal from '@/utils/commonMessage';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { NAMESPACE } from '../../activity.config';

export default function* (_: any, { select, put }: any) {
  const claimProcessData = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.claimProcessData
  );
  const ASDeleteList = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.ASDeleteList
  );
  const policyOwnerSelect = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.policyOwnerSelect
  );

  const policyOwnerClientIndex = lodash
    .chain(claimProcessData)
    .get('policyList[0].clientInfoList')
    .findIndex((client: any) => {
      const roleList = lodash.map(client?.roleList, (roleItem) => roleItem.customerRole);
      return lodash.includes(roleList, CustomerRole.PolicyOwner);
    })
    .value();

  const currentIdentificationList = lodash
    .chain(claimProcessData)
    .get(`policyList[0].clientInfoList[${policyOwnerClientIndex}].identificationList`)
    .value();

  const existingASSize = lodash
    .chain(currentIdentificationList)
    .filter(
      (iden: any) =>
        !lodash.includes(ASDeleteList[policyOwnerSelect], iden?.id) &&
        iden?.parentId === policyOwnerSelect
    )
    .size()
    .value();

  if (existingASSize > 4) {
    handleMessageModal([
      {
        code: formatMessageApi({ Label_COM_ErrorMessage: 'MSG_000745' }),
        content: formatMessageApi({ Label_COM_ErrorMessage: 'MSG_000745' }),
      },
    ]);
    return true;
  } else {
    yield put({
      type: `${NAMESPACE}/updateAuthorisedSignatoryData`,
    });
    return false;
  }
}
