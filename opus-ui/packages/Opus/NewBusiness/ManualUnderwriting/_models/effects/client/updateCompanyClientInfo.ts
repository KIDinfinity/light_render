import { convert_clientBEToFESingle } from 'opus/Utils/convert_businessDataBEToFE';
import { tenant } from '@/components/Tenant';
import { createNormalizeData } from 'opus/NewBusiness/ManualUnderwriting/_utils/normalizrUtils';
import { NAMESPACE } from 'opus/NewBusiness/ManualUnderwriting/activity.config';
import lodash from 'lodash';
import CustomerType from 'opus/NewBusiness/Enum/CustomerType';
import CustomerRole from 'basic/enum/CustomerRole';
import BooleanEnum from 'basic/enum/BooleanEnum';

export default function* ({ payload }: any, { call, put, select }: any) {
  const { clientInfoList, companyRegistrationNumber } = payload;

  const payor = lodash.find(
    clientInfoList,
    (c: any) =>
      c.customerType === CustomerType.Entity &&
      c.roleList.map((r: { customerRole: string }) => r.customerRole).includes(CustomerRole.Payor)
  );

  const apList = lodash.filter(clientInfoList, (c: any) =>
    c.roleList
      .map((r: { customerRole: string }) => r.customerRole)
      .includes(CustomerRole.AuthorisedSignatory)
  );

  const convertedClientInfoList = [];
  for (const client of clientInfoList) {
    let requestData = lodash.cloneDeep(client);
    if (
      client.customerType === CustomerType.Entity &&
      client.roleList
        .map((r: { customerRole: string }) => r.customerRole)
        .includes(CustomerRole.Payor)
    ) {
      requestData = { ...client, companyRegistrationNumber };
    }
    const convertedClient = yield call(
      convert_clientBEToFESingle,
      { id: requestData.id, requestData },
      tenant.region()
    );
    // companyLegalForm = Y时，不显示ubo info
    if (
      payor?.companyLegalForm === BooleanEnum.Yes &&
      lodash.isEqual(convertedClient.personalInfo?.customerRole, [CustomerRole.UBO])
    ) {
      continue;
    }
    convertedClientInfoList.push(convertedClient);
  }

  const { processData, entities } = yield call(createNormalizeData, {
    clientInfoList: convertedClientInfoList,
  });

  const editingClientId = yield select(({ [NAMESPACE]: modelnamespace }: any) => {
    return modelnamespace.editingClientId;
  });

  yield put({ type: 'deleteCurrentClient', payload: { clientId: editingClientId } });

  if (apList.length === 0) {
    yield put({ type: 'addAuthorisedPerson', payload: { withInsured: true } });
  }

  yield put({ type: 'updateCompanyClients', payload: { entities, processData } });

  yield put({ type: 'clearError' });
}
