import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { messageModal } from '@/utils/commonMessage';
import { listDedupCheckCfg } from '@/services/owbNbDropdownControllerService';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import CustomerRole from 'process/NB/Enum/CustomerRole';

export default function* validatePerposal({ payload }, { select, put, call }: any) {
  const businessData = yield select((state: any) => state.manualUnderwriting.businessData);
  const response = yield call(listDedupCheckCfg);
  const roleDicts = lodash
    .chain(response)
    .get('resultData', [])
    .filter((role) => role.required === true)
    .map((role) => ({
      dictCode: role?.customerRole,
    }))
    .value();

  const clientInfoList = lodash
    .chain(businessData)
    .get('policyList[0].clientInfoList', [])
    .filter((item: any) => {
      return item?.deleted !== 1;
    })
    .value();
  const coverageList = lodash.get(businessData, 'policyList[0].coverageList', []);
  const roleList = clientInfoList?.reduce(
    (datas: any[], { roleList: roles }: any = []) => [...datas, ...(roles?.filter(roleData => !roleData.deleted) || [])],
    []
  );
  const rolesWithoutClient = lodash.reduce(
    roleDicts,
    (data: string[], { dictCode }: { dictCode: string }) => {
      if (lodash.every(roleList, ({ customerRole }: any) => customerRole !== dictCode)) {
        return [...data, dictCode];
      }
      return data;
    },
    []
  );

  // 当某个role没有对应的客户信息时，报错
  if (!lodash.isEmpty(rolesWithoutClient)) {
    messageModal({
      typeCode: 'Label_COM_WarningMessage',
      dictCode: 'MSG_000585',
      // @ts-ignore
      args: [
        rolesWithoutClient
          ?.map((role: any) => formatMessageApi({ Dropdown_CLM_CustomerRole: role }))
          ?.join(', '),
      ],
    });
    return false;
  }

  // 手动切换到planinfo不校验
  // 当新增client/删除client时，必须要去修改plan info, 跟planInfo client一致
  if (!payload?.isPlanInfo) {
    let hasAddOrRemoveClient = false;
    const coverageInsuredSet = new Set();
    lodash.forEach(coverageList, (item: any) => {
      lodash.forEach(item?.coverageInsuredList, (insuredItem: any) => {
        const isInsured = lodash
          .chain(clientInfoList)
          .find((client: any) => {
            return formUtils.queryValue(client?.id) === formUtils.queryValue(insuredItem?.clientId);
          })
          .get('roleList', [])
          .filter(roleData => !roleData.deleted)
          .map((role) => {
            return role?.customerRole;
          })
          .includes(CustomerRole.Insured)
          .value();
        if (isInsured) {
          coverageInsuredSet.add(formUtils.queryValue(insuredItem?.clientId));
        }
      });
    });
    const clientIdSet = new Set();
    lodash.forEach(clientInfoList, (client) => {
      const isDeleted = client?.deleted;
      const isClientHasInsured = lodash
        .chain(client)
        .get('roleList', [])
        .filter(roleData => !roleData.deleted)
        .map((role) => {
          return role?.customerRole;
        })
        .includes(CustomerRole.Insured)
        .value();
      if (isClientHasInsured && isDeleted !== 1) {
        clientIdSet.add(formUtils.queryValue(client?.id));
      }
    });

    if (
      Array.from(coverageInsuredSet)?.length !== Array.from(clientIdSet)?.length ||
      !lodash.isEmpty(lodash.difference(Array.from(coverageInsuredSet), Array.from(clientIdSet)))
    ) {
      hasAddOrRemoveClient = true;
    }
    yield put({
      type: 'saveHasAddOrRemoveClient',
      payload: {
        hasAddOrRemoveClient: false,
      },
    });
    if (hasAddOrRemoveClient) {
      yield put({
        type: 'saveHasAddOrRemoveClient',
        payload: {
          hasAddOrRemoveClient: true,
        },
      });
      return false;
    }
  }

  return true;
}
